import{d as D,b as d,o,c as t,e as c,w as m,r as b,h as B,p as u,f as A,g as r,_,a as E}from"./app.e95da9d6.js";const i=n=>(u("data-v-2b55e905"),n=n(),A(),n),h={class:"container"},f=i(()=>r("kbd",{class:"key"},"Ctrl + V",-1)),g=i(()=>r("img",{class:"preview",id:"preview"},null,-1)),v=D({__name:"PasteImageFromClipboard",setup(n){return d(()=>{const l=document.getElementById("preview");document.addEventListener("paste",e=>{var p;const s=(p=e.clipboardData)==null?void 0:p.items;if(s){for(let a=0;a<s.length;a++)if(s[a].type.indexOf("image")!==-1){const y=s[a].getAsFile(),F=window.URL||window.webkitURL;l.src=F.createObjectURL(y)}}})}),(l,e)=>{const s=b("P");return o(),t("div",h,[c(s,null,{default:m(()=>[f,B(" 从剪贴板粘贴图像")]),_:1}),g])}}});const C=_(v,[["__scopeId","data-v-2b55e905"]]),w=E("",6),L=JSON.parse('{"title":"从剪贴板粘贴图像","description":"","frontmatter":{},"headers":[{"level":3,"title":"示例","slug":"示例","link":"#示例","children":[]}],"relativePath":"html-dom/paste-an-image-from-the-clipboard.md","lastUpdated":1705731080000}'),x={name:"html-dom/paste-an-image-from-the-clipboard.md"},R=Object.assign(x,{setup(n){return(l,e)=>(o(),t("div",null,[w,c(C)]))}});export{L as __pageData,R as default};