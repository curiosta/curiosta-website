#!/usr/bin/env node
// Crawls every internal href/src in dist/*.html against a running preview and reports non-200s.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
const base = (process.argv[2] ?? 'http://localhost:4321').replace(/\/$/, '');
const root = new URL('../dist/', import.meta.url).pathname;
async function* walk(d) { for (const e of await readdir(d, { withFileTypes: true })) { const p = join(d, e.name); if (e.isDirectory()) yield* walk(p); else if (p.endsWith('.html')) yield p; } }
const links = new Map();
for await (const f of walk(root)) {
  const s = await readFile(f, 'utf8');
  for (const m of s.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) if (!m[1].startsWith('//')) links.set(m[1], f.slice(root.length));
}
const bad = [];
for (const [l, from] of links) { const r = await fetch(base + l, { redirect: 'manual' }); if (r.status !== 200) bad.push(`${r.status} ${l} (from ${from})`); }
console.log(`Checked ${links.size} internal URLs: ${bad.length} not 200`); bad.forEach((b) => console.log('  ' + b));
process.exit(bad.length ? 1 : 0);
