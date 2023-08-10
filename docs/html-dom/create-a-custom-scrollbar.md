# 创建自定义滚动条

### 使用 CSS 创建自定义滚动条

您可以通过更改某些 CSS 属性来自定义浏览器滚动条的外观。例如，我们可以在最新版本的 Chrome，Edge 和 Safari 上使用样式：`:-webkit-scrollbar`

```css
body::-webkit-scrollbar {
  width: 0.75rem;
}
*::-webkit-scrollbar-track {
  background-color: #edf2f7;
}
*::-webkit-scrollbar-thumb {
  background-color: #718096;
  border-radius: 9999px;
}
```

在 Firefox 上，我们可以使用新的和样式：`scrollbar-widthscrollbar-color`

```css
body {
  scrollbar-width: thin;
  /* The color of thumb and track areas */
  scrollbar-color: #718096 #edf2f7;
}
```

### 使用 JavaScript 创建自定义滚动条

滚动条由两部分组成：

- 一个跟踪元素，让用户知道存在滚动条。它需要滚动条的全尺寸
- 鼠标可以拖动的滑块

```js
<div id="wrapper" class="wrapper">
  <div id="content" class="content">
    <div id="scrollbar">
      <div id="track" class="track"></div>
      <div id="thumb" class="thumb"></div>
    </div>
  </div>
</div>
```

这些部分绝对位于滚动条上，因此它们具有以下样式：

```css
.wrapper {
  max-height: 32rem;
  overflow: hidden;
  margin-right: -1rem;
  padding-right: 1rem;
}
.content {
  height: 100%;
  overflow: auto;
}
.track {
  left: 0;
  position: absolute;
  top: 0;

  /* Take full size */
  height: 100%;
  width: 100%;
}
.thumb {
  left: 0;
  position: absolute;

  /* Take full width */
  width: 100%;
}
```

滑块高度根据内容元素的正常高度和滚动高度之间的比率计算的：

```js
// Query element
const track = document.getElementById('track')
const thumb = document.getElementById('thumb')

const scrollRatio = content.clientHeight / content.scrollHeight
thumb.style.height = `${scrollRatio * 100}%`
```

### 拖动滑块滚动

我们需要监听滑块上的鼠标事件，以便在拖动时滚动内容元素：

```js
let pos = { top: 0, y: 0 }

const mouseDownThumbHandler = function (e) {
  pos = {
    // The current scroll
    top: content.scrollTop,
    // Get the current mouse position
    y: e.clientY
  }

  document.addEventListener('mousemove', mouseMoveHandler)
  document.addEventListener('mouseup', mouseUpHandler)
}

const mouseMoveHandler = function (e) {
  // How far the mouse has been moved
  const dy = e.clientY - pos.y

  // Scroll the content
  content.scrollTop = pos.top + dy / scrollRatio
}

// Attach the `mousedown` event handler
thumb.addEventListener('mousedown', mouseDownThumbHandler)

const scrollContentHandler = function () {
  window.requestAnimationFrame(function () {
    thumb.style.top = `${(content.scrollTop * 100) / content.scrollHeight}%`
  })
}

content.addEventListener('scroll', scrollContentHandler)

const trackClickHandler = function (e) {
  const bound = track.getBoundingClientRect()
  const percentage = (e.clientY - bound.top) / bound.height
  content.scrollTop = percentage * (content.scrollHeight - content.clientHeight)
}

track.addEventListener('click', trackClickHandler)
```
### 示例

<script setup>
import CreateCcustomScrollbar from '../code/demo/CreateCcustomScrollbar.vue'
</script>
<CreateCcustomScrollbar />