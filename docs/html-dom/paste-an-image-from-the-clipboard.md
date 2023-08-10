# 从剪贴板粘贴图像

监听`paste`事件, 从剪贴板获取图像数据, 转换为 blob 类型.

```js
// Handle the `paste` event
document.addEventListener('paste', function (evt) {
  // Get the data of clipboard
  const clipboardItems = evt.clipboardData.items
  const items = [].slice.call(clipboardItems).filter(function (item) {
    // Filter the image items only
    return item.type.indexOf('image') !== -1
  })
  if (items.length === 0) {
    return
  }

  const item = items[0]
  // Get the blob of image
  const blob = item.getAsFile()
})
```

通过`URL.createObjectURL`, 我们可以创建一个指向 blob 的 URL, 然后将其赋值给`img`元素的`src`属性, 从而显示图像.

```js
// Assume that we have an `img` element
// <img id="preview" />

const imageEle = document.getElementById('preview')
imageEle.src = URL.createObjectURL(blob)
```

### 示例

<script setup>
import PasteImageFromClipboard from '../code/demo/PasteImageFromClipboard.vue'
</script>
<PasteImageFromClipboard />
