# curiosta.com (relaunch-2026)

Static [Astro 7](https://astro.build) site for **Curiosta™**, a brand of Sahukar Consultancy.
M1 scope: catalogue, services, how to buy, about, contact (RFQ) and the policy pages needed
for Razorpay website verification. The old Medusa/Stripe/Meilisearch/Contentful storefront
is gone; online checkout (Medusa 1.16 `store-backend` + Razorpay) arrives in a later milestone
through `src/lib/commerce` and `src/components/BuyBox.astro`.

## Develop

Requires Node ≥ 22.12.

```bash
npm ci
npm run dev                 # http://localhost:4321
npm run build               # -> dist/
npm run preview             # serves dist/ like CloudFront (dir index, 404, POST /api/rfq stub)
npm run check               # astro check (types)
npm run test:rfq            # RFQ Lambda stub unit tests
npm run check:placeholders  # exit 1 while any [PLACEHOLDER]/SAMPLE remains (go-live gate)
npm run check:policies -- http://localhost:4321 --md checklist.md   # Razorpay checklist
node scripts/link-check.mjs # internal links against the preview
```

## Where to edit

| What | File |
|---|---|
| Legal name, GSTIN, address, email, phone, grievance officer, refund days, quotation validity | `src/config/site.ts` → `business` |
| Dispatch time, delivery estimate, shipping rates, returns window, damage-report window | `src/config/site.ts` → `placeholders` (set `value`, `confirmed: true`) |
| Products | `src/content/products/*.md` (set `sample: false` and rename the file without `sample-` when real) |
| Policies | `src/pages/{terms-and-conditions,privacy-policy,shipping-policy,cancellation-and-refunds,grievance-redressal}.astro` |

Prices are entered as the final INR amount **including GST** (`price: { mode: fixed, inrInclGst: 17700 }`)
or `price: { mode: on-request }`.

## Reserved paths

`/store/*`, `/admin/*`, `/app/*`, `/hooks/*`, `/health`, `/media/*` are routed by CloudFront to
the future store backend/admin. Never create pages there.

## RFQ form

Built with `PUBLIC_RFQ_ENDPOINT` empty (M1), the form opens a pre-filled
`mailto:info@curiosta.com`. With an endpoint set it POSTs JSON to the RFQ Lambda
(`functions/rfq`, not deployed in M1) and falls back to mailto on any error.

## Deploy

`infra/template.yaml` (stack `curiosta-web`): private S3 bucket + OAC, CloudFront distribution,
viewer-request function (www→apex, directory index), security headers.
`infra/deploy-site.sh <bucket> <distribution-id> [--apply]` uploads `dist/`.
The full change list and runbook live outside this repo (`m1-deploy-runbook.md`).

## Licence

MPL-2.0 (see LICENSE).
