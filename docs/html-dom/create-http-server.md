# 创建一个简单的 HTTP 服务器

::: info
在本教程中，我们将创建一个简单的 HTTP 服务器，并使用 Node.js 的`http`模块来处理请求。
:::

### 步骤 1：安装 Node.js

首先，我们需要安装 Node.js。你可以从[nodejs.org](https://nodejs.org/en/)下载并安装 Node.js。

### 步骤 2：创建一个简单的 HTTP 服务器

创建一个名为`http-server.js`的文件，并在其中输入以下代码：

```javascript
import fs from 'fs'
import http from 'http'
import path from 'path'
import url from 'url'

// Local port for http server to listen on
const PORT = 9000


// Maps file extention to MIME types
// Full list can be found here: https://www.freeformatter.com/mime-types-list.html
const mimeType = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css'
}

http
  .createServer((req, res) => {
    console.log(`  ${req.method} ${req.url}`)

    // Parse URL
    const parsedUrl = url.parse(req.url)

    // Extract URL path
    // Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
    let sanitizedPath = path
      .normalize(parsedUrl.pathname)
      .replace(/^(\.\.[\/\\])+/, '')
      .substring(1)

    if (sanitizedPath === '') {
      sanitizedPath = 'index.html'
    }

    // based on the URL path, extract the file extention. e.g. .js, .doc, ...
    const ext = path.parse(sanitizedPath).ext

    try {
      const data = fs.readFileSync(sanitizedPath)

      // If the file is found, set Content-Type and send data
      if (mimeType[ext]) {
        res.setHeader('Content-Type', mimeType[ext])
      }
      res.end(data)
    } catch (err) {
      // If the file is not found, return 404
      res.statusCode = 404
      res.end()
    }
  })
  .listen(parseInt(PORT))

console.log(
  `Server listening. Pages:\n - http://localhost:${PORT}\n - http://localhost:${PORT}/chat.html`
)
```
### 步骤 3：运行服务器

在命令行中，运行以下命令：

```bash
node http-server.js
```

这将启动一个简单的 HTTP 服务器，并在端口 9000 上监听请求。你可以通过在浏览器中输入以下 URL 来访问服务器上的页面：

- http://localhost:9000
- http://localhost:9000/chat.html
