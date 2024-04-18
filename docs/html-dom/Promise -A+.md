# 手写 Promise：实现符合 Promises/A+规范的 Promise

::: tip
`Promise`是 JavaScript 中非常重要的一个概念，它是一种用于处理异步操作的编程模型。`Promise`提供了一种优雅的方式来处理异步操作的成功或失败，以及它们之间的依赖关系。这使得我们可以避免回调地狱（Callback Hell）的问题，编写更清晰、更易于理解的代码。

`Promises/A+`是一个对`Promise`行为的开放规范，它规定了`Promise`应该如何表现和实现。遵循这个规范的`Promise`实现可以确保它们之间的互操作性，使得我们可以在不同的库和框架中轻松地使用它们。在本文中，我们将实现一个名为`myPromise`的类，它将遵循`Promises/A+`规范。
:::

我们将实现以下功能和方法，使 myPromise 符合 Promises/A+规范：

1. myPromise 构造函数及基本状态
2. resolve 和 reject 方法
3. then方法
4. catch方法
5. finally方法
6. 静态方法 resolve、reject、all、race等



### 完整代码
::: details 点击查看代码
<<< @/code/demo/Promise.ts
:::


### 测试

```ts
// 示例用法
const myCustomPromise = new myPromise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve('Custom Promise Resolved')
  }, 2000)
})

myCustomPromise
  .then((value) => {
    console.log(value) // 输出: Custom Promise Resolved
  })
  .catch((error) => {
    console.error(error)
  })
```
