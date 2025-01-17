# 实现一个 shuffle 函数

:::tip
在 TypeScript 中，你可以实现一个 shuffle 函数来随机打乱数组中的元素。以下是一个使用 Fisher-Yates 算法的实现
:::

```ts
function shuffle<T>(array: T[]): T[] {
    // 创建一个数组的副本，避免修改原数组
    const shuffledArray = [...array];
    let currentIndex = shuffledArray.length;

    // 当还有未处理的元素时
    while (currentIndex !== 0) {
        // 随机选择一个未处理的元素
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // 交换当前元素和随机选择的元素
        [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
            shuffledArray[randomIndex],
            shuffledArray[currentIndex],
        ];
    }

    return shuffledArray;
}

// 示例用法
const originalArray = [1, 2, 3, 4, 5];
const shuffledArray = shuffle(originalArray);

console.log(shuffledArray); // 输出可能是 [3, 1, 5, 2, 4] 或其他随机顺序
```

### 解释：

- **Fisher-Yates 算法**：该算法通过从数组的末尾开始，随机选择一个元素并与当前元素交换，逐步向前处理，直到所有元素都被处理过。这样可以确保每个元素都有相等的概率出现在任何位置。

- **Math.random()**：生成一个 [0, 1) 之间的随机数。

- **Math.floor()**：将随机数向下取整，得到一个整数索引。

### 注意事项：

- 这个实现不会修改原始数组，而是返回一个新的打乱后的数组。如果你希望直接修改原数组，可以将 shuffledArray 直接赋值给 array。
- 这个实现使用了 ES6 的解构赋值语法，如果你的 TypeScript 版本不支持，可以改为使用数组的 swap 方法。

### 直接修改原数组的版本：
```ts
function shuffleInPlace<T>(array: T[]): T[] {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

// 示例用法
const array = [1, 2, 3, 4, 5];
shuffleInPlace(array);

console.log(array); // 输出可能是 [3, 1, 5, 2, 4] 或其他随机顺序
```
这个版本的 **shuffleInPlace** 函数会直接修改传入的数组。
