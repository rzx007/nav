// OpenAI 流式响应的数据块接口定义
export interface OpenAIStreamChunk {
  id: string
  object: string
  created: number
  model: string
  choices: {
    index: number
    delta: {
      content?: string
      tool_calls?: {
        index: number
        id?: string
        type: 'function'
        function: {
          name: string
          arguments: string
        }
      }[]
    }
    finish_reason: string | null
  }[]
}

export interface StreamCallbacks {
  onStart?: () => Promise<void> | void
  onToken?: (token: string) => Promise<void> | void
  onToolCall?: (toolCall: any) => Promise<void> | void
  onFinish?: (fullText: string) => Promise<void> | void
  onError?: (error: any) => Promise<void> | void
}

// 创建 OpenAI 流处理器
export function createOpenAIStreamProcessor(callbacks?: StreamCallbacks) {
  let fullText = ''
  let currentToolCalls: any[] = []
  let buffer = '' // 添加缓冲区

  return new TransformStream({
    async start() {
      await callbacks?.onStart?.()
    },

    async transform(chunk: string, controller) {
      try {
        buffer += chunk // 将新的数据块添加到缓冲区
        const lines = buffer.split('\n')

        // 保留最后一行（可能不完整）
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.trim().startsWith('data: ')) continue

          const jsonStr = line.replace('data: ', '').trim()

          if (jsonStr === '[DONE]') {
            await callbacks?.onFinish?.(fullText)
            return
          }

          try {
            const json: OpenAIStreamChunk = JSON.parse(jsonStr)
            const { choices } = json

            if (!choices || choices.length === 0) continue

            const { delta } = choices[0]

            if (delta.content) {
              fullText += delta.content
              await callbacks?.onToken?.(delta.content)
            } else if (delta.tool_calls) {
              currentToolCalls = [...currentToolCalls, ...delta.tool_calls]
              await callbacks?.onToolCall?.(currentToolCalls)
            }
          } catch (parseError) {
            console.warn('JSON parse error:', parseError)
            continue // 跳过解析失败的数据
          }
        }

        controller.enqueue(chunk)
      } catch (error) {
        await callbacks?.onError?.(error)
      }
    },
  })
}
