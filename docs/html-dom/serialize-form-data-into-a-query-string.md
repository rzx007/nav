# 将表单数据序列化为查询字符串

::: info
有时，您可能需要将表单数据序列化为查询字符串。例如，当您需要通过 Ajax 发送表单数据时，这将非常有用。
:::
实现方式

```js
const serialize = function (formEle) {
  // 将表单元素的集合转换为数组
  const elements = formEle.querySelectorAll('input')
  const fields = Array.from(elements)

  return fields
    .map(function (ele) {
      const name = ele.name
      const type = ele.type

      // We ignore
      // - field that doesn't have a name
      // - disabled field
      // - `file` input
      // - unselected checkbox/radio
      if (
        !name ||
        ele.disabled ||
        type === 'file' ||
        (/(checkbox|radio)/.test(type) && !ele.checked)
      ) {
        return ''
      }

      // Multiple select
      if (type === 'select-multiple') {
        return ele.options
          .map(function (opt) {
            return opt.selected
              ? `${encodeURIComponent(name)}=${encodeURIComponent(opt.value)}`
              : ''
          })
          .filter(function (item) {
            return item
          })
          .join('&')
      }

      return `${encodeURIComponent(name)}=${encodeURIComponent(ele.value)}`
    })
    .filter(function (item) {
      return item
    })
    .join('&')
}
```
