import{d,h as g,l as y,o as k,c as t,F,G as c,m as p,J as o,V as u}from"./chunks/framework.7XExV1ji.js";const C={class:"l-card aspect-video bg-neutral-500 rounded-md relative overflow-hidden"},b=p("div",{class:"absolute z-10 inset-0.5 bg-neutral-700 rounded-md"},null,-1),m=[b],B=d({__name:"BorderHighlight",setup(e){const i=g(null);return y(()=>{var l;const a=((l=i.value)==null?void 0:l.querySelectorAll(".l-card"))||[];i.value.onmousemove=s=>{for(const h of a){const n=h.getBoundingClientRect(),E=s.clientX-n.left-n.width/2,r=s.clientY-n.top-n.height/2;h.style.setProperty("--x",E+"px"),h.style.setProperty("--y",r+"px")}},i.value.onmouseleave=()=>{for(const s of a)s.style.setProperty("--x","0px"),s.style.setProperty("--y","0px")}}),(a,l)=>(k(),t("div",{class:"grid grid-cols-4 gap-2",ref_key:"container",ref:i},[(k(),t(F,null,c(7,s=>p("div",C,m)),64))],512))}}),A=u("",4),_=JSON.parse('{"title":"边框高亮效果","description":"","frontmatter":{},"headers":[],"relativePath":"html-dom/border-highlight.md","filePath":"html-dom/border-highlight.md","lastUpdated":1736501483000}'),D={name:"html-dom/border-highlight.md"},f=Object.assign(D,{setup(e){return(i,a)=>(k(),t("div",null,[A,o(B)]))}});export{_ as __pageData,f as default};