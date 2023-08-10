# 通过单击表格标题对表格进行排序

假设我们要对下表的任何列进行排序：

```html
<table id="sortMe" class="table">...</table>
```

### 对行进行排序

首先，我们查询所有`th`，遍历它们，并添加`click`事件监听器：

```js
// Query the table
const table = document.getElementById('sortMe')

// Query the headers
const headers = table.querySelectorAll('th')

// Loop over the headers
;[].forEach.call(headers, function (header, index) {
  header.addEventListener('click', function () {
    // This function will sort the column
    sortColumn(index)
  })
})
```

下面我们将实现`sortColumn`方法

- 首先，对`tr`排序
- 移除所有的表行
- 重新添加排序后的表行

```js
// Query all rows
const tableBody = table.querySelector('tbody')
const rows = tableBody.querySelectorAll('tr')

const sortColumn = function (index) {
  // Clone the rows
  const newRows = Array.from(rows)

  // Sort rows by the content of cells
  newRows.sort(function (rowA, rowB) {
    // Get the content of cells
    const cellA = rowA.querySelectorAll('td')[index].innerHTML
    const cellB = rowB.querySelectorAll('td')[index].innerHTML

    switch (true) {
      case cellA > cellB:
        return 1
      case cellA < cellB:
        return -1
      case cellA === cellB:
        return 0
    }
  })

  // Remove old rows
  ;[].forEach.call(rows, function (row) {
    tableBody.removeChild(row)
  })

  // Append new row
  newRows.forEach(function (newRow) {
    tableBody.appendChild(newRow)
  })
}
```
