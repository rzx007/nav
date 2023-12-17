import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/html-dom/': [
    {
      text: '简单',
      collapsed: false,
      items: [
        { text: '选择元素的子元素', link: '/html-dom/select-the-children-of-an-element' },
        { text: '滚动元素到可视范围', link: '/html-dom/scroll-to-an-element' },
        { text: '滚动到页面顶部', link: '/html-dom/scroll-to-top-of-the-page' },
        { text: '自动选中文本框内容', link: '/html-dom/slectec-text-of-textarea-automatically' },
        { text: '设置元素的 CSS 样式', link: '/html-dom/set-CSS-style-for-an-element' },
        { text: '选中元素的文本内容', link: '/html-dom/select-the-text-content-of-an-element' },
        { text: '去除文本中的HTML标签', link: '/html-dom/strip-HTML-from-a-given-text' },
        { text: '触发事件', link: '/html-dom/trigger-an-event.md' },
        {
          text: '判断元素是否在视窗内',
          link: '/html-dom/check-if-an-element-is-in-the-viewport.md'
        },
        {
          text: '检查元素是否是另一元素的后代',
          link: '/html-dom/check-if-an-element-is-a-descendant-of-another.md'
        },
        { text: '其他代码块', link: '/html-dom/others.md' },
      ]
    },
    {
      text: '中度',
      items: [
        { text: '自动调整文本框的宽度以适合其内容', link: '/html-dom/input-auto-fit.md' },
        { text: '将表导出为 csv', link: '/html-dom/export-a-table-to-csv' },
        { text: '获取元素的第一个可滚动父元素', link: '/html-dom/get-the-first-scrollable-parent-of-an-element' },
        { text: '动态加载 JavaScript 文件', link: '/html-dom/load-a-JavaScript-file-dynamically' },
        { text: '从剪贴板粘贴图像', link: '/html-dom/paste-an-image-from-the-clipboard' },
        { text: 'Canvas API 截取图片的一部分', link: '/html-dom/canvas-shotimg' },
      ]
    },
    {
      text: '困难',
      items: [
        { text: '显示或隐藏表列', link: '/html-dom/show-or-hide-table-columns' },
        { text: '复制高亮代码到剪贴板', link: '/html-dom/copy-highlighted-code-to-the-clipboard' },
        { text: '创建自定义滚动条', link: '/html-dom/create-a-custom-scrollbar' },
        { text: '基于流式数据的类似 chatgpt 的打字机式输出', link: '/html-dom/server-sent-events' },
        { text: '使用 vue 指令实现一个元素平滑上升的效果', link: '/html-dom/vue-slide-smooth' },
        { text: '创建一个简易的http-server', link: '/html-dom/create-http-server' },
      ]
    }
  ]
}
