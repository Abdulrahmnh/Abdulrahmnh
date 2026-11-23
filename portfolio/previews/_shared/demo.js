/* Shared prospect-demo interaction layer.
   No analytics, no submission endpoint, no external request handling. */
(()=>{'use strict';
const root=document.documentElement;
const toggle=document.getElementById('language-switch');
const menuButton=document.getElementById('menu-toggle');
const nav=document.getElementById('main-nav');
const form=document.getElementById('demo-form');
const preview=document.getElementById('request-preview');
const summary=document.getElementById('request-summary');
const serviceSelect=document.getElementById('service-select');
const help=document.getElementById('form-help');
const edit=document.getElementById('edit-request');
const langKey='rockline-proposal-language';
const labels={
  en:{title:'Rockline — Independent Website Concept',description:'Independent unofficial website concept. Not endorsed by or operated by Rockline. No enquiries transmitted.',switch:'العربية',switchLabel:'Switch to Arabic',menuOpen:'Open navigation',menuClose:'Close navigation',required:'Complete the required fields and confirm this is a demo.',previewReady:'This is a local preview. Nothing has been submitted.',summary:['Contact','Work email','Service','Location','Requirements']},
  ar:{title:'روكلاين — تصور مستقل غير رسمي للموقع',description:'تصور مستقل وغير رسمي لموقع Rockline. لا تمثل الشركة ولا تُرسل بيانات الطلبات.',switch:'EN',switchLabel:'Switch to English',menuOpen:'افتح القائمة',menuClose:'إغلاق القائمة',required:'أكمل الحقول المطلوبة وأكّد أن هذا النموذج تجريبي.',previewReady:'هذه معاينة محلية. لم يتم إرسال أي طلب.',summary:['الاسم','البريد','الخدمة','الموقع','المتطلبات']}
};
let previewData=null;
function language(){
  return root.lang==='ar'?'ar':'en';
}
function closeMenu(){
  nav?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded','false');
  if(menuButton)menuButton.setAttribute('aria-label',labels[language()].menuOpen);
}
function switchLanguage(next){
  const locale=next==='ar'?'ar':'en';
  root.lang=locale;
  root.dir=locale==='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-en][data-ar]').forEach(el=>{
    const value=el.getAttribute('data-'+locale);
    if(value!==null)el.textContent=value;
  });
  document.title=labels[locale].title;
  document.querySelector('meta[name=description]')?.setAttribute('content',labels[locale].description);
  if(toggle){toggle.textContent=labels[locale].switch;toggle.setAttribute('aria-label',labels[locale].switchLabel);}
  const placeholders={
    'full-name':['Your name','اسمك'],
    'work-email':['name@company.com','name@company.com'],
    'project-location':['City / project site','المدينة / موقع المشروع'],
    'project-notes':['Describe your equipment or support needs, schedule and any relevant specifications.','اشرح احتياجك للمعدات أو الخدمات والمدة والمواصفات ذات الصلة.']
  };
  for(const [id,[en,ar]] of Object.entries(placeholders)){
    const el=document.getElementById(id);
    if(el)el.setAttribute('placeholder',locale==='ar'?ar:en);
  }
  if(previewData)renderSummary(previewData);
  try{localStorage.setItem(langKey,locale);}catch(_){}
  closeMenu();
}
function renderSummary(data){
  if(!summary)return;
  summary.replaceChildren();
  const choice=[...serviceSelect.options].find(option=>option.value===data.serviceValue);
  const serviceLabel=choice?.getAttribute('data-'+language())||choice?.textContent||'';
  const items=[data.fullName,data.email,serviceLabel,data.location,data.requirements];
  labels[language()].summary.forEach((heading,index)=>{
    const dt=document.createElement('dt'),dd=document.createElement('dd');
    dt.textContent=heading;dd.textContent=items[index];
    summary.append(dt,dd);
  });
}
let saved='en';
try{saved=localStorage.getItem(langKey)||'en';}catch(_){}
switchLanguage(saved);
toggle?.addEventListener('click',()=>switchLanguage(language()==='en'?'ar':'en'));
menuButton?.addEventListener('click',()=>{
  const expanded=nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(expanded));
  menuButton.setAttribute('aria-label',expanded?labels[language()].menuClose:labels[language()].menuOpen);
});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{
  const selected=button.getAttribute('data-service');
  if(serviceSelect && [...serviceSelect.options].some(option=>option.value===selected)){
    serviceSelect.value=selected;
    const anchor=document.getElementById('enquiry');
    anchor?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    serviceSelect.focus({preventScroll:true});
    if(help)help.textContent=language()==='ar'?'تم اختيار نوع الخدمة في النموذج التجريبي. لا يتم إرسال أي بيانات.':'Service selected in the demo form. No information is transmitted.';
  }
}));
form?.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.checkValidity()){
    if(help)help.textContent=labels[language()].required;
    form.reportValidity();
    return;
  }
  const values=new FormData(form);
  previewData={
    fullName:String(values.get('fullName')||'').trim(),
    email:String(values.get('email')||'').trim(),
    serviceValue:String(values.get('service')||''),
    location:String(values.get('location')||'').trim(),
    requirements:String(values.get('requirements')||'').trim()
  };
  renderSummary(previewData);
  form.hidden=true;
  preview.hidden=false;
  if(help)help.textContent=labels[language()].previewReady;
  preview.focus({preventScroll:false});
});
edit?.addEventListener('click',()=>{
  if(preview)preview.hidden=true;
  if(form)form.hidden=false;
  document.getElementById('full-name')?.focus();
});
})();