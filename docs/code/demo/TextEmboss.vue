<script setup>
import { ref } from 'vue'

const text = ref('Hello World')
</script>

<template>
  <div class="text-emboss">
    <h1>{{ text }}</h1>
  </div>
</template>

<style scoped lang="scss">
.text-emboss {
  background-color: #eee;
  h1 {
    font-size: 21vmin;
    font-family: 'Luckiest Guy';
    line-height: 1;
    margin: 0;
    letter-spacing: 5px;
    color:#e6e6e6;
    text-align: center;
    text-shadow: 1px -1px #fff, 2px -2px #fff, -1px 1px #999, -2px 2px #999;
  }
}
</style>
