
# vue3 高阶组件

`高阶组件HOC`在 React 社区是非常常见的概念，但是在 Vue 社区中却是很少人使用。主要原因有两个：

1. Vue 中一般都是使用 SFC，实现 HOC 比较困难。
2. HOC 能够实现的东西，在 Vue2 时代`mixins`能够实现，在 Vue3 时代`Composition API`能够实现。如果你不知道 HOC，那么你平时绝对没有场景需要他。但是如果你知道 HOC，那么在一些特殊的场景使用他就可以很优雅的解决一些问题。

## 什么是高阶组件 HOC

HOC 使用场景就是`加强原组件`。

HOC 实际就是一个函数，这个函数接收的参数就是一个组件，并且返回一个组件，返回的就是加强后组件。如下图： ![Image 12: hoc](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/26c4ef37f577408e9ce001f2aeba1c68~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5qyn6Ziz:q75.awebp?rk3s=f64ab15b&x-expires=1736753859&x-signature=INhbV8PZR0O94%2B%2BAKrmugQjulb0%3D)

在`Composition API`出现之前 HOC 还有一个常见的使用场景就是提取公共逻辑，但是有了`Composition API`后这种场景就无需使用 HOC 了。

## 高阶组件 HOC 使用场景

很多同学觉得有了`Composition API`后，直接无脑使用他就完了，无需费时费力的去搞什么 HOC。那如果是下面这个场景呢？

有一天产品找到你，说要给我们的系统增加会员功能，需要让系统中的几十个功能块增加会员可见功能。如果不是会员这几十个功能块都显示成引导用户开通会员的 UI，并且这些功能块涉及到几十个组件，分布在系统的各个页面中。

如果不知道 HOC 的同学一般都会这样做，将会员相关的功能抽取成一个名为`useVip.ts`的 hooks。代码如下：

```ts
export function useVip() {
  function getShowVipContent() {
    // 一些业务逻辑判断是否是 VIP
    return false
  }

  return {
    showVipContent: getShowVipContent(),
  }
}
```

然后再去每个具体的业务模块中去使用`showVipContent`变量判断，`v-if="showVipContent"`显示原模块，`v-else`显示引导开通会员 UI。代码如下：

我们系统中有几十个这样的组件，那么我们就需要这样去改几十次。非常麻烦，如果有些模块是其他同事写的代码还很容易改错！！！

而且现在流行搞 SVIP，也就是光开通 VIP 还不够，需要再开通一个 SVIP。当你后续接到 SVIP 需求时，你又需要去改这几十个模块。`v-if="SVIP"`显示某些内容，`v-else-if="VIP"`显示提示开通 SVIP，`v-else`显示提示开通 VIP。

上面的这一场景使用 hooks 去实现，虽然能够完成，但是因为入侵了这几十个模块的业务逻辑。所以容易出错，也改起来比较麻烦，代码也不优雅。

那么有没有一种更好的解决方案，让我们可以不入侵这几十个模块的业务逻辑的实现方式呢？

答案是：`高阶组件HOC`。

HOC 的一个用途就是对组件进行增强，并且不会入侵原有组件的业务逻辑，在这里就是使用 HOC 判断会员相关的逻辑。如果是会员那么就渲染原本的模块组件，否则就渲染引导开通 VIP 的 UI

## 实现一个简单的 HOC

首先我们要明白 Vue 的组件经过编译后就是一个对象，对象中的`props`属性对应的就是我们写的`defineProps`。对象中的 setup 方法，对应的就是我们熟知的`<script setup>`语法糖。

比如我使用`console.log(Block1)`将上面的`import Block1 from "./block1.vue";`给打印出来，如下图： ![Image 13: console](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2d15f0a80af2402381d82a94e8a510d9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5qyn6Ziz:q75.awebp?rk3s=f64ab15b&x-expires=1736753859&x-signature=ZwfL566oKMLWtjZf%2Fti68%2FvaXtE%3D)

这个就是我们引入的 Vue 组件对象。

还有一个冷知识，大家可能不知道。如果在 setup 方法中返回一个函数，那么在 Vue 内部就会认为这个函数就是实际的 render 函数，并且在 setup 方法中我们天然的就可以访问定义的变量。

利用这一点我们就可以在 Vue3 中实现一个简单的高阶组件 HOC，代码如下：

