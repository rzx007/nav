# 基于流式数据的类似 chatgpt 的打字机式输出

> 实现：前端实现打字机式输出，请求结束识别，可中断数据传输。后端返回的数据需为流数据，响应头 `Content-Type` 为 `text/event-stream`。 以下方案均可在最新版 `Chrome` 上使用。

### 方案一 fetch

> 借助 [ReadableStream API](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream)

```js
const postData = {foo: 'bar'}
const url = 'http://test.com'
let controller = new AbortController()

const loadData = async () => {
  try {
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(postData),
      signal: controller.signal
    })

    const reader = (response as any).body.getReader()
    let data = ''
    while (true) {
      const {done, value} = await reader.read()
      if (done) {
        // 请求完成
        setLoading(false)
        break
      }
      data += new TextDecoder().decode(value)
      // 添加数据
      setData(data)
    }
  } catch {
    message.error('请求失败')
  }
}

loadData()

// 中断接收
// controller.abort()

```

每次只返回并读取一点数据。

### 方案二 使用 XHR

```js
const postData = { foo: 'bar' }
const url = 'http://test.com'

var xhr = new XMLHttpRequest()
xhr.open('POST', url, true)
xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
xhr.onprogress = function () {
  setData(xhr.responseText)
}
xhr.onloadend = function () {
  setLoading(false)
}
xhr.onerror = function () {
  message.error('请求失败')
}
xhr.send(JSON.stringify(postData))

// 中断接收
// xhr.abort()
```

`xhr.responseText` 每次都返回当前全部信息，包括前面已返回的, 直接替换之前的数据,达到打字机效果。

### 方案三 axios——基于方案 2

```js
const postData = { foo: 'bar' }
const url = '<http://test.com>'
let controller = new AbortController()

axios({
  method: 'post',
  url,
  data: postData,
  responseType: 'stream',
  onDownloadProgress: function (progressEvent: AxiosProgressEvent) {
    // 数据处理(根据业务实际格式)
    const content = progressEvent.event.currentTarget.responseText
      .replace(/^data:\n\n\n\n/, '')
      ?.split('data:')
      ?.map((item: string) => item.replace(/\n\n$/, ''))
      ?.join('')

    setData(content)
  },
  signal: controller.signal
})
  .then(() => {
    setLoading(false)
  })
  .catch(() => {
    message.error('请求失败')
  })

// 中断接收
// controller.abort()
```

::: tip 资料参考
[使用服务器发送事件流](https://www.oschina.net/translate/stream-updates-with-server-sent-events?print)
:::
