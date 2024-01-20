import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
  { text: '导航', link: '/navs/' },
  // {
  //   text: '日常笔记',
  //   items: [
  //     { text: 'JavaScript 基础知识', link: '/fe/javascript/types' },
  //     { text: 'ES6 常用知识', link: '/fe/es6/' },
  //     { text: 'TypeScript 基础知识', link: '/fe/typescript/base' },
  //     { text: '浏览器相关知识', link: '/fe/browser/' }
  //   ],
  //   activeMatch: '^/fe'
  // },
  {
    text: 'Reference',
    link: 'https://wangchujiang.com/reference/index.html'
  },
  {
    text: 'vue3-resource',
    link: 'https://hu-snail.github.io/vue3-resource/'
  },
  {
    text: '日常笔记',
    link: 'https://rzx007.github.io/docs/'
  }
]
