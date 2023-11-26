# 使用 vue 指令实现一个元素平滑上升的效果

::: info
创建一个 vSlideIn.js 文件
:::

```js
const DISTANCE = 100
const DURATION = 1000
const map = new WeakMap() // 用户存储元素与动画的映射关系
// 判断元素是否在视口之下
const isBelowViewport = (el) => {
  const rect = el.getBoundingClientRect()
  return rect.top - DISTANCE > window.innerHeight
}
// 监听元素是否进入视口
const ob = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      // 元素与视口相交了, 播放动画
      const el = entry.target
      // 获取动画
      const animation = map.get(el)
      if (animation) {
        // 播放动画
        animation.play()
        // 播放完后取消监听
        animation.onfinish = () => {
          ob.unobserve(el)
        }
      }
    }
  }
})

export default {
  mounted(el) {
    // 元素在视口之上时不做任何事情
    if (!isBelowViewport(el)) {
      return
    }
    // Animate API
    const animation = el.animate(
      [
        {
          transform: `translateY(${DISTANCE}px)`,
          opacity: 0.5
        },
        {
          transform: 'translateY(0)',
          opacity: 1
        }
      ],
      {
        duration: DURATION,
        easing: 'ease-in-out',
        fill: 'forwards'
      }
    )
    // 暂停动画
    animation.pause()
    ob.observe(el)
    map.set(el, animation)
  },
  unmounted(el) {
    ob.unobserve(el)
  }
}
```
### 示例

<script setup>
import vSlideIn from '../code/demo/vSlideIn.vue'
</script>
<vSlideIn />
