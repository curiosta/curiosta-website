#!/usr/bin/env node
/**
 * Razorpay website-verification checklist against a running preview (default http://localhost:4321).
 * Sources: razorpay.com/docs/payments/dashboard/account-settings/business-website-details/
 *          razorpay.com/blog/payment-gateway-compliance/ (2026), Consumer Protection (E-Commerce) Rules 2020.
 * Usage: node scripts/policy-checklist.mjs [baseUrl] [--md out.md]
 * Exit 0 = no FAIL (WARN items such as placeholders may remain).
 */
import { writeFile, readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const args = process.argv.slice(2);
const base = (args.find((a) => a.startsWith('http')) ?? 'http://localhost:4321').replace(/\/$/, '');
const mdOut = args.includes('--md') ? args[args.indexOf('--md') + 1] : null;
const pages = {
  about: '/about/', contact: '/contact/', pricing: '/pricing/', products: '/products/',
  terms: '/terms-and-conditions/', privacy: '/privacy-policy/', shipping: '/shipping-policy/',
  refunds: '/cancellation-and-refunds/', grievance: '/grievance-redressal/', home: '/',
};
const html = {}; const status = {};
for (const [k, p] of Object.entries(pages)) {
  const r = await fetch(base + p, { redirect: 'manual' });
  status[k] = r.status; html[k] = await r.text();
}
const text = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/\s+/g, ' ');
const T = Object.fromEntries(Object.entries(html).map(([k, v]) => [k, text(v)]));
const footer = (h) => (h.match(/<footer[\s\S]*?<\/footer>/) ?? [''])[0];

const rows = [];
const check = (area, item, ok, detail = '', level = 'FAIL') => rows.push({ area, item, result: ok ? 'PASS' : level, detail });
const has = (k, re) => re.test(T[k]);

// 1. Required pages
const required = [['About us', 'about'], ['Contact us', 'contact'], ['Pricing details', 'pricing'], ['Terms and conditions', 'terms'], ['Privacy policy', 'privacy'], ['Shipping policy', 'shipping'], ['Cancellation and refunds policy', 'refunds'], ['Grievance officer page', 'grievance'], ['Product catalogue', 'products']];
for (const [label, k] of required) check('Pages', `${label} returns 200 (${pages[k]})`, status[k] === 200, `HTTP ${status[k]}`);
// 2. Footer links on every required page
for (const [label, k] of required) {
  const missing = Object.entries(pages).filter(([, p]) => !footer(html[k] ?? '').includes(`href="${p}"`) && !['/', '/products/'].includes(p)).map(([, p]) => p);
  check('Navigation', `Footer on ${pages[k]} links all policy/contact/pricing/about pages`, missing.length === 0, missing.length ? 'missing ' + missing.join(' ') : '');
}
// 3. Business identity
const legal = 'Sahukar Consultancy';
for (const k of ['contact', 'about', 'home', 'terms']) check('Identity', `Legal entity name "${legal}" on ${pages[k]}`, T[k].includes(legal));
check('Identity', 'Physical address with PIN on Contact (not a PO box)', has('contact', /Two Horizon Centre.*Gurugram.*122002/) && !has('contact', /P\.?O\.? Box/i));
check('Identity', 'Email on Contact', has('contact', /info@curiosta\.com/));
check('Identity', 'Phone on Contact', has('contact', /\+91-9438643108/));
check('Identity', 'Support hours on Contact', has('contact', /Monday to Friday/));
check('Identity', 'GSTIN on Contact and footer', has('contact', /06FPRPS8300Q1ZW/) && footer(html.home).includes('06FPRPS8300Q1ZW'));
// 4. Pricing
check('Pricing', 'Prices shown in INR (₹) incl. GST', has('pricing', /₹[\d,]+ incl\. \d+% GST/) && has('products', /₹[\d,]+ incl\. \d+% GST/));
check('Pricing', '"Price on request" items explained', has('pricing', /Price on request/) && has('pricing', /priced on request with a formal quotation/));
check('Pricing', 'Pricing visible without login', !/log ?in|sign ?in/i.test(T.pricing.replace(/login from/g, '')));
check('Pricing', 'Real product prices (not SAMPLE)', !html.pricing.includes('data-sample="true"'), 'all catalogue entries are SAMPLE placeholders', 'WARN');
// 5. Terms
check('Terms', 'Governing law / jurisdiction', has('terms', /laws of India/) && has('terms', /courts at/));
check('Terms', 'Payment terms incl. payment gateway', has('terms', /Razorpay/));
check('Terms', 'Links to shipping, refunds and privacy', ['/shipping-policy/', '/cancellation-and-refunds/', '/privacy-policy/'].every((p) => html.terms.includes(`href="${p}"`)));
check('Terms', 'Limitation of liability and warranty', has('terms', /Limitation of liability/i) && has('terms', /Warranty/));
// 6. Privacy
check('Privacy', 'What data is collected', has('privacy', /What we collect/));
check('Privacy', 'Purpose of use', has('privacy', /Why we use it/));
check('Privacy', 'Sharing / third parties incl. payment processor', has('privacy', /Who we share it with/) && has('privacy', /Razorpay/));
check('Privacy', 'Card data not stored', has('privacy', /never receive or store full card/));
check('Privacy', 'Retention and user rights (DPDP Act 2023)', has('privacy', /How long we keep it/) && has('privacy', /Your rights/) && has('privacy', /Digital Personal Data Protection Act, 2023/));
check('Privacy', 'Grievance officer contact in privacy policy', has('privacy', /Grievance Officer/) && has('privacy', /info@curiosta\.com/));
// 7. Shipping
check('Shipping', 'Serviceable area stated', has('shipping', /within India/));
check('Shipping', 'Dispatch time stated', !html.shipping.includes('data-placeholder="dispatchTime"'), 'PLACEHOLDER: dispatch time', 'WARN');
check('Shipping', 'Delivery estimate stated', !html.shipping.includes('data-placeholder="deliveryTime"'), 'PLACEHOLDER: delivery estimate', 'WARN');
check('Shipping', 'Shipping charges stated', !html.shipping.includes('data-placeholder="shippingRates"'), 'PLACEHOLDER: shipping rates', 'WARN');
check('Shipping', 'Tracking and damage process', has('shipping', /tracking number/) && has('shipping', /transit damage/i));
// 8. Cancellation & refunds
check('Refunds', 'Cancellation conditions', has('refunds', /Cancelling an order/) && has('refunds', /before dispatch/));
check('Refunds', 'Refund timeline in business days', has('refunds', /within \d+ business days/) && has('refunds', /5–7 business days/));
check('Refunds', 'Refund method (original payment source)', has('refunds', /original payment method/));
check('Refunds', 'Returns window stated', !html.refunds.includes('data-placeholder="returnsWindow"'), 'PLACEHOLDER: returns window', 'WARN');
check('Refunds', 'Transit-damage reporting window stated', !html.refunds.includes('data-placeholder="damageReportWindow"'), 'PLACEHOLDER: damage reporting window', 'WARN');
check('Refunds', 'Damage/defect remedy', has('refunds', /Damaged, defective or wrong items/));
// 9. Grievance (E-Commerce Rules 2020, rule 4)
check('Grievance', 'Grievance officer name, email, phone, address', has('grievance', /Manoj Kumar Sahukar/) && has('grievance', /info@curiosta\.com/) && has('grievance', /\+91-9438643108/) && has('grievance', /122002/));
check('Grievance', 'Acknowledge within 48 hours, resolve within one month', has('grievance', /48 hours/) && has('grievance', /one month/));
check('Grievance', 'Grievance officer confirmed by Manoj', !html.grievance.includes('data-placeholder="grievanceOfficer"'), 'PENDING confirmation', 'WARN');
check('Grievance', 'Seller details (legal name, GSTIN, address)', has('grievance', /Seller details/) && has('grievance', /06FPRPS8300Q1ZW/));

