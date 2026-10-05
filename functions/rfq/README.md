# RFQ Lambda (stub)

Not deployed in M1. The M1 site is built with `PUBLIC_RFQ_ENDPOINT` empty, so the
contact form opens a pre-filled `mailto:info@curiosta.com`.

To enable later (separate approval): deploy `index.mjs` (Node 22, arm64) with a
Function URL, add a CloudFront behaviour `POST /api/rfq` → that origin with an
`X-Origin-Verify` header, set `RFQ_DELIVERY=ses` once SES production access is
granted, then rebuild the site with `PUBLIC_RFQ_ENDPOINT=/api/rfq`.
Tests: `npm run test:rfq`.
