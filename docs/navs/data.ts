import type { NavLink } from './components/type'

type NavData = {
  title: string
  items: NavLink[]
}

export const NAV_DATA: NavData[] = [
  {
    title: 'AI 导航',
    items: [
      {
        icon: '/icons/chatgpt.png',
        title: 'ChatGPT（最强）',
        link: 'https://chat.openai.com/chat',
      },
      {
        icon: 'https://www.notion.so/images/logo-ios.png',
        title: 'Notion AI（笔记）',
        link: 'https://www.notion.so',
      },
      {
        icon: 'https://www.midjourney.com/apple-touch-icon.png',
        title: 'Midjourney（绘画）',
        link: 'https://www.midjourney.com',
      },
      {
        icon: 'https://global-uploads.webflow.com/59deb588800ae30001ec19c9/5d4891e0e260e3c1bc37b100_beautiful%20ai%20favicon%20%20blue%20square.png',
        title: 'Beautiful.ai（PPT）',
        link: 'https://www.beautiful.ai',
      },
      {
        icon: 'https://acd-assets.alicdn.com/acd_work/tongyi/favicon.ico',
        title: '阿里通义',
        link: 'https://tongyi.aliyun.com/',
      },
      {
        icon: 'https://registry.npmmirror.com/@lobehub/assets-logo/1.2.0/files/assets/logo-3d.webp',
        title: 'LobeChat',
        link: 'https://chat-preview.lobehub.com/welcome',
      },
      {
        icon: '/icons/chatgpt.webp',
        title: 'Free ChatGPT',
        link: 'https://cc.ai55.cc/',
      },
      {
        icon: '/icons/ollama.png',
        title: 'Ollama',
        link: 'https://ollama.com/',
      },
    ],
  },
  {
    title: 'Vue 生态',
    items: [
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'Vue 3',
        desc: '渐进式 JavaScript 框架',
        link: 'https://cn.vuejs.org',
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'Vue 2',
        desc: '渐进式 JavaScript 框架',
        link: 'https://v2.cn.vuejs.org',
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'Vue Router',
        desc: 'Vue.js 的官方路由\n为 Vue.js 提供富有表现力、可配置的、方便的路由',
        link: 'https://router.vuejs.org/zh',
      },
      {
        icon: 'https://pinia.vuejs.org/logo.svg',
        title: 'Pinia',
        desc: '符合直觉的 Vue.js 状态管理库',
        link: 'https://pinia.vuejs.org/zh',
      },
      {
        icon: 'https://nuxt.com/icon.png',
        title: 'Nuxt.js',
        desc: '一个基于 Vue.js 的通用应用框架',
        link: 'https://nuxt.com',
      },
      {
        icon: 'https://vueuse.org/favicon.svg',
        title: 'VueUse',
        desc: 'Vue Composition API 的常用工具集',
        link: 'https://vueuse.org',
      },
      {
        icon: '/icons/vuehooks.png',
        title: 'VueHooks Plus',
        desc: '高性能和简单性🧲 Vue 3 Hooks 库',
        link: 'https://inhiblabcore.github.io/docs/hooks/',
      },
      {
        icon: 'https://formkit.com/favicon.ico',
        title: 'FormKit',
        desc: '适用于 Vue 的 开源 表单框架,使开发人员能够以10倍的速度构建表单。',
        link: 'https://formkit.com/zh',
      },
      {
        icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
        title: 'Element Plus',
        desc: '基于 Vue 3，面向设计师和开发者的组件库',
        link: 'https://element-plus.org',
      },
      {
        icon: '/icons/naivelogo-XQ1U1Js8.svg',
        title: 'Naive UI',
        desc: '一个 Vue 3 组件库比较完整，主题可调，使用 TypeScript，快有点意思',
        link: 'https://www.naiveui.com/zh-CN/os-theme',
      },
      {
        icon: '/icons/Shacdn-vue.svg',
        title: 'shadcn-vue',
        desc: 'vue版本的shadcn/ui，设计精美的组件,你可以直接复制和粘贴到你的应用中。',
        link: 'https://www.shadcn-vue.com/',
      },
      {
        icon: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
        title: 'Ant Design Vue',
        desc: 'Ant Design 的 Vue 实现，开发和服务于企业级后台产品',
        link: 'https://antdv.com',
      },
      {
        icon: 'https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-light.svg',
        title: 'Vuetify',
        desc: 'Vuetify 是一个零设计经验可用的 Vue 界面组件框架，包含了很多优美的自定义 Vue 组件。',
        link: 'https://vuetifyjs.com/zh-Hans/',
      },
      {
        icon: 'https://primevue.org/favicon.ico',
        title: 'PrimeVue',
        desc: '最完整的 Vue.js UI 套件',
        link: 'https://primevue.org/',
      },
      {
        icon: 'https://static.tdesign.tencent.com/vue-next/favicon.ico',
        title: 'TDesign',
        desc: '腾讯出品的 Vue 组件。',
        link: 'https://tdesign.tencent.com/',
      },
      {
        icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
        title: 'Vant',
        desc: '轻量、可定制的移动端 Vue 组件库',
        link: 'https://vant-ui.github.io/vant',
      },
      {
        icon: 'https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png',
        title: 'NutUI',
        desc: '京东风格的轻量级移动端组件库',
        link: 'https://nutui.jd.com',
      },

    ],
  },
  {
    title: 'React 生态',
    items: [
      {
        icon: 'https://zh-hans.reactjs.org/favicon.ico',
        title: 'React',
        desc: '用于构建用户界面的 JavaScript 库',
        link: 'https://zh-hans.reactjs.org',
      },
      {
        icon: 'https://reactrouter.com/favicon-light.png',
        title: 'React Router',
        desc: 'React 的声明式路由',
        link: 'https://reactrouter.com',
      },
      {
        icon: 'https://nextjs.org/static/favicon/safari-pinned-tab.svg',
        title: 'Next.js',
        desc: '一个用于 Web 的 React 框架',
        link: 'https://nextjs.org',
      },
      {
        icon: 'https://remix.run/favicon-192.png',
        title: 'Remix',
        desc: 'Focused on web standards and modern web app UX, you’re simply going to build better websites',
        link: 'https://remix.run/',
      },
      {
        icon: 'https://docs.pmnd.rs/apple-touch-icon.png',
        title: 'Pmndrs.docs',
        desc: '一个包含集合react库的的导航站, 包括Zustand, Valtio, Jotai等',
        link: 'https://docs.pmnd.rs/',
      },
      {
        icon: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
        title: 'UmiJS',
        desc: '插件化的企业级前端应用框架',
        link: 'https://umijs.org',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png',
        title: 'Ant Design',
        desc: '一套企业级 UI 设计语言和 React 组件库',
        link: 'https://ant.design',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/bmw-prod/69a27fcc-ce52-4f27-83f1-c44541e9b65d.svg',
        title: 'Ant Design Mobile',
        desc: '构建移动 WEB 应用程序的 React 组件库',
        link: 'https://mobile.ant.design',
      },
      {
        icon: '/icons/mui.svg',
        title: 'Material UI',
        desc: '基于 Google Material Design 设计语言的 React 组件库',
        link: 'https://mui.com/',
      },
      {
        icon: '/icons/mantine.svg',
        title: 'Mantine UI',
        desc: '一套功能齐全的 React 组件库',
        link: 'https://mantine.dev/',
      },
      {
        icon: 'https://ui.shadcn.com/apple-touch-icon.png',
        title: 'shadcn/ui',
        desc: '设计精美的组件,你可以直接复制和粘贴到你的应用中',
        link: 'https://ui.shadcn.com/',
      },
      {
        icon: 'https://docs.pmnd.rs/apple-touch-icon.png',
        title: 'Zustand',
        desc: '一个小型、快速、可扩展的 React 状态管理解决方案',
        link: 'https://docs.pmnd.rs/zustand/getting-started/introduction',
      },
      {
        icon: 'https://valtio.pmnd.rs/favicon.ico',
        title: 'Valtio',
        desc: 'makes proxy-state simple for React and Vanilla',
        link: 'https://valtio.pmnd.rs',
      },
      {
        icon: 'https://jotai.org/favicon.svg',
        title: 'Jotai',
        desc: 'primitive and flexible state management for React',
        link: 'https://jotai.org',
      },
      {
        icon: 'https://cn.redux.js.org/img/redux.svg',
        title: 'Redux',
        desc: 'JavaScript 应用的状态容器，提供可预测的状态管理',
        link: 'https://cn.redux.js.org',
      },
      {
        icon: 'https://zh.mobx.js.org/assets/mobx.png',
        title: 'MobX',
        desc: '一个小型、快速、可扩展的 React 状态管理解决方案',
        link: 'https://zh.mobx.js.org',
      },
      {
        icon: 'https://ahooks.js.org/simple-logo.svg',
        title: 'ahooks',
        desc: '一套高质量可靠的 React Hooks 库',
        link: 'https://ahooks.js.org/zh-CN',
      },

    ],
  },
  {
    title: '有意思的库',
    items: [
      {
        icon: 'https://swiperjs.com/images/swiper-logo.svg',
        title: 'Swiper',
        desc: '最现代的移动触摸Swiper',
        link: 'https://swiperjs.com/',
      },
      {
        icon: 'https://auto-animate.formkit.com/assets/favicon.6d15a86f.ico',
        title: 'AutoAnimate',
        desc: 'AutoAnimate 是一个零配置的插入式动画实用程序， React、Solid、Vue、Svelte 或任何其他框架。',
        link: 'https://auto-animate.formkit.com/',
      },
      {
        icon: '/icons/gsap.png',
        title: 'GSAP',
        desc: '一个非常强大的 JavaScript 动画库。专为专业人士打造',
        link: 'https://gsap.com/',
      },
      {
        icon: 'https://www.langui.dev/favicon.ico',
        title: 'LangUI',
        desc: 'Beautiful components for your AI projects',
        link: 'https://www.langui.dev/',
      },
      {
        icon: 'https://registry.npmmirror.com/@lobehub/assets-logo/1.1.0/files/assets/logo-3d.webp',
        title: 'Lobe UI',
        desc: 'Lobe UI is an open-source UI component library for building AIGC web apps',
        link: 'https://ui.lobehub.com/',
      },
      {
        icon: 'https://sf16-scmcdn-sg.ibytedtos.com/obj/static-sg/visactor-site/output/sg/img/favicon.png',
        title: 'VisActor',
        desc: 'VisActor ——面向叙事的智能可视化解决方案',
        link: 'https://visactor.io/',
      },
      {
        icon: '/icons/radash.png',
        title: 'Radash',
        desc: '功能性工具库 - 现代，简洁，类型化，强大',
        link: 'https://radash-docs.vercel.app/docs/getting-started',
      },
      {
        icon: 'https://lodash.com/assets/img/lodash.svg',
        title: 'Lodash',
        desc: '一个现代的JavaScript实用工具库，提供模块化、性能和额外功能。',
        link: 'https://lodash.com/',
      },
      {
        icon: 'https://es-toolkit.slash.page/logo_white.png',
        title: 'es-toolkit',
        desc: 'es-toolkit State-of-the-art JavaScript utility library',
        link: 'https://es-toolkit.slash.page/',
      },
      {
        icon: 'https://oxism.com/trystero/images/favicon.png',
        title: 'Trystero',
        desc: '构建即时多人 Web 应用程序，无需服务器 — 通过 BitTorrent、Nostr、MQTT、IPFS 和 Firebase 进行 Magic WebRTC 匹配。',
        link: 'https://oxism.com/trystero/',
      },
      {
        icon: 'https://docs.livekit.io/images/logo-small.svg',
        title: 'LiveKit',
        desc: 'End-to-end stack for WebRTC. SFU media server and SDKs.',
        link: 'https://docs.livekit.io/home/',
      },
      {
        icon: '/icons/drag-and-drop.svg',
        title: 'Pragmatic drag and drop',
        desc: '快速推拽插件，适用于任何技术栈。',
        link: 'https://atlassian.design/components/pragmatic-drag-and-drop/',
      },
      {
        icon: '/icons/tiny-drag-and-drop.svg',
        title: 'Drag + Drop',
        desc: '一个小型的数据优先的拖拽库, 支持Vue,React和原生js',
        link: 'https://atlassian.design/components/pragmatic-drag-and-drop/',
      },
      {
        icon: 'https://gridstackjs.com/logos/gridstack-logo-small.png',
        title: 'Gridstack.js',
        desc: '在几分钟内构建交互式仪表板',
        link: 'https://gridstackjs.com/',
      },
      {
        icon: 'https://tanstack.com/_build/assets/logo-color-600w-Bx4vtR8J.png',
        title: 'TanStack',
        desc: "TanStack, '无头'(headless)工具集, 包括数据请求, Form, List, Table等工具, 支持React， Vue",
        link: 'https://tanstack.com/',
      },
    ],
  },
  {
    title: 'JavaScript 框架类库',
    items: [
      {
        icon: 'https://angular.cn/assets/images/logos/angular/angular.svg',
        title: 'Angular',
        desc: '现代 Web 开发平台',
        link: 'https://angular.cn/',
      },
      {
        icon: 'https://svelte.dev/svelte-logo-horizontal.svg',
        title: 'Svelte',
        desc: '将声明性组件转换为精准高效更新 DOM 的 JavaScript 代码',
        link: 'https://svelte.dev',
      },
      {
        icon: 'https://www.solidjs.com/assets/logo-123b04bc.svg',
        title: 'Solid',
        desc: '一个用于构建用户界面，简单高效、性能卓越的JavaScript库',
        link: 'https://www.solidjs.com/',
      },
      {
        icon: 'https://nuejs.org/global/logo/n.svg',
        title: 'Nue',
        desc: '使用更简洁的代码构建用户界面。React、Vue 和 Svelte 的替代品',
        link: 'https://nuejs.org/',
      },
      {
        // icon: 'https://simpleicons.org/icons/jquery.svg',
        icon: '/icons/jquery.svg',
        title: 'jQuery API 中文文档',
        desc: '一个兼容多浏览器的 JavaScript 框架',
        link: 'https://jquery.cuishifeng.cn',
      },
    ],
  },
  {
    title: 'JavaScript 运行时',
    items: [
      {
        icon: '/icons/nodejs.svg',
        title: 'Node.js',
        desc: 'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境',
        link: 'https://nodejs.org/zh-cn',
      },
      {
        icon: '/icons/logo.svg',
        title: 'Deno',
        desc: '下一代Nodejs, 最简单，最安全的JavaScript运行时',
        link: 'https://deno.land/',
      },
      {
        icon: '/icons/bun.svg',
        title: 'Bun',
        desc: 'Bun, 最简单，最安全的JavaScript运行时',
        link: 'https://bun.sh/',
      },
    ],
  },
  {
    title: 'Node 相关',
    items: [
      {
        icon: 'https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg',
        title: 'Nest.js 中文文档',
        desc: '用于构建高效且可伸缩的服务端应用程序的渐进式 Node.js 框架',
        link: 'https://docs.nestjs.cn',
      },
      {
        icon: 'https://expressjs.com/images/favicon.png',
        title: 'Express',
        desc: '基于 Node.js 平台，快速、开放、极简的 Web 开发框架',
        link: 'https://expressjs.com',
      },
      {
        icon: '/icons/koa.svg',
        title: 'Koa',
        desc: '基于 Node.js 平台的下一代 web 开发框架',
        link: 'https://koajs.com',
      },
      {
        icon: 'https://www.eggjs.org/favicon.png',
        title: 'Egg',
        desc: '为企业级框架和应用而生',
        link: 'https://www.eggjs.org/zh-CN',
      },
      {
        icon: 'http://midwayjs.org/img/logo.svg',
        title: 'Midway',
        desc: 'Midway Node.js Framework For Full-stack TypeScript Development',
        link: 'http://midwayjs.org/',
      },
      {
        icon: 'https://nodejstoolbox.com/logo-background.png',
        title: 'Node.js Toolbox',
        desc: 'Find actively maintained and popular libraries in the Node.js ecosystem',
        link: 'https://nodejstoolbox.com/',
      },
      {
        icon: '/icons/fresh.png',
        title: 'Fresh',
        desc: '基于Deno的下一代web框架',
        link: 'https://fresh.deno.dev/',
      },
      {
        icon: '/icons/logo.svg',
        title: 'Danet',
        desc: 'Deno生态的NestJs',
        link: 'https://savory.github.io/Danet/',
      },
      {
        icon: '/icons/Elysia.png',
        title: 'ElysiaJS',
        desc: 'ElysiaJS is a fast, and friendly Bun web framework.',
        link: 'https://elysiajs.com/',
      },
      {
        icon: 'https://nitro.unjs.io/icon.svg',
        title: 'Nitro',
        desc: '下一代服务器工具包。创建一个包含您所需的一切的Web服务器，并将其部署到您喜欢的任何位置。',
        link: 'https://nitro.unjs.com/',
      },
      {
        icon: '/icons/hono.ico',
        title: 'Hono',
        desc: 'Fast, Lightweight, Web-standards',
        link: 'https://hono.dev/',
      },
    ],
  },
  {
    title: 'CSS 相关',
    items: [
      {
        icon: 'https://postcss.org/assets/logo-3e39b0aa.svg',
        title: 'PostCSS',
        desc: '一个用 JavaScript 转换 CSS 的工具',
        link: 'https://postcss.org',
      },
      {
        icon: 'https://sass-lang.com/assets/img/logos/logo.svg',
        title: 'Sass',
        desc: '一个成熟，稳定，功能强大的专业级 CSS 扩展语言',
        link: 'https://sass-lang.com',
      },
      {
        icon: 'https://www.tailwindcss.cn/favicons/apple-touch-icon.png',
        title: 'TailwindCSS 中文网',
        desc: '一个功能类优先的 CSS 框架',
        link: 'https://www.tailwindcss.cn',
      },
      {
        icon: 'https://unocss.dev/logo.svg',
        title: 'UnoCSS',
        desc: '即时按需原子 CSS 引擎',
        link: 'https://unocss.dev/',
      },
    ],
  },
  // {
  //   title: '小程序相关',
  //   items: [
  //     {
  //       icon: 'https://res.wx.qq.com/a/wx_fed/assets/res/OTE0YTAw.png',
  //       title: '微信小程序文档',
  //       desc: '微信小程序官方开发者文档',
  //       link: 'https://developers.weixin.qq.com/miniprogram/dev/framework/'
  //     },
  //     {
  //       icon: '/icons/taro.svg',
  //       title: 'Taro',
  //       desc: '多端统一开发解决方案',
  //       link: 'https://taro.jd.com'
  //     },
  //     {
  //       icon: 'https://web-assets.dcloud.net.cn/unidoc/zh/icon.png',
  //       title: 'uni-app',
  //       desc: '一个使用 Vue.js 开发所有前端应用的框架',
  //       link: 'https://uniapp.dcloud.net.cn'
  //     },
  //     {
  //       icon: 'https://mpxjs.cn/favicon.ico',
  //       title: 'Mpx',
  //       desc: '增强型跨端小程序框架',
  //       link: 'https://mpxjs.cn'
  //     }
  //   ]
  // },

  {
    title: '可视化',
    items: [
      {
        icon: 'https://echarts.apache.org/zh/images/favicon.png',
        title: 'ECharts',
        desc: '一个基于 JavaScript 的开源可视化图表库',
        link: 'https://echarts.apache.org/zh/index.html',
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
        title: 'AntV',
        desc: '蚂蚁集团全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、无限可能的数据可视化最佳实践。',
        link: 'https://antv.vision/zh/',
      },
      {
        icon: 'https://d3js.org/logo.svg',
        title: 'D3.js',
        desc: '一个遵循 Web 标准用于可视化数据的 JavaScript 库',
        link: 'https://d3js.org',
      },
      {
        icon: 'https://www.chartjs.org/favicon.ico',
        title: 'Chart.js',
        desc: '一个简单而灵活的 JavaScript 图表库',
        link: 'https://www.chartjs.org',
      },
      {
        icon: 'https://threejs.org/files/favicon.ico',
        // icon: 'https://threejs.org/files/favicon_white.ico',
        title: 'Three.js',
        desc: 'JavaScript 3d 库',
        link: 'https://threejs.org',
      },
      {
        icon: 'https://pixijs.com/images/logo.svg',
        title: 'Pixi.js',
        desc: 'The HTML5 Creation Engine',
        link: 'https://pixijs.com/',
      },
      {
        icon: '/icons/fabric.png',
        title: 'Fabric.js',
        desc: 'Fabric.js is a powerful and simple Javascript HTML5 canvas library',
        link: 'http://fabricjs.com/',
      },
    ],
  },
  {
    title: '编译&构建&打包',
    items: [
      {
        icon: 'https://www.webpackjs.com/icon_180x180.png',
        title: 'Webpack 中文网',
        desc: '一个用于现代 JavaScript 应用程序的静态模块打包工具',
        link: 'https://www.webpackjs.com',
      },
      {
        icon: '/icons/rsbuild.png',
        title: 'Rsbuild',
        desc: 'Rsbuild 基于 Rspack 的 Web 构建工具, 快速迁移Webpack项目',
        link: 'https://rsbuild.dev/zh/',
      },
      {
        icon: 'https://cn.vitejs.dev/logo.svg',
        title: 'Vite 中文文档',
        desc: '下一代前端工具链',
        link: 'https://cn.vitejs.dev',
      },
      {
        icon: '/icons/rolldown.svg',
        title: 'Rolldown ',
        desc: 'Rolldown 基于 Rust 的JS构建工具, Rollup兼容Api, 计划用于替换Vite',
        link: 'https://rolldown.rs/',
      },
      {
        icon: '/icons/farm.png',
        title: 'Farm ',
        desc: 'Farm 是一个基于 Rust 的前端构建工具。开箱即用支持 Vite/Rollup/Unplugin/Swc  插件',
        link: 'https://www.farmfe.org/zh/',
      },
      {
        icon: 'https://www.rollupjs.com/img/favicon.png',
        title: 'Rollup',
        desc: 'Rollup 是一个 JavaScript 模块打包器',
        link: 'https://www.rollupjs.com',
      },
      {
        icon: 'https://turbo.build/images/favicon-dark/apple-touch-icon.png',
        title: 'Turbo',
        desc: 'Turbo is an incremental bundler and build system optimized for JavaScript and TypeScript, written in Rust',
        link: 'https://turbo.build',
      },
      {
        icon: '/icons/Biome.svg',
        title: 'Biome',
        desc: 'Format, lint, and more in a fraction of a second.',
        link: 'https://biomejs.dev/',
      },
      {
        icon: 'https://www.babeljs.cn/img/favicon.png',
        title: 'Babel',
        desc: 'Babel 是一个 JavaScript 编译器',
        link: 'https://www.babeljs.cn',
      },
      {
        icon: 'https://esbuild.github.io/favicon.svg',
        title: 'esbuild',
        desc: 'An extremely fast bundler for the web',
        link: 'https://esbuild.github.io',
      },
      {
        icon: '/icons/fabric.png',
        title: 'tsup',
        desc: 'The simplest and fastest way to bundle your TypeScript libraries, powered by esbuild.',
        link: 'https://tsup.egoist.dev/',
      },
      {
        icon: 'https://swc.rs/favicon/apple-touch-icon.png',
        title: 'SWC',
        desc: 'Rust-based platform for the Web',
        link: 'https://swc.rs',
      },
      {
        icon: '/icons/logo-round-min.png',
        title: 'Oxc',
        desc: 'A collection of JavaScript tools written in Rust',
        link: 'https://oxc-project.github.io/',
      },
    ],
  },
  {
    title: '站点生成器',
    items: [
      {
        icon: 'https://bestofjs.org/logos/strapi.svg',
        title: 'Strapi',
        desc: '领先的开源Headless CMS。 100% JavaScript / TypeScript，完全可定制。',
        link: 'https://strapi.io/',
      },
      {
        icon: 'https://astro.build/favicon.svg',
        title: 'Astro',
        desc: '一个现代化的轻量级静态站点生成器',
        link: 'https://astro.build',
      },
      {
        icon: 'https://vitepress.dev/vitepress-logo-large.webp',
        title: 'VitePress',
        desc: '由 Vite 和 Vue 驱动的静态网站生成器',
        link: 'https://vitepress.dev',
      },
      {
        icon: 'https://vuepress.vuejs.org/hero.png',
        title: 'VuePress',
        desc: 'Vue 驱动的静态网站生成器',
        link: 'https://vuepress.vuejs.org/zh',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
        title: 'dumi',
        desc: '基于 Umi 为组件研发而生的静态站点框架',
        link: 'https://d.umijs.org',
      },
      {
        icon: 'https://docusaurus.io/zh-CN/img/docusaurus.ico',
        title: 'Docusaurus',
        desc: '基于 React 的静态网站生成器',
        link: 'https://docusaurus.io/zh-CN',
      },
    ],
  },
  {
    title: '图标库',
    items: [
      {
        icon: 'https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg',
        title: 'iconfont',
        desc: '国内功能很强大且图标内容很丰富的矢量图标库，提供矢量图标下载、在线存储、格式转换等功能',
        link: 'https://www.iconfont.cn',
      },
      {
        icon: 'https://lf1-cdn2-tos.bytegoofy.com/bydesign/iconparksite/logo.svg',
        title: 'IconPark 图标库',
        desc: 'IconPark图标库是一个通过技术驱动矢量图标样式的开源图标库，可以实现根据单一 SVG 源文件变换出多种主题， 具备丰富的分类、更轻量的代码和更灵活的使用场景；致力于构建高质量、统一化、可定义的图标资源，让大多数人都能够选择适合自己的风格图标',
        link: 'https://iconpark.oceanengine.com/official',
      },
      {
        icon: '/icons/iconify.png',
        title: 'Iconify',
        desc: '一个开源的图标集合和图标工具',
        link: 'https://iconify.design/',
      },
      {
        icon: 'https://icones.js.org/favicon.svg',
        title: 'Icônes',
        desc: '基于 Iconify 的图标浏览器',
        link: 'https://icones.js.org/',
      },
      {
        icon: 'https://heroicons.com/_next/static/media/favicon-32x32.2a23e45f.png',
        title: 'heroicons',
        desc: 'Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.',
        link: 'https://heroicons.com/',
      },
      {
        icon: 'https://lucide.dev/logo.light.svg',
        title: 'lucide',
        desc: 'Beautiful & consistent icons',
        link: 'https://lucide.dev/',
      },
      {
        icon: 'https://svgl.app/images/logo.svg',
        title: 'svgl',
        desc: 'A beautiful library with SVG logos. Built with Sveltekit & Tailwind CSS',
        link: 'https://svgl.app/',
      },
      {
        icon: 'https://emoji.muan.co/appicon.png',
        title: 'Emoji searcher',
        desc: 'Emoji 表情大全',
        link: 'https://emoji.muan.co/',
      },
      {
        icon: 'https://gitmoji.dev/static/apple-icon-144x144.png',
        title: 'gitmoji',
        desc: '可以在 git 中使用的 emoji 表情',
        link: 'https://gitmoji.dev/',
      },
    ],
  },
  {
    title: '前端学习资料',
    items: [
      {
        icon: 'https://developer.mozilla.org/apple-touch-icon.6803c6f0.png',
        title: 'MDN | Web 开发者指南',
        desc: 'Mozilla 的开发者平台，提供了大量关于 HTML、CSS 和 JavaScript 的详细文档以及广泛的 Web API 参考资',
        link: 'https://developer.mozilla.org/zh-CN',
      },
      {
        icon: 'https://static.runoob.com/images/favicon.ico',
        title: '菜鸟教程',
        desc: '学的不仅是技术，更是梦想！',
        link: 'https://www.runoob.com',
      },
      {
        icon: '/icons/es6.svg',
        title: 'ES6 入门教程',
        desc: '阮一峰的网络日志',
        link: 'http://es6.ruanyifeng.com',
      },
      {
        icon: 'https://www.tslang.cn/assets/images/icons/apple-touch-icon-180x180.png',
        title: 'TypeScript',
        desc: 'TypeScript是JavaScript类型的超集, 它可以编译成纯JavaScript',
        link: 'https://www.tslang.cn/',
      },
    ],
  },
  {
    title: '社区',
    items: [
      {
        title: 'Github',
        icon: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
        desc: '一个面向开源及私有软件项目的托管平台',
        link: 'https://github.com',
      },
      {
        icon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a',
        title: 'Stack Overflow',
        desc: '全球最大的技术问答网站',
        link: 'https://stackoverflow.com',
      },
      {
        title: '稀土掘金',
        icon: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/apple-touch-icon.png',
        desc: '面向全球中文开发者的技术内容分享与交流平台',
        link: 'https://juejin.cn',
      },
      {
        title: 'SegmentFault 思否',
        icon: 'https://static.segmentfault.com/main_site_next/0dc4bace/touch-icon.png',
        desc: '技术问答开发者社区',
        link: 'https://bestofjs.org/',
      },
      {
        title: 'Bestofjs',
        // icon: 'https://common.cnblogs.com/favicon.ico',
        icon: 'https://bestofjs.org/favicon.ico',
        desc: 'The best of JavaScript, HTML and CSS | Best of JS',
        link: 'https://bestofjs.org/',
      },
      {
        title: 'HelloGithub',
        icon: 'https://hellogithub.com/favicon/apple-icon-180x180.png',
        desc: 'HelloGitHub 是一个发现和分享有趣、入门级开源项目的平台',
        link: 'https://hellogithub.com/',
      },
      {
        title: '知乎',
        icon: 'https://static.zhihu.com/heifetz/assets/apple-touch-icon-60.362a8eac.png',
        desc: '中文互联网高质量的问答社区和创作者聚集的原创内容平台',
        link: 'https://juejin.cn',
      },
    ],
  },
  {
    title: '工具&资源网站',
    items: [
      {
        icon: 'https://caniuse.com/img/favicon-128.png',
        title: 'Can I use',
        desc: '前端 API 兼容性查询',
        link: 'https://caniuse.com',
      },
      {
        icon: 'https://tinypng.com/images/apple-touch-icon.png',
        title: 'TinyPNG',
        desc: '在线图片压缩工具',
        link: 'https://tinypng.com',
      },
      {
        icon: 'https://devtool.tech/logo.svg',
        title: '开发者武器库',
        desc: '开发者武器库，做开发者最专业最好用的专业工具箱',
        link: 'https://devtool.tech',
      },
      {
        icon: 'https://tool.lu/favicon.ico',
        title: '在线工具',
        desc: '开发人员的工具箱',
        link: 'https://tool.lu',
      },
      {
        icon: '/icons/json-cn.ico',
        title: 'Json 中文网',
        desc: 'JSON 在线解析及格式化验证',
        link: 'https://www.json.cn',
      },
      {
        icon: 'https://board.oktangle.com/favicon.ico',
        title: '神绘',
        desc: '手绘风格的流程图',
        link: 'https://board.oktangle.com/',
      },
      {
        icon: 'https://assets.mixkit.co/build/favicons/favicon-96x96-b47a57aea9303a5f92e644e78aa343575b21f12b38d469be00fdc5acd983684d.png',
        title: 'mixkit',
        desc: '视频,音频免费资源,素材',
        link: 'https://mixkit.co/',
      },
      {
        icon: 'https://www.logosc.cn/img/logo-icons/logosc-new.svg',
        title: '标小智LOGO',
        desc: '智能LOGO设计生成器',
        link: 'https://www.logosc.cn/',
      },
    ],
  },
  {
    title: '摸鱼专用',
    items: [
      {
        icon: 'https://momoyu.cc/icon-192.png',
        title: '摸摸鱼热榜',
        // desc: '聚合每日热门、搞笑、有趣、适合摸鱼的资讯',
        link: 'https://momoyu.cc',
      },
      {
        icon: 'https://v.qq.com/favicon.ico',
        title: '腾讯视频',
        // desc: '中国领先的在线视频媒体平台，海量高清视频在线观看',
        link: 'https://v.qq.com',
      },
      {
        icon: 'https://static.hdslb.com/mobile/img/512.png',
        title: '哔哩哔哩',
        // desc: '',
        link: 'https://www.bilibili.com',
      },
      {
        icon: 'https://www.youtube.com/s/desktop/014dbbed/img/favicon_48x48.png',
        title: 'YouTube',
        // desc: '',
        link: 'https://www.youtube.com',
      },
      {
        icon: '/icons/twitter.svg',
        title: 'Twitter',
        // desc: '',
        link: 'https://twitter.com',
      },
      {
        icon: '/icons/pixiv.png',
        title: 'Pixiv',
        // desc: '',
        link: 'https://www.pixiv.net',
      },
    ],
  },
]