```ts
import { h } from 'vue'
import OpenVipTip from './open-vip-tip.vue'

export default function WithVip(BaseComponent: any) {
  return {
    setup() {
      const showVipContent = getShowVipContent()
      function getShowVipContent() {
        // 一些业务逻辑判断是否是 VIP
        return true
      }

      return () => {
        return showVipContent ? h(BaseComponent) : h(OpenVipTip)
      }
    },
  }
}
```

在上面的代码中我们将会员相关的逻辑全部放在了`WithVip`函数中，这个函数接收一个参数`BaseComponent`，他是一个 Vue 组件对象。

在`setup`方法中我们 return 了一个箭头函数，他会被当作 render 函数处理。

如果`showVipContent`为 true，就表明当前用户开通了 VIP，就使用`h`函数渲染传入的组件。

否则就渲染`OpenVipTip`组件，他是引导用户开通 VIP 的组件。

此时我们的父组件就应该是下面这样的：

这个代码相比前面的 hooks 的实现就简单很多了，只需要使用高阶组件`WithVip`对原来的`Block1`组件包一层，然后将原本使用`Block1`的地方改为使用`EnhancedBlock1`。对原本的代码基本没有入侵。

上面的例子只是一个简单的 demo，他是不满足我们实际的业务场景。比如子组件有`props`、`emit`、`插槽`。还有我们在父组件中可能会直接调用子组件 expose 暴露的方法。

因为我们使用了 HOC 对原本的组件进行了一层封装，那么上面这些场景 HOC 都是不支持的，我们需要添加一些额外的代码去支持。

## 高阶组件 HOC 实现 props 和 emit

在 Vue 中属性分为两种，一种是使用`props`和`emit`声明接收的属性。第二种是未声明的属性`attrs`，比如 class、style、id 等。

在 setup 函数中 props 是作为第一个参数返回，`attrs`是第二个参数中返回。

所以为了能够支持 props 和 emit，我们的高阶组件`WithVip`将会变成下面这样：

```ts
import { SetupContext, h } from 'vue'
import OpenVipTip from './open-vip-tip.vue'

export default function WithVip(BaseComponent: any) {
  return {
    props: BaseComponent.props, // 新增代码
    setup(props, { attrs, slots, expose }: SetupContext) {
      // 新增代码
      const showVipContent = getShowVipContent()
      function getShowVipContent() {
        // 一些业务逻辑判断是否是VIP
        return true
      }

      return () => {
        return showVipContent
          ? h(BaseComponent, {
              ...props, // 新增代码
              ...attrs, // 新增代码
            })
          : h(OpenVipTip)
      }
    },
  }
}
```

在`setup`方法中接收的第一个参数就是`props`，没有在 props 中定义的属性就会出现在`attrs`对象中。

所以我们调用 h 函数时分别将`props`和`attrs`透传给子组件。

同时我们还需要一个地方去定义 props，props 的值就是直接读取子组件对象中的`BaseComponent.props`。所以我们给高阶组件声明一个 props 属性：`props: BaseComponent.props,`。

这样 props 就会被透传给子组件了。

看到这里有的小伙伴可能会问，那 emit 触发事件没有看见你处理呢？

答案是：我们无需去处理，因为父组件上面的`@changeName="(value) => (name1 = value)"`经过编译后就会变成属性：`:onChangeName="(value) => (name1 = value)"`。而这个属性由于我们没有在 props 中声明，所以他会作为`attrs`直接透传给子组件。

## 高阶组件实现插槽

我们的正常子组件一般还有插槽，比如下面这样：

在上面的例子中，子组件有个默认插槽和 name 为`footer`的插槽。此时我们来看看高阶组件中如何处理插槽呢？

直接看代码：

```ts
import { SetupContext, h } from 'vue'
import OpenVipTip from './open-vip-tip.vue'

export default function WithVip(BaseComponent: any) {
  return {
    props: BaseComponent.props,
    setup(props, { attrs, slots, expose }: SetupContext) {
      const showVipContent = getShowVipContent()
      function getShowVipContent() {
        // 一些业务逻辑判断是否是VIP
        return true
      }

      return () => {
        return showVipContent
          ? h(
              BaseComponent,
              {
                ...props,
                ...attrs,
              },
              slots, // 新增代码
            )
          : h(OpenVipTip)
      }
    },
  }
}
```

插槽的本质就是一个对象里面拥有多个方法，这些方法的名称就是每个具名插槽，每个方法的参数就是插槽传递的变量。这里我们只需要执行`h`函数时将`slots`对象传给 h 函数，就能实现插槽的透传（如果你看不懂这句话，那就等欧阳下篇插槽的文章写好后再来看这段话你就懂了）。

