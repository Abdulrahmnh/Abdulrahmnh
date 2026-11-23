/**
 * Rockline independent concept — standalone static publisher for Render.
 * The public URL serves this concept at "/" without touching portfolio files.
 * No backend, private data, or third-party enquiry submission is added.
 */
import { mkdir, readFile, rm, writeFile, copyFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const root = process.cwd();
const sourceDir = resolve(root, 'portfolio/previews/rockline');
const sharedDir = resolve(root, 'portfolio/previews/_shared');
const outDir = resolve(root, 'dist-rockline');

await rm(outDir, { recursive: true, force: true });
await mkdir(join(outDir, '_shared'), { recursive: true });

let html = await readFile(join(sourceDir, 'index.html'), 'utf8');
const assetRefs = ['../_shared/demo.css', '../_shared/demo.js'];
for (const ref of assetRefs) {
  if (!html.includes(ref)) throw new Error('Expected asset reference missing: ' + ref);
}
html = html.replaceAll('../_shared/', './_shared/');
if (!html.includes('INDEPENDENT WEBSITE CONCEPT') ||
    !html.includes('Not an official or endorsed Rockline website') ||
    !html.includes('noindex,nofollow') ||
    !html.includes('demo-form')) {
  throw new Error('Safety and attribution guards missing in Rockline index.html');
}
if (html.includes('action=') || html.includes('method="post"')) {
  throw new Error('Unexpected network form submission');
}

await writeFile(join(outDir, 'index.html'), html);
for (const file of ['demo.css', 'demo.js']) {
  await copyFile(join(sharedDir, file), join(outDir, '_shared', file));
}
await writeFile(join(outDir, '_headers'),
  '/*\n  X-Robots-Tag: noindex, nofollow, noarchive, nosnippet\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n');

const htmlVerify = await readFile(join(outDir, 'index.html'), 'utf8');
for (const path of ['./_shared/demo.css', './_shared/demo.js']) {
  if (!htmlVerify.includes(path)) throw new Error('Missing output asset reference: ' + path);
}
console.log('Rockline standalone static site ready: dist-rockline/');
console.log('Root index + bilingual CSS/JS + non-indexing response headers.');
