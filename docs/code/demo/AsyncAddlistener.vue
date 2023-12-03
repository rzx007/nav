<template>
  <button id="btn">按钮</button>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const getElement = (cssSelector) => {
  const dom = document.querySelector(cssSelector)
  // Proxy 代理
  const proxy = new Proxy(dom, {
    get(target, key: string) {
      if (!key.startsWith('wait')) {
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
onMounted(() => {
  (async () => {
    const btn = getElement('#btn')
    while (1) {
      await btn.waitClick;
      console.log('click')
    }
  })()
})
</script>
<style></style>