我们在控制台中来看看传入的`slots`插槽对象，如下图： ![Image 14: slots](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/1d7737a647984332b21d4c608517c288~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5qyn6Ziz:q75.awebp?rk3s=f64ab15b&x-expires=1736753859&x-signature=tTX1t5iPEEsZkfsZzheUh9kC638%3D)

从上面可以看到插槽对象中有两个方法，分别是`default`和`footer`，对应的就是默认插槽和 footer 插槽。

大家熟知 h 函数接收的第三个参数是 children 数组，也就是有哪些子元素。但是他其实还支持直接传入`slots`对象，下面这个是他的一种定义：

```ts
export function h<P>(
  type: Component<P>,
  props?: (RawProps & P) | null,
  children?: RawChildren | RawSlots,
): VNode

export type RawSlots = {
  [name: string]: unknown
  // ...省略
}
```

所以我们可以直接把 slots 对象直接丢给 h 函数，就可以实现插槽的透传。

## 父组件调用子组件的方法

有的场景中我们需要在父组件中直接调用子组件的方法，按照以前的场景，我们只需要在子组件中 expose 暴露出去方法，然后在父组件中使用 ref 访问到子组件，这样就可以调用了。

但是使用了 HOC 后，中间层多了一个高阶组件，所以我们不能直接访问到子组件 expose 的方法。

怎么做呢？答案很简单，直接上代码：

```ts
import { SetupContext, h, ref } from 'vue'
import OpenVipTip from './open-vip-tip.vue'

export default function WithVip(BaseComponent: any) {
  return {
    props: BaseComponent.props,
    setup(props, { attrs, slots, expose }: SetupContext) {
      const showVipContent = getShowVipContent()
      function getShowVipContent() {
        // 一些业务逻辑判断是否是VIP
        return true
      }

      // 新增代码start
      const innerRef = ref()
      expose(
        new Proxy(
          {},
          {
            get(_target, key) {
              return innerRef.value?.[key]
            },
            has(_target, key) {
              return key in baseRef.value
            },
          },
        ),
      )
      // 新增代码end

      return () => {
        return showVipContent
          ? h(
              BaseComponent,
              {
                ...props,
                ...attrs,
                ref: innerRef, // 新增代码
              },
              slots,
            )
          : h(OpenVipTip)
      }
    },
  }
}
```

在高阶组件中使用`ref`访问到子组件赋值给`innerRef`变量。然后 expose 一个`Proxy`的对象，在 get 拦截中让其直接去执行子组件中的对应的方法。

比如在父组件中使用`block1Ref.value.handleClick()`去调用`handleClick`方法，由于使用了 HOC，所以这里读取的`handleClick`方法其实是读取的是 HOC 中 expose 暴露的方法。所以就会走到`Proxy`的 get 拦截中，从而可以访问到真正子组件中 expose 暴露的`handleClick`方法。

那么上面的 Proxy 为什么要使用`has`拦截呢？

答案是在 Vue 源码中父组件在执行子组件中暴露的方法之前会执行这样一个判断：

```ts
if (key in target) {
  return target[key]
}
```

很明显我们这里的`Proxy`代理的原始对象里面什么都没有，执行`key in target`肯定就是 false 了。所以我们可以使用`has`去拦截`key in target`，意思是只要访问的方法或者属性是子组件中`expose`暴露的就返回 true。

至此，我们已经在 HOC 中覆盖了 Vue 中的所有场景。但是有的同学觉得`h`函数写着比较麻烦，不好维护，我们还可以将上面的高阶组件改为 tsx 的写法，`with-vip.tsx`文件代码如下：

```ts
import { SetupContext, ref } from 'vue'
import OpenVipTip from './open-vip-tip.vue'

export default function WithVip(BaseComponent: any) {
  return {
    props: BaseComponent.props,
    setup(props, { attrs, slots, expose }: SetupContext) {
      const showVipContent = getShowVipContent()
      function getShowVipContent() {
        // 一些业务逻辑判断是否是VIP
        return true
      }

      const innerRef = ref()
      expose(
        new Proxy(
          {},
          {
            get(_target, key) {
              return innerRef.value?.[key]
            },
            has(_target, key) {
              return key in baseRef.value
            },
          },
        ),
      )

      return () => {
        return showVipContent ? (
          <BaseComponent {...props} {...attrs} ref={innerRef}>
            {slots}
          </BaseComponent>
        ) : (
          <OpenVipTip />
        )
      }
    },
  }
}
```

