#滚动元素到可视范围

滚动元素到可视范围

```js
ele.scrollIntoView()
```

平滑滚动
The option isn't supported in` IE and Safari.behavior`

```js
ele.scrollIntoView({ behavior: 'smooth' })
```

::: tip 额外知识

对不不支持的浏览器可使用 css 属性,达到平滑滚动的效果

```css
scroll-behavior: smooth;
```

:::
