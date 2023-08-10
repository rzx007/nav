# 选择元素的子元素

获取元素的子节点：`ele`

```js
const childNodes = ele.childNodes
```

通过循环，您可以获得第一个或最后一个子元素：

```js
const first = childNodes[0]
const last = childNodes[childNodes.length - 1]
```

有一些属性可以直接访问第一个和最后一个子项：

```js
const first = ele.firstChild
const last = ele.lastChild
```