一般情况下 h 函数能够实现的，使用`jsx`或者`tsx`都能实现（除非你需要操作虚拟 DOM）。

注意上面的代码是使用`ref={innerRef}`，而不是我们熟悉的`ref="innerRef"`，这里很容易搞错！！

## compose 函数

此时你可能有个新需求，需要给某些模块显示不同的折扣信息，这些模块可能会和上一个会员需求的模块有重叠。此时就涉及到多个高阶组件之间的组合情况。

同样我们使用 HOC 去实现，新增一个`WithDiscount`高阶组件，代码如下：

```ts
import { SetupContext, onMounted, ref } from 'vue'

export default function WithDiscount(BaseComponent: any, item: string) {
  return {
    props: BaseComponent.props,
    setup(props, { attrs, slots, expose }: SetupContext) {
      const discountInfo = ref('')

      onMounted(async () => {
        const res = await getDiscountInfo(item)
        discountInfo.value = res
      })

      function getDiscountInfo(item: any): Promise<string> {
        // 根据传入的item获取折扣信息
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve('我是折扣信息1')
          }, 1000)
        })
      }

      const innerRef = ref()
      expose(
        new Proxy(
          {},
          {
            get(_target, key) {
              return innerRef.value?.[key]
            },
            has(_target, key) {
              return key in baseRef.value
            },
          },
        ),
      )

      return () => {
        return (
          <div class="with-discount">
            <BaseComponent {...props} {...attrs} ref={innerRef}>
              {slots}
            </BaseComponent>
            {discountInfo.value ? <div class="discount-info">{discountInfo.value}</div> : null}
          </div>
        )
      }
    },
  }
}
```

那么我们的父组件如果需要同时用 VIP 功能和折扣信息功能需要怎么办呢？代码如下：

```ts
const EnhancedBlock1 = WithVip(WithDiscount(Block1, “item1”));
```

如果不是 VIP，那么这个模块的折扣信息也不需要显示了。

因为高阶组件接收一个组件，然后返回一个加强的组件。利用这个特性，我们可以使用上面的这种代码将其组合起来。

但是上面这种写法大家觉得是不是看着很难受，一层套一层。如果这里同时使用 5 个高阶组件，这里就会套 5 层了，那这个代码的维护难度就是地狱难度了。

所以这个时候就需要`compose`函数了，这个是 React 社区中常见的概念。它的核心思想是将多个函数从右到左依次组合起来执行，前一个函数的输出作为下一个函数的输入。

我们这里有多个 HOC（也就是有多个函数），我们期望执行完第一个 HOC 得到一个加强的组件，然后以这个加强的组件为参数去执行第二个 HOC，最后得到由多个 HOC 加强的组件。

`compose`函数就刚好符合我们的需求，这个是使用`compose`函数后的代码，如下：

```ts
const EnhancedBlock1 = compose(WithVip, WithDiscount('item1'))(Block1)
```

这样就舒服多了，所有的高阶组件都放在第一个括弧里面，并且由右向左去依次执行每个高阶组件 HOC。如果某个高阶组件 HOC 需要除了组件之外的额外参数，像`WithDiscount`这样处理就可以了。

很明显，我们的`WithDiscount`高阶组件的代码需要修改才能满足`compose`函数的需求，这个是修改后的代码：

```ts
import { SetupContext, onMounted, ref } from 'vue'

export default function WithDiscount(item: string) {
  return (BaseComponent: any) => {
    return {
      props: BaseComponent.props,
      setup(props, { attrs, slots, expose }: SetupContext) {
        const discountInfo = ref('')

        onMounted(async () => {
          const res = await getDiscountInfo(item)
          discountInfo.value = res
        })

        function getDiscountInfo(item: any): Promise<string> {
          // 根据传入的item获取折扣信息
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve('我是折扣信息1')
            }, 1000)
          })
        }

        const innerRef = ref()
        expose(
          new Proxy(
            {},
            {
              get(_target, key) {
                return innerRef.value?.[key]
              },
              has(_target, key) {
                return key in baseRef.value
              },
            },
          ),
        )

        return () => {
          return (
            <div class="with-discount">
              <BaseComponent {...props} {...attrs} ref={innerRef}>
                {slots}
              </BaseComponent>
              {discountInfo.value ? <div class="discount-info">{discountInfo.value}</div> : null}
            </div>
          )
        }
      },
    }
  }
}
```

注意看，`WithDiscount`此时只接收一个参数`item`，不再接收`BaseComponent`组件对象了，然后直接 return 出去一个回调函数。

