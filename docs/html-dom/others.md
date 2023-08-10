# 其他 DOM 代码块

### 代码是否在浏览器运行

```js
const isBrowser = typeof window === 'object' && typeof document === 'object'
```

### 是否支持触摸事件

```js
const touchSupported = () => {
  'ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch)
}
```

### 元素是否有 class

```js
const hasClass = (el, className) => el.classList.contains(className)
```

### 元素是否有某个属性

```js
const hasAttr = (el, attr) => el.hasAttribute(attr)
```

### 克隆元素

```js
const clone = (el) => el.cloneNode(true)
```

### 检测点击的是否是元素`ele`外部

```js
const outside = (ele, evt) => !ele.contains(evt.target) && ele !== evt.target
document.addEventListener('click', function (evt) {
  const isClickedOutside = outside(ele, evt)
})
```

### 检测元素是否聚焦

```js
const isFocused = (ele) => ele === document.activeElement
```

### 检测是否是暗黑模式

```js
const isDarkMode = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
```

### 区分鼠标左键和右键点击

```js
const isRightClick = (e) => {
  e = e || window.event
  return 'which' in e ? e.which === 3 : e.button === 2
}
ele.addEventListener('mousedown', function (e) {
  const key = isRightClick(e) ? 'right' : 'left'
  // e.button === 0: the left button is clicked
  // e.button === 1: the middle button is clicked
  // e.button === 2: the right button is clicked
  // e.button === 3: the `Browser Back` button is clicked
  // e.button === 4: the `Browser Forward` button is clicked
})
```

### 获取最近的父元素

```js
const result = ele.closest(selector)
// or
const matches = function (ele, selector) {
  return (
    ele.matches ||
    ele.matchesSelector ||
    ele.msMatchesSelector ||
    ele.mozMatchesSelector ||
    ele.webkitMatchesSelector ||
    ele.oMatchesSelector
  ).call(ele, selector)
}

// Find the closest element to `ele` and matches the `selector`
const closest = function (ele, selector) {
  let e = ele
  while (e) {
    if (matches(e, selector)) {
      break
    }
    e = e.parentNode
  }
  return e
}
```

### 移除所有的子元素

```js
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}
// or
const removeAllChildNodes1 = (parent) => {
  parent.innerHTML = ''
}
```

### 检查元素在可滚动容器中是否可见

```js
const isVisible = function (ele, container) {
  const eleTop = ele.offsetTop
  const eleBottom = eleTop + ele.clientHeight

  const containerTop = container.scrollTop
  const containerBottom = containerTop + container.clientHeight

  // The element is fully visible in the container
  return (
    (eleTop >= containerTop && eleBottom <= containerBottom) ||
    // Some part of the element is visible in the container
    (eleTop < containerTop && containerTop < eleBottom) ||
    (eleTop < containerBottom && containerBottom < eleBottom)
  )
}
```
