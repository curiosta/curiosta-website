import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const price = z.discriminatedUnion('mode', [
  // Final price to the buyer in INR, inclusive of GST.
  z.object({ mode: z.literal('fixed'), inrInclGst: z.number().positive(), gstRatePct: z.number().default(18) }),
  z.object({ mode: z.literal('on-request') }),
]);

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    // true = placeholder entry; shows a SAMPLE badge, no Offer schema, noindex, "not for sale" notice.
    sample: z.boolean().default(true),
    category: z.enum(['instruments', 'kits', 'custom', 'components']),
    summary: z.string(),
    price,
    hsn: z.string().optional(), // to confirm with CA; left undefined = "HSN to be confirmed"
    leadTime: z.string().optional(),
    specs: z.array(z.object({ k: z.string(), v: z.string() })).default([]),
    options: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    // Future Medusa mapping (M3+): product handle / variant id in store-backend.
    medusaHandle: z.string().optional(),
  }),
});

// Case studies are only published when explicitly approved (published: true).
// Client case-study drafts are deliberately kept outside this repository.
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({ title: z.string(), published: z.boolean().default(false), summary: z.string().optional() }),
});

export const collections = { products, 'case-studies': caseStudies };
