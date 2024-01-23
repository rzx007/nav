<template>
  <div class="container">
    <div class="ball" ref="ballRef"></div>
    <input type="range" min="0" max="1" step="0.01" v-model="range" @input="changeFn">
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const ballRef = ref<HTMLDivElement | null>(null)
const range = ref(0.5)
const changeFn = () => {
  ballRef.value?.style.setProperty('--delay', `-${range.value}s`)
  // ballRef.value!.style['animation-play-state'] = 'running'
}
onMounted(() => {
  changeFn()
})
</script>
<style>
.container {
  position: relative;
  width: 100px;
  height: 100px;
}

.ball {
  --delay: 0s;
  width: 50px;
  height: 50px;
  background: red;
  border-radius: 50%;
  margin-bottom: 50px;
  animation: move ease-in-out forwards 1s paused;
  animation-delay: var(--delay);
}

@keyframes move {
  50% {
    transform: translateX(100px) scale(1.5);
  }
  to {
    transform: translateX(200px) scale(0.8);
  }
}
</style>
