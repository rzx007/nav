<!-- 基于giscus的评论 -->
<!-- 参考: https://tricker39.github.io/programming-knowledge/home/giscus -->
<template>
  <div class="comment">
    <component
      :is="'script'"
      src="https://giscus.app/client.js"
      data-repo="rzx007/nav"
      data-repo-id="R_kgDOKFJWVg"
      data-category="Show and tell"
      data-category-id="DIC_kwDOKFJWVs4CclyE"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      :data-theme="!isDark ? 'light' : 'dark'"
      data-lang="zh-CN"
      crossorigin="anonymous"
      data-loading="eager"
      async
    ></component>
  </div>
</template>
<script setup lang="ts">
import { useData } from 'vitepress'
// 获取当前配色方案
const { isDark } = useData()
</script>
<style lang="scss" scoped>
.comment {
  margin-top: 16px;
}
</style>
