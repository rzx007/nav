import { defineConfig } from 'vitepress'

import { head, nav, sidebar } from './configs'

export default defineConfig({
  outDir: '../dist',
  base: '/nav',

  lang: 'zh-CN',
  title: 'ZeroToHero',
  description: '包含前端常用知识、源码阅读笔记、各种奇淫技巧、日常提效工具等',
  head,

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    search: {
      provider: 'local'
    },
    logo: '/logo.png',

    nav,
    sidebar,
    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '本页目录'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/rzx007/nav.git' }],

    footer: {
      message: '如有转载或 CV 的请标注本站原文地址',
      copyright: 'Copyright © 2023-present rzx100'
    },

    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '上次更新',

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    }
  },
  /* vite配置 */
  vite: {
    server: {
      host: true,
      port: 3333
    }
  }
})

