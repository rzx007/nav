<template>
  <div style="display: flex;">
    <div class="focus-border" style="margin-right: 20px;"></div>
    <div class="focus-border" style="width: 200px"></div>
  </div>
</template>

<style>
.focus-border {
  overflow: hidden;
  width: 100px;
  height: 100px;
  border: 4px solid red;
  border-radius: 10px;

  /* 核心代码 */
  -webkit-mask: conic-gradient(from -90deg at 40px 40px, red 90deg, transparent 0deg);
  -webkit-mask-position: -20px -20px;
}
</style>
