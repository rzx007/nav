# 可重试的请求

::: tip
请求失败时，自动重试，重试次数由 `MAX_RETRIES` 参数决定。
:::

```ts
/**
 * @description 请求错误重试
 * @param {string} URL 请求地址
 * @param {number} MAX_RETRIES 最大重试次数
 * @returns {Promise}
 */
export async function fetchRequest(URL: string, MAX_RETRIES: number = 3): Promise<void | Response> {
  try {
    return await fetch(URL)
  } catch (err) {
    MAX_RETRIES <= 0 ? Promise.reject(err) : fetchRequest(URL, MAX_RETRIES - 1)
  }
}
```
