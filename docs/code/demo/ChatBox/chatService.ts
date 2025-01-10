
export class ChatService {
  private signal: AbortSignal

  constructor(signal?: AbortSignal) {
    this.signal = signal ?? new AbortController().signal
  }

  async createChatStream(payload: ChatQuery): Promise<Response> {
    // const formData = this.objectToFormData(payload)
    const response = await fetch(
      `https://jiangshigpt4.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-03-01-preview`,
      {
        method: 'POST',
        signal: this.signal,
        headers: {
          Chattoken: '372a9640-73db-491a-8eaf-2752e3101bce',
          'api-key': '61c36ab3c518418b916a6ffc2190d170',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    )

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    return response
  }

  /**
   * 将对象转换为 FormData，对象类型直接 JSON 序列化
   * @param obj 要转换的对象
   * @returns FormData
   */
  objectToFormData = (obj: Record<string, any>): FormData => {
    const formData = new FormData()

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key]

        if (value === null || value === undefined) {
          continue
        } else if (value instanceof File || value instanceof Blob) {
          formData.append(key, value)
        } else if (typeof value === 'object') {
          // 对象类型直接 JSON 序列化
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, String(value))
        }
      }
    }

    return formData
  }
}
export interface ChatQuery {
  /**
   * @description 问题，主要用以校验铭感词逻辑
   */
  question?: string
  frequency_penalty: 0
  messages: {
    content: string | ImageMessage[] | undefined
    role: IChatRole
  }[]

  model: string
  presence_penalty: 0
  stream: boolean
  temperature: 0.6
  tools: Tool[]
  top_p: 1
  [key: string]: any
}
export interface Tool {
  function: Partial<any>
  type: string
}

export interface ImageSchema {
  placeholder: string
  url: string
  error?: string
}

export interface ImageMessage {
  text?: string
  type?: string
  image_url?: {
    detail: string
    url: string
  }
}
