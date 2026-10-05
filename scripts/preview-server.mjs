#!/usr/bin/env node
/**
 * Local preview that behaves like the planned CloudFront + S3 setup:
 * - /path/ -> /path/index.html, /path -> 301 /path/ (CloudFront Function does the same)
 * - unknown paths -> 404.html with status 404
 * - POST /api/rfq -> functions/rfq handler in-process (only if the site was built with
 *   PUBLIC_RFQ_ENDPOINT=/api/rfq). RFQ_FAIL=1 makes it return 502 to test the mailto fallback.
 * Usage: node scripts/preview-server.mjs [--port 4321] [--dir dist]
 */
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { handler } from '../functions/rfq/index.mjs';

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const port = Number(opt('--port', process.env.PORT || 4321));
const root = resolve(opt('--dir', 'dist'));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
const security = {
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-frame-options': 'DENY',
};

async function file(p) { try { const s = await stat(p); return s.isFile() ? p : null; } catch { return null; } }

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (url.pathname === '/api/rfq') {
      if (req.method !== 'POST') { res.writeHead(405).end(); return; }
      let body = ''; for await (const c of req) { body += c; if (body.length > 50_000) break; }
      if (process.env.RFQ_FAIL === '1') { res.writeHead(502, { 'content-type': 'application/json' }).end('{"error":"simulated failure"}'); return; }
      const r = await handler({ requestContext: { http: { method: 'POST' } }, headers: req.headers, body }, {}, { env: { RFQ_DELIVERY: 'log' } });
      res.writeHead(r.statusCode, r.headers).end(r.body);
      return;
    }
    const rel = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
    let p = join(root, rel);
    if (!p.startsWith(root)) { res.writeHead(400).end(); return; }
    if (rel.endsWith('/')) p = join(p, 'index.html');
    else if (!extname(rel) && await file(join(p, 'index.html'))) { res.writeHead(301, { location: url.pathname + '/' + url.search }).end(); return; }
    const f = await file(p);
    if (!f) { res.writeHead(404, { 'content-type': types['.html'], ...security }).end(await readFile(join(root, '404.html'))); return; }
    res.writeHead(200, { 'content-type': types[extname(f)] ?? 'application/octet-stream', ...security }).end(await readFile(f));
  } catch (e) {
    res.writeHead(500).end('error');
  }
}).listen(port, () => console.log(`preview: http://localhost:${port}/ (root ${root})`));
