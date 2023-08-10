# 获取元素的第一个可滚动父元素

从给定的元素开始，我们遍历所有父元素，直到document() 的根目录。对于每个父节点，我们检查它是否是可滚动节点。

```js
const isScrollable = function (ele) {
  const hasScrollableContent = ele.scrollHeight > ele.clientHeight

  const overflowYStyle = window.getComputedStyle(ele).overflowY
  const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1

  return hasScrollableContent && !isOverflowHidden
}

const getScrollableParent = function (ele) {
  return !ele || ele === document.body
    ? document.body
    : isScrollable(ele)
    ? ele
    : getScrollableParent(ele.parentNode)
}
```
