# 触发事件

### 输入的触发事件

有一些特殊事件可用作方法的元素。您可以直接调用它们，如下所示：

```js
// For text box and textarea
ele.focus()
ele.blur()

// For form element
formEle.reset()
formEle.submit()

// For any element
ele.click()
```

###触发原生事件

```js
const trigger = function (ele, eventName) {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(eventName, true, false)
  ele.dispatchEvent(e)
}
// 使用
trigger(ele, 'mousedown')
```

###触发自定义事件

```js
const trigger = function (ele, eventName, detail) {
  const e = new CustomEvent(eventName, { detail })
  // 触发该事件
  ele.dispatchEvent(e)
}
// 分发事件
trigger(ele, 'my-event', { key1: 'value1', key2: 'value2' })

// 监听事件
ele.addEventListener('my-event', function (e) {
  console.log(e.detail) // { key1: 'value1', key2: 'value2' }
})
```

```js
// Check an element against a selector
const matches = function (ele, selector) {
  const p = Element.prototype
  const f =
    p.matches ||
    p.webkitMatchesSelector ||
    p.mozMatchesSelector ||
    p.msMatchesSelector ||
    function (s) {
      return [].indexOf.call(document.querySelectorAll(s), this) !== -1
    }
  return f.call(ele, selector)
}
```
