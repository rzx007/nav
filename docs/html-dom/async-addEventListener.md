# 以同步方式实现事件监听

```js
const getElement = (cssSelector) => {
  const dom = document.querySelector(cssSelector)
  // Proxy 代理
  const proxy = new Proxy(dom, {
    get(target, key) {
      if(!key.startsWith('wait')) {
        return Reflect.get(target, key)
      }
      return new Promise(resolve => {
        const eventName = key.replace('wait', '').toLowerCase()

        dom.addEventListener(eventName, resolve, { once: true })
      })
    }
  })
  return proxy
}
(async () => {
  const btn = getElement('#btn')
  while(1) {
    await btn.waitClick;
    console.log('click')
  }
})()

```
### 示例

<script setup>
import AsyncAddlistener from '../code/demo/AsyncAddlistener.vue'
</script>
<AsyncAddlistener />