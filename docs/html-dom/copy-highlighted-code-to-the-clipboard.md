# 复制高亮代码到剪贴板

允许用户复制示例代码是当今 Web 开发中的常见现象。为了演示实现，我们创建了两个元素：

```html
<pre id="sampleCode"><code>...</code></pre>
<button id="copyButton">Copy</button>
```

将示例代码复制到剪贴板可能包括三个步骤：

- 选择代码元素的文本内容
- 使用函数将其复制到剪贴板 document.execCommand('copy')

示例代码:

```js
// Query the elements
const copyButton = document.getElementById('copyButton')
const codeEle = document.getElementById('sampleCode')

copyButton.addEventListener('click', function () {
  const selection = window.getSelection()

  // Save the current selection
  const currentRange = selection.rangeCount === 0 ? null : selection.getRangeAt(0)

  // Select the text content of code element
  const range = document.createRange()
  range.selectNodeContents(codeEle)
  selection.removeAllRanges()
  selection.addRange(range)

  // Copy to the clipboard
  try {
    document.execCommand('copy')
    copyButton.innerHTML = 'Copied'
  } catch (err) {
    // Unable to copy
    copyButton.innerHTML = 'Copy'
  } finally {
    // Restore the previous selection
    selection.removeAllRanges()
    currentRange && selection.addRange(currentRange)
  }
})
```
