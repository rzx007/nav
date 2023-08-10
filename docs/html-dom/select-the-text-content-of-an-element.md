# 选中元素的文本内容

::: info
鼠标选中文字效果
:::

```js
const selectText = function (ele) {
  const range = document.createRange()
  range.selectNodeContents(ele)
  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
}
```
