(()=>{"use strict";
const root=document.documentElement;
const button=document.getElementById("lang-toggle");
const storageKey="abdulrahman-portfolio-lang";
const copy={
  ar:{title:"عبدالرحمن | مطور ويب مستقل",description:"عبدالرحمن، مطور ويب مستقل. مواقع شركات ثنائية اللغة وكتالوجات B2B وتجارب WordPress وطلبات عروض الأسعار.",button:"EN",label:"Switch to English"},
  en:{title:"Abdulrahman | Independent Web Developer",description:"Independent developer building purposeful bilingual business websites, B2B catalogs, WordPress content systems and quotation journeys.",button:"عربي",label:"التحويل إلى العربية"}
};
function setLanguage(language){
  const locale=language==="en"?"en":"ar";
  root.lang=locale;
  root.dir=locale==="ar"?"rtl":"ltr";
  document.querySelectorAll("[data-ar][data-en]").forEach(element=>{
    const next=element.getAttribute("data-"+locale);
    if(next!==null)element.textContent=next;
  });
  document.title=copy[locale].title;
  const description=document.querySelector('meta[name="description"]');
  if(description)description.setAttribute("content",copy[locale].description);
  if(button){button.textContent=copy[locale].button;button.setAttribute("aria-label",copy[locale].label);}
  try{localStorage.setItem(storageKey,locale);}catch(_){}
}
let remembered="ar";
try{remembered=localStorage.getItem(storageKey)||"ar";}catch(_){}
setLanguage(remembered);
if(button)button.addEventListener("click",()=>setLanguage(root.lang==="ar"?"en":"ar"));
})();