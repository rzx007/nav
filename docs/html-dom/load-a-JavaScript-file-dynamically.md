# 动态加载 JavaScript 文件

### 加载 JavaScript 文件

```js
// Create new script element
const script = document.createElement('script')
script.src = '/path/to/js/file.js'

// Append to the `head` element
document.head.appendChild(script)
```

### 加载 JavaScript 文件时执行代码

```js
// Create new script element
...
script.addEventListener('load', function() {
    // The script is loaded completely
    // Do something
});

// Append to the `head` element
...
```

### 按顺序加载多个 JavaScript 文件

假设您要按顺序加载 JavaScript 文件数组。

为此，我们必须加载第一个脚本，并在第一个脚本完全加载时加载第二个脚本。并继续这样做，直到加载所有脚本。

```js
// Load a script from given `url`
const loadScript = function (url) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement('script')
    script.src = url

    script.addEventListener('load', function () {
      // The script is loaded completely
      resolve(true)
    })

    document.head.appendChild(script)
  })
}

// Perform all promises in the order
const waterfall = function (promises) {
  return promises.reduce(
    function (p, c) {
      // Waiting for `p` completed
      return p.then(function () {
        // and then `c`
        return c().then(function (result) {
          return true
        })
      })
    },
    // The initial value passed to the reduce method
    Promise.resolve([])
  )
}

// Load an array of scripts in order
const loadScriptsInOrder = function (arrayOfJs) {
  const promises = arrayOfJs.map(function (url) {
    return loadScript(url)
  })
  return waterfall(promises)
}
```

运行

```js
loadScriptsInOrder(['/path/to/file.js', '/path/to/another-file.js', '/yet/another/file.js']).then(
  function () {
    // All scripts are loaded completely
    // Do something
  }
)
```
