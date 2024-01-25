// Card3d.tsx
import { defineComponent, onMounted, ref, PropType, CSSProperties } from 'vue'
const style: CSSProperties = {
  width: '200px',
  borderRadius: '10px',
  background: '#fff',
  transformStyle: 'preserve-3d',
  transition: 'all 0.5s ease',
  overflow: 'hidden',
  transform: 'perspective(500px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
}
// 验证范围
const validatorFn = (val: Array<number>) => {
  return val.length === 2 && val[0] < -90 && val[1] < 90
}
export const Card3D = defineComponent({
  name: 'Card3D',
  props: {
    yRange: {
      type: Array as PropType<Array<number>>,
      validator: validatorFn,
      default: () => [-20, 20],
    },
    xRange: {
      type: Array as PropType<Array<number>>,
      validator: validatorFn,
      default: () => [-15, 15],
    },
  },
  setup(props, { slots }) {
    const cardRef = ref<HTMLDivElement | null>(null)
    onMounted(() => {
      const card3d = cardRef.value!
      const { yRange, xRange } = props
      const effectHandle = (e: MouseEvent) => {
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
      }
      card3d.addEventListener('mousemove', effectHandle)
      card3d.addEventListener('mouseleave', () => {
        card3d.style.setProperty('--ry', `0deg`)
        card3d.style.setProperty('--rx', `0deg`)
      })
    })
    return () => (
      <div style={style} ref={cardRef}>
        {slots.default && slots.default()}
      </div>
    )
  },
})
