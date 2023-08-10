# 自动调整文本框的宽度以适合其内容

假设创建如下 input 元素：

```html
<input type="text" id="textbox" value="Hello World" />
```

为了根据其内容动态调整其宽度，我们创建一个 fake 元素，其内容与输入值相同。我们将输入的宽度设置为假元素的宽度。

```js
// Create a div element
const fakeEle = document.createElement('div')

// Hide it completely
fakeEle.style.position = 'absolute'
fakeEle.style.top = '0'
fakeEle.style.left = '-9999px'
fakeEle.style.overflow = 'hidden'
fakeEle.style.visibility = 'hidden'
fakeEle.style.whiteSpace = 'nowrap'
fakeEle.style.height = '0'

// We copy some styles from the textbox that effect the width
const textboxEle = document.getElementById('textbox')

// Get the styles
const styles = window.getComputedStyle(textboxEle)

// Copy font styles from the textbox
fakeEle.style.fontFamily = styles.fontFamily
fakeEle.style.fontSize = styles.fontSize
fakeEle.style.fontStyle = styles.fontStyle
fakeEle.style.fontWeight = styles.fontWeight
fakeEle.style.letterSpacing = styles.letterSpacing
fakeEle.style.textTransform = styles.textTransform

fakeEle.style.borderLeftWidth = styles.borderLeftWidth
fakeEle.style.borderRightWidth = styles.borderRightWidth
fakeEle.style.paddingLeft = styles.paddingLeft
fakeEle.style.paddingRight = styles.paddingRight

// Append the fake element to `body`
document.body.appendChild(fakeEle)
```

下面的函数为 fake 元素设置 HTML，计算其宽度并将结果设置为原始输入。

```js
const setWidth = function () {
  const string = textboxEle.value || textboxEle.getAttribute('placeholder') || ''
  fakeEle.innerHTML = string.replace(/\s/g, '&' + 'nbsp;')

  const fakeEleStyles = window.getComputedStyle(fakeEle)
  textboxEle.style.width = fakeEleStyles.width
}
```

最后，当用户通过侦听事件更改输入值时，我们调用该函数：`setWidthinput`

```js
setWidth()
textboxEle.addEventListener('input', function (e) {
  setWidth()
})
```
