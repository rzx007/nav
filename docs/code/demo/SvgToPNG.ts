function svgToPng(svg: string, callback?: (imgData: string) => void) {
  const url = getSvgUrl(svg)
  svgUrlToPng(url, (imgData: string) => {
    callback && callback(imgData)
    URL.revokeObjectURL(url)
  })
}

function getSvgUrl(svg: BlobPart) {
  return URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
}

function svgUrlToPng(svgUrl: string, callback: (imgData: string) => void) {
  const svgImage = document.createElement('img')
  document.body.appendChild(svgImage)
  svgImage.onload = function () {
    const canvas = document.createElement('canvas')
    canvas.width = svgImage.clientWidth
    canvas.height = svgImage.clientHeight
    const canvasCtx = canvas.getContext('2d')
    canvasCtx!.drawImage(svgImage, 0, 0)
    const imgData = canvas.toDataURL('image/png')
    callback(imgData)
  }
  svgImage.src = svgUrl
}
