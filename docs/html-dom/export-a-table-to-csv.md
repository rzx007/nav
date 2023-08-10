# 将表导出为 csv

假设我们有如下的表格：

```html
<table id="exportMe" class="table">...</table>

<button id="export">Export</button>
```

### 将表格单元格导出为 CSV

下面的函数将所有单元格导出为 CSV 格式, 先遍历 table 所有的 th 和 td, 然后将其值添加到一个数组中, 最后将数组转换为 CSV 格式的字符串.

```js
const toCsv = function (table) {
  // Query all rows
  const rows = table.querySelectorAll('tr')

  return [].slice
    .call(rows)
    .map(function (row) {
      // Query all cells
      const cells = row.querySelectorAll('th,td')
      return [].slice
        .call(cells)
        .map(function (cell) {
          return cell.textContent
        })
        .join(',')
    })
    .join('\n')
}
```

### 将表格导出为 CSV

下载函数

```js
const download = function (text, fileName) {
  const link = document.createElement('a')
  // const blob = new Blob([encodeURIComponent(text)], { type: 'text/csv' });
  // const url = window.URL.createObjectURL(blob);
  // link.setAttribute('href', url)
  // or
  link.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(text)}`)
  link.setAttribute('download', fileName)

  link.style.display = 'none'
  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)
}
```

最后一件事是将所有部分连接在一起。我们只需要处理导出按钮的事件：click

```js
const table = document.getElementById('exportMe')
const exportBtn = document.getElementById('export')

exportBtn.addEventListener('click', function () {
  // Export to csv
  const csv = toCsv(table)

  // Download it
  download(csv, 'download.csv')
})
```
