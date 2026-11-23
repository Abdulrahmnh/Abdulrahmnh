import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const dir=dirname(fileURLToPath(import.meta.url));
const read=(path)=>readFileSync(resolve(dir,path),'utf8');
const html=read('rockline/index.html'),css=read('_shared/demo.css'),js=read('_shared/demo.js');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(v=>v[1]);
const links=[...html.matchAll(/<a\b[^>]*>/g)].map(v=>v[0]);
const translatables=[...html.matchAll(/<[\w-]+\b[^>]*data-(?:ar|en)="[^"]*"[^>]*>/g)].map(v=>v[0]);
test('one H1, unique IDs and required landmarks',()=>{
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.equal(ids.length,new Set(ids).size);
  for(const id of ['top','main','about','capabilities','process','enquiry','demo-form','service-select','request-preview'])assert.ok(ids.includes(id),id);
});
test('all internal anchors resolve to existing IDs',()=>{
  for(const [,id] of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(id),'missing #'+id);
});
test('all translatable elements contain both Arabic and English',()=>{
  assert.ok(translatables.length>55,'translation count: '+translatables.length);
  for(const tag of translatables){
    assert.match(tag,/\bdata-en="/);
    assert.match(tag,/\bdata-ar="/);
  }
});
test('external links are safe and approved in scope',()=>{
  for(const link of links.filter(a=>a.includes('target="_blank"'))){
    assert.match(link,/\brel="[^"]*noopener/);
    assert.match(link,/\brel="[^"]*noreferrer/);
    assert.match(link,/\brel="[^"]*nofollow/);
  }
  assert.ok(links.some(v=>v.includes('https://rockindus.com/')));
  assert.ok(!html.includes('therockline.com'),'wrong Rockline entity');
});
test('noindex and unambiguous non-official disclosure',()=>{
  assert.match(html,/noindex,nofollow,noarchive,nosnippet,noimageindex/);
  assert.match(html,/Not an official or endorsed Rockline website/);
  assert.match(html,/not company assets/i);
  assert.match(html,/AI-generated concept photograph/);
});
test('no fabricated testimonials, customer names or KPIs',()=>{
  assert.doesNotMatch(html,/100%\s*customer satisfaction|trusted by \d+|case study delivered|certified partner|Lorem Ipsum|ISO 9001/);
});
test('concept form is never an actual submission',()=>{
  assert.match(html,/<form id="demo-form" novalidate>/);
  assert.match(js,/event\.preventDefault\(\)/);
  assert.match(js,/form\.checkValidity\(\)/);
  assert.match(js,/new FormData\(form\)/);
  assert.match(js,/summary\.append\(dt,dd\)/);
  assert.match(js,/dd\.textContent=items\[index\]/);
  assert.doesNotMatch(js,/\bfetch\s*\(|\bXMLHttpRequest\b|\bsendBeacon\s*\(|\bnavigator\.sendBeacon\b|https?:\/\//);
  assert.doesNotMatch(html,/<form[^>]*action=|<form[^>]*method=/);
  assert.match(html,/name="acknowledge"[^>]*required/);
});
test('six service options map from buttons to selector values',()=>{
  const options=[...html.matchAll(/<option value="([^"]+)"/g)].map(v=>v[1]).filter(Boolean);
  const picks=[...html.matchAll(/data-service="([^"]+)"/g)].map(v=>v[1]);
  assert.equal(options.length,6);
  assert.equal(new Set(picks).size,6);
  for(const val of picks)assert.ok(options.includes(val));
});
test('language, mobile menu and accessibility affordances exist',()=>{
  for(const str of ['root.lang=locale','root.dir=','localStorage','aria-expanded','Escape','aria-live','reportValidity'])assert.ok(js.includes(str)||html.includes(str),str);
  assert.match(css,/:focus-visible/);
  assert.match(css,/prefers-reduced-motion:reduce/);
  for(const w of ['max-width:1010px','max-width:760px','max-width:440px'])assert.ok(css.includes(w));
  assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
});
test('styles and scripts load from the portfolio publish root',()=>{
  assert.match(html,/href="\.\.\/_shared\/demo.css"/);
  assert.match(html,/src="\.\.\/_shared\/demo.js"/);
});
