import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
const js=readFileSync(new URL('./_shared/demo.js',import.meta.url),'utf8');
function element(id){
  const attrs=new Map();
  const handlers=new Map();
  const classes=new Set();
  return {
    id,hidden:false,value:'',textContent:'',focused:false,scrolled:false,
    handlers,attrs,
    classList:{
      add(name){classes.add(name)},
      remove(name){classes.delete(name)},
      toggle(name){if(classes.has(name)){classes.delete(name);return false;}classes.add(name);return true;},
      contains(name){return classes.has(name)}
    },
    setAttribute(name,value){attrs.set(name,String(value))},
    getAttribute(name){return attrs.has(name)?attrs.get(name):null},
    addEventListener(name,fn){handlers.set(name,fn)},
    fire(name,payload={}){return handlers.get(name)?.(payload)},
    focus(){this.focused=true},
    scrollIntoView(){this.scrolled=true},
    querySelectorAll(){return []}
  };
}
function harness(){
  const elements={};
  for(const id of ['language-switch','menu-toggle','main-nav','demo-form','request-preview','request-summary','service-select','form-help','edit-request','enquiry','full-name','work-email','project-location','project-notes'])elements[id]=element(id);
  const root={lang:'en',dir:'ltr'};
  const translations=element('translation-sample');
  translations.attrs.set('data-en','English copy');
  translations.attrs.set('data-ar','نص عربي');
  const option=(value,en,ar)=>{
    const el=element('opt-'+value);
    el.value=value;el.textContent=en;
    el.attrs.set('data-en',en);el.attrs.set('data-ar',ar);
    return el;
  };
  const select=elements['service-select'];
  select.options=[
    option('','Select','اختر'),
    option('heavy','Heavy & Light Equipment','المعدات الثقيلة والخفيفة')
  ];
  const serviceButton=element('service-button');
  serviceButton.attrs.set('data-service','heavy');
  const navLink=element('nav-link');
  elements['main-nav'].querySelectorAll=()=>[navLink];
  const form=elements['demo-form'];
  form.checkValidity=()=>true;
  form.reportValidity=()=>true;
  let prevented=false;
  const summary=elements['request-summary'];
  summary.children=[];
  summary.replaceChildren=function(){this.children=[]};
  summary.append=function(...nodes){this.children.push(...nodes)};
  elements['request-preview'].hidden=true;
  const storage=new Map();
  const meta=element('meta');
  const docs={
    documentElement:root,title:'',
    getElementById(id){return elements[id]||null},
    querySelector(sel){return sel==='meta[name=description]'?meta:null},
    querySelectorAll(sel){
      if(sel==='[data-en][data-ar]')return [translations,...select.options];
      if(sel==='[data-service]')return [serviceButton];
      return [];
    },
    createElement(name){const el=element(name);el.tagName=name;return el},
    addEventListener(){}
  };
  class FakeFormData{
    constructor(formArg){assert.equal(formArg,form)}
    get(key){
      return {fullName:'Test User',email:'test@example.com',service:select.value,location:'Jubail',requirements:'Need an industrial equipment example.'}[key]||null;
    }
  }
  const context={
    document:docs,FormData:FakeFormData,
    window:{matchMedia:()=>({matches:false})},
    localStorage:{getItem:(k)=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},
    console
  };
  vm.runInNewContext(js,context,{filename:'demo.js'});
  return {elements,root,translations,select,serviceButton,navLink,summary,storage,form,meta,
    submit(){form.fire('submit',{preventDefault(){prevented=true}});return prevented;}
  };
}
test('language switch persists and applies RTL text',()=>{
  const h=harness();
  assert.equal(h.root.lang,'en');
  assert.equal(h.translations.textContent,'English copy');
  h.elements['language-switch'].fire('click');
  assert.equal(h.root.lang,'ar');
  assert.equal(h.root.dir,'rtl');
  assert.equal(h.translations.textContent,'نص عربي');
  assert.equal(h.storage.get('rockline-proposal-language'),'ar');
  h.elements['language-switch'].fire('click');
  assert.equal(h.root.lang,'en');
});
test('responsive menu toggles aria-expanded and closes on navigation',()=>{
  const h=harness();
  const menu=h.elements['menu-toggle'];
  menu.fire('click');
  assert.equal(menu.getAttribute('aria-expanded'),'true');
  assert.equal(h.elements['main-nav'].classList.contains('open'),true);
  h.navLink.fire('click');
  assert.equal(menu.getAttribute('aria-expanded'),'false');
});
test('service cards prefill local-only RFQ, preview uses current language and allows editing',()=>{
  const h=harness();
  h.elements['language-switch'].fire('click'); // AR
  h.serviceButton.fire('click');
  assert.equal(h.select.value,'heavy');
  assert.equal(h.elements.enquiry.scrolled,true);
  assert.equal(h.select.focused,true);
  assert.equal(h.submit(),true);
  assert.equal(h.form.hidden,true);
  assert.equal(h.elements['request-preview'].hidden,false);
  assert.equal(h.summary.children.length,10);
  assert.equal(h.summary.children[5].textContent,'المعدات الثقيلة والخفيفة');
  assert.equal(h.summary.children[3].textContent,'test@example.com');
  h.elements['language-switch'].fire('click'); // EN while preview is open
  assert.equal(h.summary.children[5].textContent,'Heavy & Light Equipment');
  h.elements['edit-request'].fire('click');
  assert.equal(h.form.hidden,false);
  assert.equal(h.elements['request-preview'].hidden,true);
});
