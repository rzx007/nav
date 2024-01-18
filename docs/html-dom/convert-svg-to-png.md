# svg 转 png

主要思路:

- 将 svg 转为`Blob`，
- 然后使用`URL.createObjectURL`创建一个临时的 URL，
- 然后使用`<img>`标签加载这个 URL，
- 最后使用`<canvas>`标签将图片绘制到画布上，
- 最后使用`canvas.toDataURL`将画布上的内容转为 base64 格式的图片。

<<< @/code/demo/SvgToPNG.ts{ts}
<!-- 添加一张图片 -->
<img src="/huggingface_logo-noborder.svg" alt="svg 转 png" height="200px" />
