# 实现一个基本可用的前端错误监控

::: tip
前端的JS错误监控本质并不复杂，浏览器已经提供了全局的捕获异常方案
```js
// 同步异常
window.addEventListener('error',(error)=>{// 分析错误->上报
})

// 异步异常
window.addEventListener('unhandledrejection',(rejection)=>{
// 分析错误->上报
})
```
:::
## 实现
```js

interface ErrorHandlerOptions {
  logErrors: boolean
  showErrorModal: boolean
  sendToServer: boolean
  serverEndpoint: string
  ignoredErrors: string[]
  maxStackTraceLines: number
  errorBatchInterval: number // 新增选项
}

interface ErrorInfo {
  message: string
  filename?: string
  lineno?: number
  colno?: number
  stack?: string
  timestamp: number
  context?: string
  functionName?: string
}

export default class ErrorHandler {
  private options: ErrorHandlerOptions
  private errorQueue: ErrorInfo[] = []
  private sendTimer: NodeJS.Timeout | null = null

  constructor(options: Partial<ErrorHandlerOptions> = {}) {
    this.options = {
      logErrors: true,
      showErrorModal: true,
      sendToServer: false,
      serverEndpoint: '',
      ignoredErrors: [],
      maxStackTraceLines: 10,
      errorBatchInterval: 500, // 新增默认值
      ...options,
    }
    this.init()
  }

  private init(): void {
    window.addEventListener('error', this.handleError.bind(this))
    window.addEventListener('unhandledrejection', this.handleRejection.bind(this))
  }

  private handleError(event: ErrorEvent): void {
    const { message, filename, lineno, colno, error } = event
    this.processError({
      message,
      filename,
      lineno,
      colno,
      stack: error?.stack,
      timestamp: Date.now(),
    })
  }

  private handleRejection(event: PromiseRejectionEvent): void {
    const { reason } = event
    this.processError({
      message: reason.message || '未处理的Promise拒绝',
      stack: reason.stack,
      timestamp: Date.now(),
    })
  }

  public reportError(error: Error | string, additionalInfo?: object): void {
    const errorInfo: ErrorInfo = {
      message: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: Date.now(),
      ...additionalInfo,
    }
    this.processError(errorInfo)
  }

  private processError(errorInfo: ErrorInfo): void {
    if (this.shouldIgnoreError(errorInfo.message)) {
      return
    }

    if (this.options.logErrors) {
      this.logError(errorInfo)
    }

    if (this.options.showErrorModal) {
      this.showErrorModal(errorInfo)
    }

    if (this.options.sendToServer) {
      this.queueErrorForSending(errorInfo)
    }
  }

  private shouldIgnoreError(message: string): boolean {
    return this.options.ignoredErrors.some((ignored) => message.includes(ignored))
  }

  private logError(errorInfo: ErrorInfo): void {
    console.error('捕获到错误:', errorInfo)
  }

  private showErrorModal(errorInfo: ErrorInfo): void {
    const modal = document.createElement('div')
    modal.innerHTML = `
      <div class="error-modal">
        <h3>发生错误</h3>
        <p><strong>消息:</strong> ${this.escapeHtml(errorInfo.message)}</p>
        ${errorInfo.filename ? `<p><strong>文件:</strong> ${this.escapeHtml(errorInfo.filename)}</p>` : ''}
        ${errorInfo.lineno ? `<p><strong>行号:</strong> ${errorInfo.lineno}</p>` : ''}
        ${errorInfo.colno ? `<p><strong>列号:</strong> ${errorInfo.colno}</p>` : ''}
        ${errorInfo.context ? `<p><strong>上下文:</strong> ${this.escapeHtml(errorInfo.context)}</p>` : ''}
        ${errorInfo.functionName ? `<p><strong>函数:</strong> ${this.escapeHtml(errorInfo.functionName)}</p>` : ''}
        ${errorInfo.stack ? `<pre>${this.formatStack(errorInfo.stack)}</pre>` : ''}
      </div>
    `
    modal.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: white;
      border: 1px solid red;
      padding: 10px;
      max-width: 80%;
      max-height: 80%;
      overflow: auto;
      z-index: 9999;
      font-family: Arial, sans-serif;
    `
    document.body.appendChild(modal)

    // 5秒后自动关闭弹窗
    setTimeout(() => {
      document.body.removeChild(modal)
    }, 5000)
  }

  // 批量上报
  private queueErrorForSending(errorInfo: ErrorInfo): void {
    this.errorQueue.push(errorInfo)

    if (!this.sendTimer) {
      this.sendTimer = setTimeout(() => {
        this.sendQueuedErrorsToServer()
      }, this.options.errorBatchInterval)
    }
  }

  private sendQueuedErrorsToServer(): void {
    if (!this.options.serverEndpoint) {
      console.warn('未设置服务器端点，无法发送错误信息')
      return
    }

    if (this.errorQueue.length === 0) {
      return
    }

    fetch(this.options.serverEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.errorQueue),
    }).catch((error) => {
      console.error('发送错误信息到服务器失败:', error)
    })

    this.errorQueue = []
    this.sendTimer = null
  }

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  private formatStack(stack: string): string {
    return stack
      .split('\n')
      .slice(0, this.options.maxStackTraceLines)
      .map(this.escapeHtml)
      .join('\n')
  }
}

// 创建一个全局实例
window.$globalErrorHandler = new ErrorHandler({
  logErrors: true,
  showErrorModal: false,
  sendToServer: true,
  serverEndpoint: '/llm/skillCenter/plugin/dealwebLog',
  ignoredErrors: ['Script error.', 'ResizeObserver loop limit exceeded'],
  maxStackTraceLines: 5,
  errorBatchInterval: 500, // 设置批处理间隔为500ms
})

```

## 下一步可以对错误信息进行分类处理

```
未实现
```
