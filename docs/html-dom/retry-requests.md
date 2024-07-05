# 并发任务控制

::: tip
任务并发控制
:::

```ts
export class SuperTask {
  private tasks: any[] = []
  private runningCount: number = 0 // 正在执行的任务数量
  private paralleCount: number
  constructor(paralleCount: number = 2) {
    this.paralleCount = paralleCount
  }

  addTask(task: Function) {
    return new Promise((resolve, reject) => {
      this.tasks.push({ task, resolve, reject })
      this.run()
    })
  }
  private run() {
    while (this.runningCount < this.paralleCount && this.tasks.length > 0) {
      const { task, resolve, reject } = this.tasks.shift()
      if (task) {
        this.runningCount++
        Promise.resolve(task())
          .then(resolve, reject)
          .finally(() => {
            this.runningCount--
            this.run()
          })
      }
    }
  }
}
```

```ts
import { SuperTask } from './utils/superTask'

const superTask = new SuperTask(2)
function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
function addTask(time: number, name) {
  superTask
    .addTask(() => timeout(time))
    .then(() => {
      console.log(name, '执行完毕')
    })
}

addTask(10000, '任务1')
addTask(5000, '任务2')
addTask(3000, '任务3')
addTask(4000, '任务4')
addTask(5000, '任务5')
```

``` ts
任务2 执行完毕
任务3 执行完毕
任务1 执行完毕
任务4 执行完毕
任务5 执行完毕
```
