(()=>{"use strict";
  const root=document.documentElement;
  const switcher=document.getElementById("lang-toggle");
  const menuButton=document.getElementById("menu-toggle");
  const nav=document.getElementById("primary-nav");
  const key="abdulrahman-portfolio-lang";
  const metadata={
    ar:{title:"عبدالرحمن — تطوير مواقع للشركات",description:"عبدالرحمن — مطور ويب مستقل يبني مواقع شركات وكتالوجات B2B وأنظمة WordPress وتجارب عربية وإنجليزية.",button:"EN",label:"Switch to English",menuOpen:"إغلاق القائمة",menuClosed:"فتح القائمة"},
    en:{title:"Abdulrahman — Independent Web Developer",description:"Independent developer creating practical bilingual business websites, B2B catalogs, and WordPress content systems.",button:"عربي",label:"Switch to Arabic",menuOpen:"Close menu",menuClosed:"Open menu"}
  };
  function setLanguage(lang){
    const locale=lang==="en"?"en":"ar";
    root.lang=locale;root.dir=locale==="ar"?"rtl":"ltr";
    document.querySelectorAll("[data-ar][data-en]").forEach(element=>{
      const value=element.getAttribute("data-"+locale);
      if(value!==null){
        if(value.includes("<em>")||value.includes("<br>"))element.innerHTML=value;
        else element.textContent=value;
      }
    });
    document.querySelectorAll("[data-alt-ar][data-alt-en]").forEach(element=>{
      element.setAttribute("alt",element.getAttribute("data-alt-"+locale)||"");
    });
    document.title=metadata[locale].title;
    const description=document.querySelector('meta[name="description"]');
    if(description)description.setAttribute("content",metadata[locale].description);
    if(switcher){switcher.textContent=metadata[locale].button;switcher.setAttribute("aria-label",metadata[locale].label);}
    updateMenuLabel();
    try{localStorage.setItem(key,locale)}catch(_){}
  }
  function updateMenuLabel(){
    if(!menuButton)return;
    const open=menuButton.getAttribute("aria-expanded")==="true";
    menuButton.setAttribute("aria-label",metadata[root.lang==="en"?"en":"ar"][open?"menuOpen":"menuClosed"]);
  }
  function setMenu(open){
    if(!menuButton||!nav)return;
    menuButton.setAttribute("aria-expanded",String(open));
    nav.classList.toggle("is-open",open);
    updateMenuLabel();
  }
  let initial="ar";
  try{initial=localStorage.getItem(key)||"ar"}catch(_){}
  setLanguage(initial);
  switcher?.addEventListener("click",()=>setLanguage(root.lang==="ar"?"en":"ar"));
  menuButton?.addEventListener("click",()=>setMenu(menuButton.getAttribute("aria-expanded")!=="true"));
  nav?.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",()=>setMenu(false)));
  document.addEventListener("keydown",event=>{if(event.key==="Escape")setMenu(false)});
  document.addEventListener("click",event=>{
    if(nav?.classList.contains("is-open")&&!nav.contains(event.target)&&!menuButton?.contains(event.target))setMenu(false);
  });
})();