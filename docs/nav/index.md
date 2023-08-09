---
layoutClass: m-nav-layout
outline: [2, 3, 4]
---

<script setup>
import MNavLinks from './components/MNavLinks.vue'

import { NAV_DATA } from './data'
</script>
<style src="./index.scss"></style>

# 前端导航

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

<br />

::: tip
如果你有好的网站推荐，欢迎提交 [issue]() 或 [PR]()。
:::
