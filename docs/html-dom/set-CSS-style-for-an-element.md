# 设置元素的 CSS 样式

### 设置 CSS 样式

通过属性设置样式：`style`

```js
ele.style.backgroundColor = 'red'
ele.style['backgroundColor'] = 'red'
ele.style['background-color'] = 'red'
```

可以通过覆盖或更新属性同时设置多个样式：`cssText`

```js
ele.style.cssText = 'background-color: red; color: white;'
```

### 获取 CSS 样式

```js
ele.style.backgroundColor
ele.style['backgroundColor']
ele.style['background-color']
```

### 获取计算后的 CSS 样式

```js
const styles = window.getComputedStyle(ele)
// 获取计算后的样式
const bgColor = styles.getPropertyValue('background-color')
```

### 获取元素的 CSS 样式

```js
ele.currentStyle
```

### 删除 CSS 样式

```js
ele.style.backgroundColor = ''
// or
ele.style.removeProperty('background-color')
// Does NOT work
ele.style.removeProperty('backgroundColor')
```
