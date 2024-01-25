<!-- 3DHover.vue -->
<template>
  <div class="card-wrap">
    <div class="card-3d">
      <img src="https://fun.youth.cn/gnzx/202011/W020201119307688300465.jpg" alt="" />
    </div>
  </div>
</template>
<script setup lang="tsx">
import { onMounted } from 'vue'
onMounted(() => {
  const card3d = document.querySelector('.card-3d') as HTMLDivElement
  const yRange = [-20, 20]
  const xRange = [-15, 15]

  const effectHandle = (e) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = card3d.getBoundingClientRect()
    // 相对卡片的实际移动距离
    const x = clientX - left
    const y = clientY - top
    // 计算比例
    const yPercent = y / height
    const xPercent = x / width
    // 等比运算计算角度
    const yDeg = yRange[0] + (yRange[1] - yRange[0]) * yPercent
    const xDeg = xRange[0] + (xRange[1] - xRange[0]) * xPercent
    // 设置css变量
    card3d.style.setProperty('--ry', `${xDeg}deg`)
    card3d.style.setProperty('--rx', `${-yDeg}deg`)
    card3d.style.setProperty('--per', `${xDeg}%`)
  }
  card3d.addEventListener('mousemove', effectHandle)
  card3d.addEventListener('mouseleave', () => {
    card3d.style.setProperty('--ry', `0deg`)
    card3d.style.setProperty('--rx', `0deg`)
  })
})
</script>
<style lang="scss">
.card-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  .card-3d {
    position: relative;
    width: 200px;
    border-radius: 10px;
    background: #fff;
    // 核心样式
    transform-style: preserve-3d;
    transition: all 0.5s ease;
    transform: perspective(500px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
    &:hover {
      box-shadow: -3px 3px 10px rgba(0, 0, 0, 0.5);
    }
    &:hover::before {
      display: block;
    }
    // 添加反光效果
    &::before {
      content: '';
      display: none;
      position: absolute;
      border-radius: inherit;
      inset: 0;
      background: linear-gradient(
                115deg, 
                transparent 0%, 
                rgba(255, 255, 255, 0.5) var(--per,30%),
                rgba(0, 0, 0, .5) calc(var(--per, 55%) + 25%),
                rgba(255, 255, 255, .5) calc(var(--per, 80%) + 50%),
                transparent 100%
            );
      mix-blend-mode: color-dodge;
    }
    img {
      border-radius: inherit;
      width: 100%;
    }
  }
}
</style>
