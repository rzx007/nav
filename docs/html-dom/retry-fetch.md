# 可以重试的请求

:::tip  
一行代码搞定
:::

```ts
/**
 * @description 可重试的请求
 * @param {string} url 请求地址
 * @param {number} retry 重试次数
 */
export async function retryRequest(url: string, retry = 3): Promise<Response> {
  try {
    return await fetch(url)
  } catch (err) {
    return retry <= 0 ? Promise.reject(err) : retryRequest(url, retry - 1)
  }
}
```
