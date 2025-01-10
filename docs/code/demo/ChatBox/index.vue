<template>
  <div class="chat-container">
    <div class="messages-container">
      <div v-for="(msg, idx) in messages" :key="idx" :class="['message', msg.role]">
        <div class="message-content">{{ msg.content }}</div>
        <div v-if="msg.toolCalls" class="tool-calls">
          Tool used: {{ msg.toolCalls[0]?.function.name }}
        </div>
      </div>
      <div v-if="currentResponse" class="message assistant">
        <div class="message-content">{{ currentResponse }}</div>
      </div>
      <div ref="messagesEndRef" />
    </div>

    <form @submit.prevent="handleSubmit" class="input-form">
      <input
        type="text"
        v-model="input"
        placeholder="Type your message..."
        :disabled="isLoading"
      />
      <button v-if="isLoading" type="button" @click="handleCancel">
        Cancel
      </button>
      <button v-else type="submit" :disabled="!input.trim()">
        Send
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { ChatService, Tool } from './chatService'
import { createOpenAIStreamProcessor } from './streamProcessor'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  toolCalls?: any[]
}

// 定义可用的工具
const availableTools: Tool[] = [
  {
    type: 'function',
    function: {
      name: 'get_weather',
      description: 'Get current weather for a location',
      parameters: {
        type: 'object',
        properties: {
          location: {
            type: 'string',
            description: 'City name',
          },
        },
        required: ['location'],
      },
    },
  },
]

const messages = ref<Message[]>([])
const input = ref('')
const isLoading = ref(false)
const currentResponse = ref('')
const messagesEndRef = ref<HTMLDivElement | null>(null)
const abortController = ref(new AbortController())
const retryCount = ref(0)
const MAX_RETRIES = 3

const chatService = new ChatService(abortController.value.signal)

// 自动滚动到底部
const scrollToBottom = () => {
  if (messagesEndRef.value) {
    messagesEndRef.value.scrollIntoView({ behavior: 'smooth' })
  }
}

// 监听消息变化，自动滚动
watch([messages, currentResponse], () => {
  nextTick(scrollToBottom)
})

// 模拟天气工具调用
const handleWeatherTool = async (args: { location: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    temperature: 22,
    condition: 'sunny',
    location: args.location,
  }
}

// 重置状态
const resetState = () => {
  currentResponse.value = ''
  isLoading.value = false
  retryCount.value = 0
  abortController.value = new AbortController()
}

// 处理流式响应
const handleStreamResponse = async (response: Response, userMessage: Message) => {
  const reader = response.body!.pipeThrough(new TextDecoderStream()).pipeThrough(
    createOpenAIStreamProcessor({
      onStart: async () => {
        messages.value.push(userMessage)
      },
      onToken: async (token) => {
        currentResponse.value += token
      },
      onToolCall: async (toolCalls) => {
        let toolCallArgs = ''
        for (const tool of toolCalls) {
          toolCallArgs += tool.function.arguments
          console.log('toolCallArgs', toolCallArgs)
          try {
            const args = JSON.parse(toolCallArgs)
            const result = await handleWeatherTool(args)

            messages.value.push({
              role: 'assistant',
              content: `Weather in ${args.location}: ${result.temperature}°C, ${result.condition}`,
              toolCalls: [tool],
            })
          } catch (error) {
            console.error('Tool call error:', error)
          }
        }
      },
      onFinish: async (fullText) => {
        if (fullText.trim()) {
          messages.value.push({
            role: 'assistant',
            content: fullText,
          })
        }
        resetState()
      },
      onError: async (error) => {
        console.error('Stream error:', error)
        if (retryCount.value < MAX_RETRIES) {
          retryCount.value++
          await handleSubmit(userMessage.content, true)
        } else {
          messages.value.push({
            role: 'assistant',
            content: 'Sorry, I encountered an error. Please try again.',
          })
          resetState()
        }
      },
    }),
  )

  try {
    const reader2 = reader.getReader()
    while (true) {
      const { done } = await reader2.read()
      if (done) break
    }
  } catch (error) {
    console.error('Stream reading error:', error)
    if (retryCount.value < MAX_RETRIES) {
      retryCount.value++
      await handleSubmit(userMessage.content, true)
    } else {
      messages.value.push({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      })
      resetState()
    }
  }
}

// 处理提交
const handleSubmit = async (retryMessage?: string, isRetry = false) => {
  const messageContent = retryMessage || input.value.trim()
  if (!messageContent || isLoading.value) return

  if (!isRetry) {
    resetState()
  }

  const userMessage: Message = { role: 'user', content: messageContent }
  isLoading.value = true

  try {
    const response = await chatService.createChatStream({
      frequency_penalty: 0,
      messages: [userMessage],
      model: 'gpt-40',
      presence_penalty: 0,
      stream: true,
      temperature: 0.6,
      tools: availableTools,
      top_p: 1,
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    await handleStreamResponse(response, userMessage)
  } catch (error) {
    console.error('Chat error:', error)
    if (retryCount.value < MAX_RETRIES) {
      retryCount.value++
      await handleSubmit(messageContent, true)
    } else {
      messages.value.push({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      })
      resetState()
    }
  } finally {
    if (!isRetry) {
      input.value = ''
    }
  }
}

// 取消请求
const handleCancel = () => {
  abortController.value.abort()
  resetState()
}
</script>

<style lang="scss">
.chat-container {
  display: flex;
  flex-direction: column;
  height: 500px;
  padding: 1rem;

  .messages-container {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 1rem;
  }

  .message {
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 4px;

    &.user {
      background-color: #e3f2fd;
      margin-left: 2rem;
    }

    &.assistant {
      background-color: #f5f5f5;
      margin-right: 2rem;
    }

    &-content {
      white-space: pre-wrap;
    }

    .tool-calls {
      font-size: 0.8rem;
      color: #666;
      margin-top: 0.5rem;
    }
  }

  .input-form {
    display: flex;
    gap: 0.5rem;

    input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background-color: #1976d2;
      color: white;
      cursor: pointer;

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }

      &[type="button"] {
        background-color: #f44336;
      }
    }
  }
}
</style>
