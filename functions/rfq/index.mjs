/**
 * RFQ Lambda (STUB, not deployed in M1).
 *
 * Intended deployment: Lambda Function URL behind CloudFront at POST /api/rfq,
 * origin locked with an X-Origin-Verify header. Sends the enquiry to
 * RFQ_TO_EMAIL via SES (SES production access pending). In M1 the site is
 * built with PUBLIC_RFQ_ENDPOINT empty, so the form uses mailto: instead.
 *
 * Env:
 *   RFQ_TO_EMAIL          destination mailbox (default info@curiosta.com)
 *   RFQ_FROM_EMAIL        verified SES sender (e.g. rfq@curiosta.com)
 *   RFQ_DELIVERY          'log' (default, stub: log redacted summary only) | 'ses'
 *   ORIGIN_VERIFY_SECRET  if set, requests must carry a matching X-Origin-Verify header
 *   TURNSTILE_SECRET      if set, the turnstile token is verified with Cloudflare
 *   ALLOWED_ORIGINS       comma-separated list for the Origin header check
 */
import { randomUUID, timingSafeEqual } from 'node:crypto';

const MAX_BODY = 20_000;
const LIMITS = { name: 120, organisation: 160, email: 200, phone: 30, product: 200, quantity: 40, neededBy: 20, route: 60, message: 5000, page: 200 };
const EMAIL_RE = /^[^\s@<>"']{1,64}@[^\s@<>"']{1,190}\.[a-z]{2,24}$/i;

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  body: JSON.stringify(body),
});

function safeEqual(a, b) {
  const x = Buffer.from(String(a)); const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

export function validate(input) {
  const errors = {};
  const out = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { errors: { body: 'invalid' } };
  for (const [k, max] of Object.entries(LIMITS)) {
    const v = input[k];
    if (v === undefined || v === null || v === '') continue;
    if (typeof v !== 'string') { errors[k] = 'must be text'; continue; }
    const t = v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim();
    if (t.length > max) errors[k] = `max ${max} characters`;
    else out[k] = t;
  }
  if (!out.name) errors.name = 'required';
  if (!out.email) errors.email = 'required';
  else if (!EMAIL_RE.test(out.email)) errors.email = 'invalid email';
  if (!out.message) errors.message = 'required';
  if (input.consent !== 'on' && input.consent !== true) errors.consent = 'required';
  return { errors, data: out };
}

async function verifyTurnstile(token, ip, secret, fetchImpl = fetch) {
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);
  const r = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const j = await r.json().catch(() => ({}));
  return j.success === true;
}

export async function deliver(rfq, env = process.env, deps = {}) {
  const mode = env.RFQ_DELIVERY || 'log';
  if (mode === 'ses') {
    // Lazy import so the stub runs without the AWS SDK installed locally.
    const { SESv2Client, SendEmailCommand } = deps.ses ?? (await import('@aws-sdk/client-sesv2'));
    const client = new SESv2Client({});
    const text = Object.entries(rfq.data).map(([k, v]) => `${k}: ${v}`).join('\n');
    await client.send(new SendEmailCommand({
      FromEmailAddress: env.RFQ_FROM_EMAIL,
      Destination: { ToAddresses: [env.RFQ_TO_EMAIL || 'info@curiosta.com'] },
      ReplyToAddresses: [rfq.data.email],
      Content: { Simple: { Subject: { Data: `RFQ ${rfq.reference}: ${rfq.data.product || 'enquiry'}` }, Body: { Text: { Data: `${text}\n\nReference: ${rfq.reference}` } } } },
    }));
    return 'ses';
  }
  // Stub mode: never log personal data, only a redacted summary.
  console.log(JSON.stringify({ msg: 'rfq.received', reference: rfq.reference, fields: Object.keys(rfq.data), messageLength: rfq.data.message?.length ?? 0 }));
  return 'log';
}

export async function handler(event, _ctx, deps = {}) {
  const env = deps.env ?? process.env;
  const method = event?.requestContext?.http?.method ?? event?.httpMethod ?? 'POST';
  const headers = Object.fromEntries(Object.entries(event?.headers ?? {}).map(([k, v]) => [k.toLowerCase(), v]));

  if (env.ORIGIN_VERIFY_SECRET && !safeEqual(headers['x-origin-verify'] ?? '', env.ORIGIN_VERIFY_SECRET)) return json(403, { error: 'forbidden' });
  if (method !== 'POST') return json(405, { error: 'method not allowed' });
  if (env.ALLOWED_ORIGINS && headers.origin && !env.ALLOWED_ORIGINS.split(',').includes(headers.origin)) return json(403, { error: 'origin not allowed' });
  if (!(headers['content-type'] ?? '').includes('application/json')) return json(415, { error: 'expected application/json' });

  let raw = event?.body ?? '';
  if (event?.isBase64Encoded) raw = Buffer.from(raw, 'base64').toString('utf8');
  if (raw.length > MAX_BODY) return json(413, { error: 'too large' });
  let input;
  try { input = JSON.parse(raw); } catch { return json(400, { error: 'invalid json' }); }

  if (input && typeof input.website === 'string' && input.website.trim() !== '') return json(202, { ok: true }); // honeypot: pretend success

  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(input.turnstile, headers['x-forwarded-for']?.split(',')[0], env.TURNSTILE_SECRET, deps.fetch);
    if (!ok) return json(400, { error: 'captcha failed' });
  }

  const { errors, data } = validate(input);
  if (Object.keys(errors).length) return json(422, { error: 'validation', fields: errors });

  const reference = 'RFQ-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + randomUUID().slice(0, 6).toUpperCase();
  try {
    await deliver({ reference, data }, env, deps);
  } catch (err) {
    console.error(JSON.stringify({ msg: 'rfq.delivery_failed', reference, error: String(err?.name ?? err) }));
    return json(502, { error: 'delivery failed' }); // client falls back to mailto
  }
  return json(202, { ok: true, reference });
}
