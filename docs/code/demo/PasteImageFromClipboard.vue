<template>
  <div class="container">
    <P><kbd class="key">Ctrl + V</kbd> 从剪贴板粘贴图像</P>
    <img class="preview" id="preview">
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(() => {
  const preview = document.getElementById('preview') as HTMLImageElement
  document.addEventListener('paste', (event) => {
    const items = event.clipboardData?.items
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile() as File
          const URLObj = window.URL || window.webkitURL
          preview.src = URLObj.createObjectURL(blob)
        }
      }
    }
  })
})
</script>
<style lang="scss" scoped>

.container {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 32rem;
  padding: 1rem 0;
  flex-direction: column;
  background-color: #f7fafc;
  border: 1px solid #cbd5e0;
  .key {
    background-color: #f7fafc;
    border: 1px solid #cbd5e0;
    border-radius: 0.25rem;
    padding: 0.25rem;
  }

  .preview {
    align-items: center;
    border: 1px solid #cbd5e0;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    max-height: 16rem;
    max-width: 42rem;
  }
}
.dark {
  .container {
    background-color: #2d3748;
    border-color: #4a5568;
    .key {
      background-color: #2d3748;
      border-color: #4a5568;
    }
  }
}
</style>
