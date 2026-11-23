import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';

const base = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(resolve(base, 'index.html'), 'utf8');
const css = readFileSync(resolve(base, 'styles.css'), 'utf8');
const js = readFileSync(resolve(base, 'app.js'), 'utf8');
const anchors = [...html.matchAll(/<a\b[^>]*>/g)].map(m => m[0]);
const images = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);

test('one semantic H1 and unique element ids', () => {
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 assert.equal(new Set(ids).size,ids.length);
});
test('all internal links point to actual elements', () => {
 for(const fragment of [...html.matchAll(/href="#([^"]+)"/g)].map(m=>m[1]))
   assert.ok(ids.includes(fragment),'missing #'+fragment);
});
test('external links have secure rel attributes', () => {
 for(const anchor of anchors.filter(a=>a.includes('target="_blank"'))) {
   assert.match(anchor,/rel="[^"]*noopener/);
   assert.match(anchor,/rel="[^"]*noreferrer/);
 }
});
test('every localized text element has both languages', () => {
 const localized=[...html.matchAll(/<\w+[^>]*data-(?:ar|en)="[^"]*"[^>]*>/g)].map(m=>m[0]);
 assert.ok(localized.length>=50, 'expected at least 50 localized elements');
 for(const element of localized) {
   assert.match(element,/data-ar="/);
   assert.match(element,/data-en="/);
 }
});
test('project asset images with bilingual descriptive alt', () => {
 assert.ok(images.length>=2);
 for(const image of images) {
  assert.match(image,/data-alt-ar="/);
  assert.match(image,/data-alt-en="/);
  assert.match(image,/alt="/);
  assert.match(image,/src="https:\/\/dawserve.onrender.com\/wp-content\/themes\/dawserve\/assets\//);
 }
 assert.match(js,/\[data-alt-ar\]\[data-alt-en\]/);
});
test('language toggle persists and sets text direction and page metadata', () => {
 assert.match(js,/localStorage/);
 assert.match(js,/root\.lang/);
 assert.match(js,/root\.dir/);
 assert.match(js,/document\.title/);
 assert.match(html,/id="lang-toggle"/);
});
test('visual-first redesign contains no fake website illustrations or emoji arrows', () => {
 assert.match(html,/class="hero-showcase"/);
 assert.match(html,/class="case-study"/);
 assert.match(html,/class="service-grid"/);
 assert.doesNotMatch(html,/FROM BRIEF|TO BUILD|CLARITY AT EVERY STEP|browser-shell|mock-site/);
 assert.doesNotMatch(html,/↗|➡|↪/);
 assert.match(html,/class="icon-arrow"/);
});
test('proposal demo disclosures and safe noindex remain', () => {
 assert.match(html,/content="noindex, nofollow"/);
 assert.match(html,/independent proposal demo/i);
 assert.match(html,/not a production WordPress runtime/);
 assert.match(html,/غير معتمد/);
});
test('responsive accessibility and reduced motion are styled', () => {
 assert.match(css,/@media\(max-width:620px\)/);
 assert.match(css,/@media\(max-width:365px\)/);
 assert.match(css, /:focus-visible/);
 assert.match(css,/prefers-reduced-motion/);
 assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
});
test('site has clear journeys to work, services and contact', () => {
 for(const id of ['work','services','process','contact'])assert.ok(ids.includes(id));
 assert.match(html,/https:\/\/dawserve\.onrender\.com\//);
});