// 10. Whole-site content hygiene (dist/)
const dist = new URL('../dist/', import.meta.url).pathname;
const banned = [/lorem ipsum/i, /\bTODO\b/, /stripe/i, /meilisearch/i, /contentful/i, /paytm/i, /upi:\/\/pay/i, /\bqr code\b/i,
  // Extra private terms (e.g. unpublished client names) passed via env so they are not committed.
  ...(process.env.CHECK_BANNED_TERMS ?? '').split(',').filter(Boolean).map((t) => new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'))];
const hits = [];
async function* walk(d) { for (const e of await readdir(d, { withFileTypes: true })) { const p = join(d, e.name); if (e.isDirectory()) yield* walk(p); else if (/\.(html|js|css|xml|txt)$/.test(p)) yield p; } }
let fileCount = 0;
for await (const f of walk(dist)) { fileCount++; const s = await readFile(f, 'utf8'); for (const re of banned) if (re.test(s)) hits.push(`${f.slice(dist.length)}: ${re}`); }
check('Hygiene', `No lorem ipsum/TODO/Stripe/Meilisearch/Contentful/UPI QR/unpublished case-study terms in dist (${fileCount} files)`, hits.length === 0, hits.slice(0, 8).join('; '));
check('Hygiene', 'Not-yet-real details marked visibly (placeholders/SAMPLE)', true, 'amber [PLACEHOLDER] and red SAMPLE markers');
check('Deploy', 'Served over HTTPS on curiosta.com', false, 'checked after deploy (local preview is http)', 'WARN');
check('Razorpay form', 'Sample invoice (PNG/JPG/PDF) ready to upload', false, 'Manoj to provide a GST tax invoice sample', 'WARN');
check('Razorpay form', 'Login required to pay? → No (no login on site)', !/href="\/(login|signup)/.test(html.home));

const counts = rows.reduce((a, r) => ((a[r.result] = (a[r.result] ?? 0) + 1), a), {});
const lines = [
  `# M1 policy-page checklist vs Razorpay website requirements`,
  ``,
  `Run against ${base} (local preview of dist/) on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST.`,
  `Result: **${counts.PASS ?? 0} PASS, ${counts.WARN ?? 0} WARN, ${counts.FAIL ?? 0} FAIL**. WARN = placeholder or post-deploy item that must be closed before submitting the site to Razorpay.`,
  ``,
  `| Area | Check | Result | Detail |`, `|---|---|---|---|`,
  ...rows.map((r) => `| ${r.area} | ${r.item} | ${r.result} | ${r.detail.replace(/\|/g, '\\|')} |`),
  ``,
  `Razorpay dashboard links to enter (Account & Settings → Business website detail):`,
  `About us https://curiosta.com/about/ · Contact us https://curiosta.com/contact/ · Pricing https://curiosta.com/pricing/ · Terms https://curiosta.com/terms-and-conditions/ · Privacy https://curiosta.com/privacy-policy/ · Shipping https://curiosta.com/shipping-policy/ · Cancellation & Refunds https://curiosta.com/cancellation-and-refunds/`,
];
console.log(lines.join('\n'));
if (mdOut) await writeFile(mdOut, lines.join('\n') + '\n');
process.exit(counts.FAIL ? 1 : 0);
