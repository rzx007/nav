---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: ZeroToHero
  text: 个人前端导航
  tagline: 使用 VitePress 打造个人前端导航
  image:
    src: /logo.png
    alt: logo
  actions:
    - text: 前端导航
      link: /navs/

    # - text: mmPlayer
    #   link: https://netease-music.fe-mm.com
    #   theme: alt
features:
  - icon: 📖
    title: 前端知识
    details: 整理前端常用知识点<br />如有异议按你的理解为主，不接受反驳
  - icon: 📘
    title: 源码阅读
    details: 了解各种库的实现原理<br />学习其中的小技巧和冷知识
  - icon: 💡
    title: 奇淫技巧
    details: 各种各样的奇淫技巧<br />配合 CV 大法来解决疑难杂症
  - icon: 🧰
    title: 提效工具
    details: 工欲善其事，必先利其器<br />记录开发和日常使用中所用到的软件、插件、扩展等
  - icon: 🐞
    title: 踩坑记录
    details: 那些年我们踩过的坑<br />总有一些让你意想不到的问题
  - icon: 💯
    title: 懦弱之举, 我决不姑息。
    details: '<small class="bottom-small">来自诺克萨斯之手-德莱厄斯</small>'
---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>
