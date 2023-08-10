# 自动选中输入文本框的内容

假定 表示文本区域元素: `ele`

```js
ele.addEventListener('focus', function (e) {
  // Select the text
  e.target.select()
})
```
