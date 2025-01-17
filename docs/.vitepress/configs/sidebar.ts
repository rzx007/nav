import type { DefaultTheme } from 'vitepress'
import menu from '../../navs/menu.json'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/html-dom/': menu,
  '/efficiency/': [
    { text: '多平台软件', link: '/efficiency/software/cross-platform' },
    { text: 'Mac 平台', link: '/efficiency/software/mac' },
    { text: 'Windows 平台', link: '/efficiency/software/windows' },
    { text: '浏览器设置与扩展', link: '/efficiency/software/browser' },
    { text: 'Visual Studio Code 配置', link: '/efficiency/software/vscode' },
    { text: 'WebStorm 配置', link: '/efficiency/software/webstorm' },
    { text: 'ONLYOFFICE 工作原理', link: '/efficiency/software/onlyoffice' },
  ]
}
