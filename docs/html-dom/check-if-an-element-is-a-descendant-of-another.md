# 检查元素是否是另一个元素的后代

### 使用 `contains` 方法

```js
const descendant = (parent, child) => parent !== child && parent.contains(child)
```

### 子元素开始循环，直到找到父元素

```js
// Check if `child` is a descendant of `parent`
const isDescendant = function (parent, child) {
  let node = child.parentNode
  while (node) {
    if (node === parent) {
      return true
    }

    // Traverse up to the parent
    node = node.parentNode
  }

  // Go up until the root but couldn't find the `parent`
  return false
}
```
