(()=>{"use strict";
const root=document.documentElement;
const button=document.getElementById("lang-toggle");
const storageKey="abdulrahman-portfolio-lang";
const copy={
 ar:{title:"عبدالرحمن | مطور ويب مستقل",description:"عبدالرحمن — مطور مواقع مستقل متخصص في مواقع الشركات، كتالوجات المنتجات، WordPress وتجارب طلب عروض الأسعار.",button:"EN",label:"Switch to English"},
 en:{title:"Abdulrahman | Independent Web Developer",description:"Independent developer building clear, responsive business websites, bilingual B2B catalogs, WordPress content systems and quotation journeys.",button:"عربي",label:"التحويل إلى العربية"}
};
function setLanguage(language){
 const locale=language==="en"?"en":"ar";
 root.lang=locale;
 root.dir=locale==="ar"?"rtl":"ltr";
 document.querySelectorAll("[data-ar][data-en]").forEach(el=>{
   const next=el.getAttribute("data-"+locale);
   if(next!==null)el.textContent=next;
 });
 document.querySelectorAll("[data-alt-ar][data-alt-en]").forEach(el=>{
   const next=el.getAttribute("data-alt-"+locale);
   if(next!==null)el.setAttribute("alt",next);
 });
 document.title=copy[locale].title;
 const meta=document.querySelector('meta[name="description"]');
 if(meta)meta.setAttribute("content",copy[locale].description);
 if(button){button.textContent=copy[locale].button;button.setAttribute("aria-label",copy[locale].label);}
 try{localStorage.setItem(storageKey,locale);}catch(_){}
}
let saved="ar";
try{saved=localStorage.getItem(storageKey)||"ar";}catch(_){}
setLanguage(saved);
button?.addEventListener("click",()=>setLanguage(root.lang==="ar"?"en":"ar"));
})();