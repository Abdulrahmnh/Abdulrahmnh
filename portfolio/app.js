(()=>{"use strict";
const root=document.documentElement;
const button=document.getElementById("lang-toggle");
function useLanguage(lang){
 const locale=lang==="en"?"en":"ar";
 root.lang=locale;root.dir=locale==="ar"?"rtl":"ltr";
 for(const el of document.querySelectorAll("[data-ar][data-en]")){
   el.textContent=el.getAttribute("data-"+locale)||"";
 }
 document.title=locale==="ar"?"عبدالرحمن | مطور مواقع مستقل":"Abdulrahman | Independent Web Developer";
 const meta=document.querySelector('meta[name="description"]');
 if(meta)meta.setAttribute("content",locale==="ar"
  ?"عبدالرحمن — مطور مواقع مستقل. مواقع شركات عربية وإنجليزية، كتالوجات منتجات، WordPress وتجارب طلب عروض الأسعار."
  :"Abdulrahman is an independent web developer building bilingual company websites, B2B product catalogs, WordPress experiences and quote request flows.");
 if(button){button.textContent=locale==="ar"?"EN ↗":"عربي ↗";button.setAttribute("aria-label",locale==="ar"?"Switch language to English":"التحويل إلى اللغة العربية");}
 try{localStorage.setItem("abdulrahman-portfolio-lang",locale);}catch(_){}
}
let saved="ar";
try{saved=localStorage.getItem("abdulrahman-portfolio-lang")||"ar";}catch(_){}
useLanguage(saved);
if(button)button.addEventListener("click",()=>useLanguage(root.lang==="ar"?"en":"ar"));
})();
