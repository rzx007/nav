# 边框布局与样式

### 相机聚焦框

```css
.focus-border {
  overflow: hidden;
  width: 100px;
  height: 100px;
  border: 4px solid;
  border-radius: 10px;

  /* 核心代码 */
  -webkit-mask: conic-gradient(from -90deg at 40px 40px, red 90deg, transparent 0deg);
  -webkit-mask-position: -20px -20px;
}

```

<script setup>
import CameraBorder from '../code/demo/CameraBorder.vue'
</script>
<CameraBorder />



::: tip 相关资料

- [CSS 自适应的圆角对焦框](https://mp.weixin.qq.com/s/QLd4O0pHbWmmrXAeFdcfvA)

:::
