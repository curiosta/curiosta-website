import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handler, validate } from './index.mjs';

const ev = (body, headers = {}) => ({ requestContext: { http: { method: 'POST' } }, headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });
const good = { name: 'Test User', email: 'test@example.org', message: 'Need 2 loggers', consent: 'on' };
const quiet = { env: {} };

test('valid RFQ returns 202 with reference', async () => {
  const orig = console.log; console.log = () => {};
  const r = await handler(ev(good), {}, quiet); console.log = orig;
  assert.equal(r.statusCode, 202);
  assert.match(JSON.parse(r.body).reference, /^RFQ-\d{8}-[0-9A-F]{6}$/);
});
test('missing fields return 422', async () => {
  const r = await handler(ev({ name: '' }), {}, quiet);
  assert.equal(r.statusCode, 422);
  const f = JSON.parse(r.body).fields;
  assert.ok(f.name && f.email && f.message && f.consent);
});
test('honeypot pretends success without delivery', async () => {
  const r = await handler(ev({ ...good, website: 'spam' }), {}, quiet);
  assert.equal(r.statusCode, 202);
  assert.equal(JSON.parse(r.body).reference, undefined);
});
test('origin verify header enforced when configured', async () => {
  const env = { ORIGIN_VERIFY_SECRET: 'x'.repeat(32) };
  assert.equal((await handler(ev(good), {}, { env })).statusCode, 403);
  const orig = console.log; console.log = () => {};
  const ok = await handler(ev(good, { 'X-Origin-Verify': 'x'.repeat(32) }), {}, { env }); console.log = orig;
  assert.equal(ok.statusCode, 202);
});
test('rejects non-JSON, oversize and bad email', async () => {
  assert.equal((await handler({ ...ev(good), headers: { 'content-type': 'text/plain' } }, {}, quiet)).statusCode, 415);
  assert.equal((await handler(ev({ ...good, message: 'x'.repeat(25000) }), {}, quiet)).statusCode, 413);
  assert.equal(validate({ ...good, email: 'nope' }).errors.email, 'invalid email');
});
test('turnstile failure returns 400', async () => {
  const env = { TURNSTILE_SECRET: 'test' };
  const fetch = async () => ({ json: async () => ({ success: false }) });
  assert.equal((await handler(ev({ ...good, turnstile: 'tok' }), {}, { env, fetch })).statusCode, 400);
});
test('stub log contains no personal data', async () => {
  const lines = []; const orig = console.log; console.log = (s) => lines.push(s);
  await handler(ev(good), {}, quiet); console.log = orig;
  assert.ok(!lines.join('\n').includes('test@example.org'));
  assert.ok(!lines.join('\n').includes('Test User'));
});
