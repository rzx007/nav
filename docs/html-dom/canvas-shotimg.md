# Canvas API 截取图片的一部分

::: info
自由截图，可结合html2canvas库使用
:::

```js
// 加载图片
let img = new Image()
img.src = 'image_url.jpg' // 需要截取的图片的URL

img.onload = function () {
  // 创建canvas
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')

  // 设定需要截取的区域（这里为图片的左上角100x100像素的区域）
  let crop_x = 0
  let crop_y = 0
  let crop_width = 100
  let crop_height = 100

  // 设置canvas的尺寸
  canvas.width = crop_width
  canvas.height = crop_height

  // 在canvas上绘制选定的区域
  context.drawImage(img, crop_x, crop_y, crop_width, crop_height, 0, 0, crop_width, crop_height)

  // 将canvas转换为图片，并下载
  let imageUrl = canvas.toDataURL('image/png')
  let link = document.createElement('a')
  link.href = imageUrl
  link.download = 'screenshot.png'
  link.click()
  link.remove()
}
```

```js
const clip = () => {
  const clipAreaWrap = useRef(null) // 截图区域dom
  const clipCanvas = useRef(null) // 用于截图的的canvas，以及截图开始生成截图效果（背景置灰）
  const drawCanvas = useRef(null) // 把图片绘制到canvas上方便 用于生成截取图片的base64数据
  const [clipImgData, setClipImgData] = useState('')

  const init = (wrap) => {
    if (!wrap) return
    clipAreaWrap.current = wrap
    clipCanvas.current = document.createElement('canvas')
    drawCanvas.current = document.createElement('canvas')
    clipCanvas.current.style =
      'width:100%;height:100%;z-index: 2;position: absolute;left: 0;top: 0;'
    drawCanvas.current.style =
      'width:100%;height:100%;z-index: 1;position: absolute;left: 0;top: 0;'

    clipAreaWrap.current.appendChild(clipCanvas.current)
    clipAreaWrap.current.appendChild(drawCanvas.current)
  }
  // 截图
  const cut = (souceImg: string) => {
    const drawCanvasCtx = drawCanvas.current.getContext('2d')
    const clipCanvasCtx = clipCanvas.current.getContext('2d')

    const wrapWidth = clipAreaWrap.current.clientWidth
    const wrapHeight = clipAreaWrap.current.clientHeight
    clipCanvas.current.width = wrapWidth
    clipCanvas.current.height = wrapHeight
    drawCanvas.current.width = wrapWidth
    drawCanvas.current.height = wrapHeight

    // 设置截图时灰色背景
    clipCanvasCtx.fillStyle = 'rgba(0,0,0,0.6)'
    clipCanvasCtx.strokeStyle = 'rgba(0,143,255,1)'

    // 生成一个截取区域的img 然后把它作为canvas的第一个参数
    const clipImg = document.createElement('img')
    clipImg.classList.add('img_anonymous')
    clipImg.crossOrigin = 'anonymous'
    clipImg.src = souceImg

    // Q: 这里为什么需要append到clipAreaWrap里
    // A: 因为直接clipImg.src的引入是没有css样式的（主要是宽高）如果不append直接进行drawCanvasCtx.drawImage，
    // 那其实画的是原始大小的clipImg
    clipAreaWrap.current.appendChild(clipImg)

    // 绘制截图区域
    clipImg.onload = () => {
      // x,y -> 计算从drawCanvasCtx的的哪一x,y坐标点进行绘制
      const x = Math.floor((wrapWidth - clipImg.width) / 2)
      const y = Math.floor((wrapHeight - clipImg.height) / 2)
      // Q: 为什么这里要用克隆节点的宽高
      // A: 因为clipImg的宽高是在dom中已经被css修改过的宽高（长/宽）了，而非该图片的真实长和宽
      // 用这个宽高在drawCanvasCtx的绘图只会绘制clipImg的小部分内容（因为假宽高比真宽高小），看起来就像是被放大了
      const clipImgCopy = clipImg.cloneNode()
      drawCanvasCtx.drawImage(
        clipImg,
        0,
        0,
        clipImgCopy.width,
        clipImgCopy.height,
        x,
        y,
        clipImg.width,
        clipImg.height
      )
    }

    let start = null

    // 获取截图开始的点
    clipCanvas.current.onmousedown = function (e) {
      start = {
        x: e.offsetX,
        y: e.offsetY
      }
    }

    // 绘制截图区域效果
    clipCanvas.current.onmousemove = function (e) {
      if (start) {
        fill(
          clipCanvasCtx,
          wrapWidth,
          wrapHeight,
          start.x,
          start.y,
          e.offsetX - start.x,
          e.offsetY - start.y
        )
      }
    }

    // 截图完毕，获取截图图片数据
    document.addEventListener('mouseup', function (e) {
      if (start) {
        var url = getClipPicUrl(
          {
            x: start.x,
            y: start.y,
            w: e.offsetX - start.x,
            h: e.offsetY - start.y
          },
          drawCanvasCtx
        )
        start = null
        //生成base64格式的图
        setClipImgData(url)
      }
    })
  }

  const cancelCut = () => {
    clipCanvas.current.width = clipAreaWrap.current.clientWidth
    clipCanvas.current.height = clipAreaWrap.current.clientHeight
    drawCanvas.current.width = clipAreaWrap.current.clientWidth
    drawCanvas.current.height = clipAreaWrap.current.clientHeight
    const drawCanvasCtx = drawCanvas.current.getContext('2d')
    const clipCanvasCtx = clipCanvas.current.getContext('2d')
    drawCanvasCtx.clearRect(0, 0, drawCanvas.current.clientWidth, drawCanvas.current.clientHeight)
    clipCanvasCtx.clearRect(0, 0, clipCanvas.current.clientWidth, clipCanvas.current.clientHeight)
    //移除鼠标事件
    clipCanvas.current.onmousedown = null
    clipCanvas.current.onmousemove = null
  }

  const getClipPicUrl = (area, drawCanvasCtx) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const data = drawCanvasCtx.getImageData(area.x, area.y, area.w, area.h)
    canvas.width = area.w
    canvas.height = area.h
    context.putImageData(data, 0, 0)
    return canvas.toDataURL('image/png', 1)
  }

  // 绘制出截图的效果
  const fill = (context, ctxWidth, ctxHeight, x, y, w, h) => {
    context.clearRect(0, 0, ctxWidth, ctxHeight)
    context.beginPath()
    //遮罩层
    context.globalCompositeOperation = 'source-over'
    context.fillRect(0, 0, ctxWidth, ctxHeight)
    //画框
    context.globalCompositeOperation = 'destination-out'
    context.fillRect(x, y, w, h)
    //描边
    context.globalCompositeOperation = 'source-over'
    context.moveTo(x, y)
    context.lineTo(x + w, y)
    context.lineTo(x + w, y + h)
    context.lineTo(x, y + h)
    context.lineTo(x, y)
    // context.stroke()
    context.closePath()
  }
  return { init, cut, cancelCut, clipImgData }
}
```
