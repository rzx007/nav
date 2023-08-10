# 去除文本中的 HTML 标签

### 创建一个标签(不推荐)

::: info
这种方式不推荐，安全问题，如果文本中包含恶意代码，会被执行
:::

```js
const stripHtml = function (html) {
  // Create new element
  const ele = document.createElement('div')

  // Set its HTML
  ele.innerHTML = html

  // Return the text only
  return ele.textContent || ''
}
```

```JS
const stripHtml = function (html) {
    const ele = document.createElement('textarea');
    ele.innerHTML = html;
    return ele.textContent || '';
};
```

### 使用 [DONParser](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser)

```js
const stripHtml = function (html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}
```

### 使用 Template

`<template`>标记包含不会立即呈现的 `HTML` 内容。但是，在较旧的浏览器（如 IE 11）上不支持此功能

```js
const stripHtml = function (html) {
  const template = document.createElement('template')
  template.innerHTML = html
  return template.content.textContent || ''
}
```
