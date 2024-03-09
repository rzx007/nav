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
    text: '提效工具',
    items: [
      {
        text: '软件推荐与配置',
        items: [
          { text: '多平台软件', link: '/efficiency/software/cross-platform' },
          // { text: 'Mac 平台', link: '/efficiency/software/mac' },
          { text: 'Windows 平台', link: '/efficiency/software/windows' },
          { text: '浏览器设置与扩展', link: '/efficiency/software/browser' },
          { text: 'Visual Studio Code 配置', link: '/efficiency/software/vscode' },
          { text: 'WebStorm 配置', link: '/efficiency/software/webstorm' }
        ]
      },
      { text: '在线工具', link: '/efficiency/online-tools' },
      { text: '书签脚本', link: '/efficiency/bookmark-scripts' }
    ],
    activeMatch: '^/efficiency'
  },
  {
    text: 'Reference',
    link: 'https://wangchujiang.com/reference/index.html'
  },
  {
    text: 'vue3-resource',
    link: 'https://hu-snail.github.io/vue3-resource/'
  },
  {
    text: '书籍',
    link: ' https://youjia.sx.cn/you-dont-know-ts/'
  },
  {
    text: '日常笔记',
    link: 'https://rzx007.github.io/docs/'
  }
]
