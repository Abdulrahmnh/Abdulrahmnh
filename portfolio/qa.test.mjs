import test from 'node:test';
import runtimeVm from 'node:vm';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const base=dirname(fileURLToPath(import.meta.url));
const html=readFileSync(resolve(base,'index.html'),'utf8');
const css=readFileSync(resolve(base,'styles.css'),'utf8');
const js=readFileSync(resolve(base,'app.js'),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
const anchors=[...html.matchAll(/<a\b[^>]*>/g)].map(m=>m[0]);
const images=[...html.matchAll(/<img\b[^>]*>/g)].map(m=>m[0]);

test('one H1, landmark structure and distinct element IDs',()=>{
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 assert.equal(new Set(ids).size,ids.length);
 for(const tag of ['main','header','nav','footer'])assert.match(html,new RegExp('<'+tag+'\\b'));
});
test('every same-page anchor has an existing destination',()=>{
 for(const fragment of [...html.matchAll(/href="#([^"]+)"/g)].map(m=>m[1]))assert.ok(ids.includes(fragment),'missing '+fragment);
});
test('outbound links open safely',()=>{
 for(const anchor of anchors.filter(a=>a.includes('target="_blank"'))){
  assert.match(anchor,/rel="[^"]*noopener/);
  assert.match(anchor,/rel="[^"]*noreferrer/);
 }
});
test('bilingual content is paired and AR RTL / EN LTR works',()=>{
 const marked=[...html.matchAll(/<\w+[^>]*data-(?:ar|en)="[^"]*"[^>]*>/g)].map(m=>m[0]);
 assert.ok(marked.length>=45,'expected a real bilingual document');
 for(const element of marked){assert.match(element,/data-ar="/);assert.match(element,/data-en="/);}
 assert.match(js,/root\.lang/);assert.match(js,/root\.dir/);assert.match(js,/localStorage/);
});
test('mobile navigation has functional disclosure and close controls',()=>{
 assert.match(html,/id="menu-toggle"/);
 assert.match(html,/aria-expanded="false"/);
 assert.match(html,/aria-controls="primary-nav"/);
 assert.match(js,/setMenu\(open\)/);
 assert.match(js,/aria-expanded/);
 assert.match(js,/Escape/);
 assert.match(css,/\.main-nav\.is-open/);
});
test('the developer identity is not DawServe branding',()=>{
 const hero=html.slice(html.indexOf('<section class="hero"'),html.indexOf('<section class="work-section"'));
 assert.doesNotMatch(hero,/DAWSERVE|dawserve-hero|dawserve-dental|MEDICAL SUPPLIES/i);
 assert.match(hero,/A\/STUDIO/);
 assert.match(css,/--blue:#3458f5/);
 assert.doesNotMatch(css,/--night:#102a2d|--mint-dark:#a5d67a/);
});
test('DawServe stays inside a clearly identified work case study',()=>{
 assert.match(html,/id="work"/);
 assert.match(html,/INDEPENDENT PROPOSAL — NOT A CLIENT DELIVERY/);
 assert.match(html,/not an endorsed official site or a paid client delivery/);
 assert.match(html,/not a production WordPress service/);
 assert.match(html,/href="https:\/\/dawserve\.onrender\.com\//);
});
test('local project assets are present with translated alt text',()=>{
 assert.equal(images.length,2);
 assert.ok(statSync(resolve(base,'assets/dawserve-hero.webp')).size>50000);
 assert.ok(statSync(resolve(base,'assets/dawserve-dental.webp')).size>10000);
 for(const image of images){assert.match(image,/src="assets\/dawserve-/);assert.match(image,/data-alt-ar=/);assert.match(image,/data-alt-en=/);}
 assert.match(js,/data-alt-ar/);
});
test('release safety: noindex and no invented sales contact',()=>{
 assert.match(html,/content="noindex, nofollow"/);
 assert.doesNotMatch(html,/href="https:\/\/github\.com\/Abdulrahmnh/);
 assert.match(html,/Direct contact details will be added shortly/);
 assert.doesNotMatch(html,/mailto:[^"]+@|wa\.me\//);
});
test('responsive, focus and reduced-motion styles are present',()=>{
 assert.match(css,/max-width:660px/);
 assert.match(css,/max-width:385px/);
 assert.match(css,/:focus-visible/);
 assert.match(css,/prefers-reduced-motion/);
 assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
});
test('arrows use SVG icons rather than emoji glyphs',()=>{
 assert.match(html,/class="ic ic-arrow"/);
 assert.doesNotMatch(html,/↗|➡|↪/);
});
test('all intended conversion sections are navigable',()=>{
 for(const id of ['work','expertise','approach','contact'])assert.ok(ids.includes(id));
 assert.match(html,/class="btn btn-blue"/);
 assert.match(html,/class="project-visit"/);
});

test('bilingual toggle and mobile menu execute against a DOM fixture',()=>{
 const vm= (awaitableVm=>awaitableVm)(runtimeVm);
 const events={};
 const mk=(attrs={})=>{
  const handlers={};
  const target={textContent:'',attributes:{...attrs},handlers,
   getAttribute(name){return this.attributes[name]??null;},
   setAttribute(name,value){this.attributes[name]=String(value);},
   addEventListener(name,fn){handlers[name]=fn;},
   contains(){return false;}
  };
  return target;
 };
 const root={lang:'ar',dir:'rtl'};
 const switcher=mk();
 const menu=mk({'aria-expanded':'false'});
 const state=new Set();
 const nav=mk();
 nav.classList={contains(name){return state.has(name)},toggle(name,on){if(on)state.add(name);else state.delete(name)}};
 nav.querySelectorAll=()=>[];
 const translated=mk({'data-ar':'أهلا','data-en':'Hello'});
 const meta=mk();
 const doc={
  documentElement:root,title:'',
  getElementById(id){return {'lang-toggle':switcher,'menu-toggle':menu,'primary-nav':nav}[id]??null;},
  querySelectorAll(selector){return selector==='[data-ar][data-en]'?[translated]:[];},
  querySelector(){return meta;},
  addEventListener(name,fn){events[name]=fn;}
 };
 const saved={};
 vm.runInNewContext(js,{document:doc,localStorage:{getItem:()=>null,setItem(k,v){saved[k]=v;}}});
 assert.equal(root.lang,'ar');assert.equal(root.dir,'rtl');assert.equal(translated.textContent,'أهلا');
 assert.equal(typeof switcher.handlers.click,'function');
 switcher.handlers.click();
 assert.equal(root.lang,'en');assert.equal(root.dir,'ltr');assert.equal(translated.textContent,'Hello');
 assert.equal(saved['abdulrahman-portfolio-lang'],'en');
 menu.handlers.click();
 assert.equal(menu.getAttribute('aria-expanded'),'true');
 assert.ok(state.has('is-open'));
 events.keydown({key:'Escape'});
 assert.equal(menu.getAttribute('aria-expanded'),'false');
 assert.ok(!state.has('is-open'));
});

test('expanded portfolio is bilingual and distinguishes concepts from products',()=>{
 for(const key of ['sanead','rockline','rashid','aziz','qidr'])assert.ok(html.includes('data-project="'+key+'"'));
 assert.match(html,/INDEPENDENT PRODUCT/);assert.match(html,/UNPUBLISHED INTERACTIVE CONCEPT/);
 assert.match(css,/\.work-collection/);
});
