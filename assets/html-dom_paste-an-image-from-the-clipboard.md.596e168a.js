import{d as D,b as d,o,c as t,e as c,w as m,r as b,h as B,p as u,f as A,g as r,_,a as E}from"./app.e95da9d6.js";const i=n=>(u("data-v-2b55e905"),n=n(),A(),n),h={class:"container"},f=i(()=>r("kbd",{class:"key"},"Ctrl + V",-1)),g=i(()=>r("img",{class:"preview",id:"preview"},null,-1)),v=D({__name:"PasteImageFromClipboard",setup(n){return d(()=>{const l=document.getElementById("preview");document.addEventListener("paste",e=>{var p;const s=(p=e.clipboardData)==null?void 0:p.items;if(s){for(let a=0;a<s.length;a++)if(s[a].type.indexOf("image")!==-1){const y=s[a].getAsFile(),F=window.URL||window.webkitURL;l.src=F.createObjectURL(y)}}})}),(l,e)=>{const s=b("P");return o(),t("div",h,[c(s,null,{default:m(()=>[f,B(" 从剪贴板粘贴图像")]),_:1}),g])}}});const C=_(v,[["__scopeId","data-v-2b55e905"]]),w=E(`<h1 id="从剪贴板粘贴图像" tabindex="-1">从剪贴板粘贴图像 <a class="header-anchor" href="#从剪贴板粘贴图像" aria-hidden="true">#</a></h1><p>监听<code>paste</code>事件, 从剪贴板获取图像数据, 转换为 blob 类型.</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// Handle the \`paste\` event</span></span>
<span class="line"><span style="color:#BABED8;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">paste</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">evt</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// Get the data of clipboard</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">clipboardItems</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">evt</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">clipboardData</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">items</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">items</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> []</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">slice</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">call</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">clipboardItems</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">filter</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">item</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// Filter the image items only</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">item</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">type</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">indexOf</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">image</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#BABED8;">items</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">item</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">items</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// Get the blob of image</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">blob</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">item</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getAsFile</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>通过<code>URL.createObjectURL</code>, 我们可以创建一个指向 blob 的 URL, 然后将其赋值给<code>img</code>元素的<code>src</code>属性, 从而显示图像.</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// Assume that we have an \`img\` element</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// &lt;img id=&quot;preview&quot; /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> imageEle </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementById</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">preview</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#BABED8;">imageEle</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">src </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> URL</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createObjectURL</span><span style="color:#BABED8;">(blob)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-hidden="true">#</a></h3>`,6),L=JSON.parse('{"title":"从剪贴板粘贴图像","description":"","frontmatter":{},"headers":[{"level":3,"title":"示例","slug":"示例","link":"#示例","children":[]}],"relativePath":"html-dom/paste-an-image-from-the-clipboard.md","lastUpdated":1705731080000}'),x={name:"html-dom/paste-an-image-from-the-clipboard.md"},R=Object.assign(x,{setup(n){return(l,e)=>(o(),t("div",null,[w,c(C)]))}});export{L as __pageData,R as default};