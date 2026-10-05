#!/usr/bin/env node
// Lists every unresolved placeholder / pending item / sample entry in the built site (dist/).
// Exit code 1 if any remain (use as a go-live gate: `npm run build && npm run check:placeholders`).
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
const root = process.argv[2] || 'dist';
async function* walk(d) { for (const e of await readdir(d, { withFileTypes: true })) { const p = join(d, e.name); if (e.isDirectory()) yield* walk(p); else if (p.endsWith('.html')) yield p; } }
const found = {}; const samples = new Set();
for await (const f of walk(root)) {
  const html = await readFile(f, 'utf8');
  const page = f.slice(root.length).replace(/index\.html$/, '');
  for (const m of html.matchAll(/data-placeholder="([^"]+)"/g)) (found[m[1]] ??= new Set()).add(page);
  if (html.includes('data-sample="true"')) samples.add(page);
}
const keys = Object.keys(found).sort();
console.log(`Unresolved placeholders: ${keys.length}`);
for (const k of keys) console.log(`  - ${k}: ${[...found[k]].sort().join(', ')}`);
console.log(`Pages showing SAMPLE entries: ${samples.size}`);
for (const s of [...samples].sort()) console.log(`  - ${s}`);
process.exit(keys.length || samples.size ? 1 : 0);