准确的来说此时的`WithDiscount`函数已经不是高阶组件 HOC 了，`他return出去的回调函数才是真正的高阶组件HOC`。在回调函数中去接收`BaseComponent`组件对象，然后返回一个增强后的 Vue 组件对象。

至于参数`item`，因为闭包所以在里层的回调函数中还是能够访问的。这里比较绕，可能需要多理解一下。

前面的理解完了后，我们可以再上一点强度了。来看看`compose`函数是如何实现的，代码如下：

```ts
function compose(…funcs) {
return funcs.reduce((acc, cur) => (…args) => acc(cur(…args)));
}
```

`这个函数虽然只有一行代码，但是乍一看，怎么看怎么懵逼，欧阳也是！！`我们还是结合 demo 来看：

```ts
const EnhancedBlock1 = compose(WithA, WithB, WithC, WithD)(View)
```

假如我们这里有`WithA`、`WithB`、 `WithC`、 `WithD`四个高阶组件，都是用于增强组件`View`。

compose 中使用的是`...funcs`将调用`compose`函数接收到的四个高阶组件都存到了`funcs`数组中。

然后使用 reduce 去遍历这些高阶组件，注意看执行`reduce`时没有传入第二个参数。

所以第一次执行 reduce 时，`acc`的值为`WithA`，`cur`的值为`WithB`。返回结果也是一个回调函数，将这两个值填充进去就是`(...args) => WithA(WithB(...args))`，我们将第一次的执行结果命名为`r1`。

我们知道 reduce 会将上一次的执行结果赋值为 acc，所以第二次执行 reduce 时，`acc`的值为`r1`，`cur`的值为`WithC`。返回结果也是一个回调函数，同样将这两个值填充进行就是`(...args) => r1(WithC(...args))`。同样我们将第二次的执行结果命名为`r2`。

第三次执行 reduce 时，此时的`acc`的值为`r2`，`cur`的值为`WithD`。返回结果也是一个回调函数，同样将这两个值填充进行就是`(...args) => r2(WithD(...args))`。同样我们将第三次的执行结果命名为`r3`，由于已经将数组遍历完了，最终 reduce 的返回值就是`r3`，他是一个回调函数。

由于`compose(WithA, WithB, WithC, WithD)`的执行结果为`r3`，那么`compose(WithA, WithB, WithC, WithD)(View)`就等价于`r3(View)`。

前面我们知道`r3`是一个回调函数：`(...args) => r2(WithD(...args))`，这个回调函数接收的参数`args`，就是需要增强的基础组件`View`。所以执行这个回调函数就是先执行`WithD`对组件进行增强，然后将增强后的组件作为参数去执行`r2`。

同样`r2`也是一个回调函数：`(...args) => r1(WithC(...args))`，接收上一次`WithD`增强后的组件为参数执行`WithC`对组件再次进行增强，然后将增强后的组件作为参数去执行`r1`。

同样`r1`也是一个回调函数：`(...args) => WithA(WithB(...args))`，将`WithC`增强后的组件丢给`WithB`去执行，得到增强的组件再丢给`WithA`去执行，最终就拿到了最后增强的组件。

执行顺序就是`从右向左`去依次执行高阶组件对基础组件进行增强。

至此，关于`compose`函数已经讲完了，这里对于 Vue 的同学可能比较难理解，建议多看两遍。

## 总结

这篇文章我们讲了在 Vue3 中如何实现一个高阶组件 HOC，但是里面涉及到了很多源码知识，所以这是一篇运用源码的实战文章。如果你理解了文章中涉及到的知识，那么就会觉得 Vue 中实现 HOC 还是很简单的，反之就像是在看天书。

还有最重要的一点就是`Composition API`已经能够解决绝大部分的问题，只有少部分的场景才需要使用高阶组件 HOC，`切勿强行使用HOC`，那样可能会有炫技的嫌疑。如果是防御性编程，那么就当我没说。

最后就是我们实现的每个高阶组件 HOC 都有很多重复的代码，而且实现起来很麻烦，心智负担也很高。那么我们是不是可以抽取一个`createHOC`函数去批量生成高阶组件呢？这个就留给各位自己去思考了。

还有一个问题，我们这种实现的高阶组件叫做`正向属性代理`，弊端是每代理一层就会增加一层组件的嵌套。那么有没有方法可以解决嵌套的问题呢？

答案是`反向继承`，但是这种也有弊端如果业务是 setup 中返回的 render 函数，那么就没法重写了 render 函数了。
