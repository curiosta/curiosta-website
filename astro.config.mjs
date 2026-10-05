// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static-only build (no SSR adapter). Deployed to a private S3 bucket behind CloudFront.
// Paths reserved for the future Medusa backend / admin on the same distribution:
//   /store/*  /admin/*  /app/*  /hooks/*  /health  /media/*
// Never create storefront pages under those prefixes (see src/lib/commerce/reserved-paths.ts).
export default defineConfig({
  site: 'https://curiosta.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Sample (placeholder) product pages are noindex and excluded from the sitemap.
      filter: (page) => !page.includes('/products/sample-') && !page.endsWith('/404/'),
    }),
  ],
  // assetsInlineLimit 0: keep every script external so the CloudFront CSP can use script-src 'self' (no inline hashes).
  vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
});
