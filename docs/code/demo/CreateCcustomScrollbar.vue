<template>
  <div id="wrapper" class="contaniaer">
    <div id="content" class="content">
      You can customize the look and feel of the browser's scrollbar by changing some CSS properties.
      For example, we can use the styles on the latest version of Chrome, E
      dge and Safari::-webkit-scrollbarYou can customize the look and feel of the browser's scrollbar
      by changing some CSS properties. For example, we can use the styles on the latest version of Chrome,
      Edge and Safari::-webkit-scrollbarYou can customize the look and feel of the browser's scrollbar by
      changing some CSS properties. For example, we can use the styles on the latest version of Chrome,
      Edge and Safari::-webkit-scrollbarYou can customize the look and feel of the browser's scrollbar
      by changing some CSS properties. For example, we can use the styles on the latest version of Chrome,
      Edge and Safari::-webkit-scrollbar
      <div id="scrollbar">
        <div id="track" class="track"></div>
        <div id="thumb" class="thumb"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  const wrapper = document.getElementById('wrapper')
  const content = document.getElementById('content') as HTMLDivElement
  const track = document.getElementById('track') as HTMLDivElement
  const thumb = document.getElementById('thumb') as HTMLDivElement

  const scrollRatio = content.clientHeight / content.scrollHeight
  thumb.style.height = `${scrollRatio * 100}%`

  let pos = { top: 0, y: 0 }

  const mouseDownThumbHandler = function (e) {
    pos = {
      // The current scroll
      top: content.scrollTop,
      // Get the current mouse position
      y: e.clientY
    }

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
    })
  }

  const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dy = e.clientY - pos.y

    // Scroll the content
    content.scrollTop = pos.top + dy / scrollRatio
  }

  // Attach the `mousedown` event handler
  thumb.addEventListener('mousedown', mouseDownThumbHandler)

  const scrollContentHandler = function () {
    window.requestAnimationFrame(function () {
      thumb.style.top = `${(content.scrollTop * 100) / content.scrollHeight}%`
    })
  }

  content.addEventListener('scroll', scrollContentHandler)

  const trackClickHandler = function (e) {
    const bound = track.getBoundingClientRect()
    const percentage = (e.clientY - bound.top) / bound.height
    content.scrollTop = percentage * (content.scrollHeight - content.clientHeight)
  }

  track.addEventListener('click', trackClickHandler)
})
</script>
<style lang="scss" scoped>
.contaniaer {
  height: 120px;
  overflow: hidden;
  position: relative;
}

.content {
  height: 100%;
  overflow: auto;
  margin-right: -1rem;
  padding-right: 1rem;
}

#scrollbar {
  position: absolute;
  top: 0;
  right: 1rem;
  width: .75rem;
  height: 100%;
}

.track {
  left: 0;
  position: absolute;
  top: 0;
  // background-color: antiquewhite;
  /* Take full size */
  height: 100%;
  width: 100%;
}

.thumb {
  left: 0;
  position: absolute;
  background-color: antiquewhite;
  /* Take full width */
  width: 100%;
}
</style>
