<script setup lang="ts">
import { onMounted, ref } from 'vue'
const container = ref<HTMLDivElement|null>(null)
onMounted(() => {
  const cards = container.value?.querySelectorAll('.l-card') || []
  container.value!.onmousemove = (e) => {
    for (const card   of cards) {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      (card as HTMLDivElement).style.setProperty('--x', x + 'px');
      (card as HTMLDivElement).style.setProperty('--y', y + 'px');

    }
  }
  container.value!.onmouseleave = () => {
    for (const card   of cards) {
      (card as HTMLDivElement).style.setProperty('--x', '0px');
      (card as HTMLDivElement).style.setProperty('--y', '0px');
    }
  }
})
</script>
<template>
  <div class="grid grid-cols-4 gap-2" ref="container">
    <div class="l-card aspect-video bg-neutral-500 rounded-md relative overflow-hidden" v-for="i in 7">
      <div class="absolute  z-10 inset-0.5 bg-neutral-700 rounded-md"></div>
    </div>
  </div>
</template>
<style lang="scss">
.l-card::after {
  content: '';
  inset: 0;
  position: absolute;
  background: radial-gradient(closest-side circle , #fff ,transparent);
  transform: translate(var(--x, -1000px), var(--y, -1000px));
}
</style>
