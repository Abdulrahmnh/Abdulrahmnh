import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';

const base = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(resolve(base, 'index.html'), 'utf8');
const css = readFileSync(resolve(base, 'styles.css'), 'utf8');
const js = readFileSync(resolve(base, 'app.js'), 'utf8');
const anchors = [...html.matchAll(/<a\b[^>]*>/g)].map(match => match[0]);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);

test('semantic structure has one H1 and unique ids', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal(new Set(ids).size, ids.length);
});
test('all same-page links lead to existing ids', () => {
  const fragments = [...html.matchAll(/href="#([^"]+)"/g)].map(match => match[1]);
  for (const fragment of fragments) assert.ok(ids.includes(fragment), 'missing #' + fragment);
});
test('external links open safely', () => {
  for (const anchor of anchors.filter(link => link.includes('target="_blank"'))) {
    assert.match(anchor, /rel="[^"]*noopener/);
    assert.match(anchor, /rel="[^"]*noreferrer/);
  }
});
test('all translatable text has both languages', () => {
  const marked = [...html.matchAll(/<\w+[^>]*data-(?:ar|en)="[^"]*"[^>]*>/g)].map(match => match[0]);
  assert.ok(marked.length >= 45);
  for (const element of marked) {
    assert.match(element, /data-ar="/);
    assert.match(element, /data-en="/);
  }
});
test('language toggle, persistence and direction are retained', () => {
  assert.match(js, /localStorage/);
  assert.match(js, /root\.dir/);
  assert.match(js, /root\.lang/);
  assert.match(html, /id="lang-toggle"/);
});
test('proposal demo is disclosed, with no indexing before approval', () => {
  assert.match(html, /content="noindex, nofollow"/);
  assert.match(html, /not a paid or approved client delivery/);
  assert.match(html, /not an actual website screenshot/);
});
test('editorial design replaced mock browser and equal cards', () => {
  assert.doesNotMatch(html, /browser-shell|mock-site|service-card/);
  assert.match(html, /class="case-grid"/);
  assert.match(html, /class="service-list"/);
});
test('responsive and accessible styles are present', () => {
  assert.match(css, /max-width:680px/);
  assert.match(css, /max-width:390px/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /:focus-visible/);
  assert.equal((css.match(/{/g)||[]).length, (css.match(/}/g)||[]).length);
});
