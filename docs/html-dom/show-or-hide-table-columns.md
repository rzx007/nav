# 显示或隐藏表列

这篇文章展示了如何通过单击表的标题来显示或隐藏表的任何列

```html
<table id="table">...</table>
<ul id="menu"></ul>
```

### 构建菜单

在`#menu`添加一个菜单, 用于显示或隐藏表的列

```html
<ul id="menu">
  <li>
    <!-- The check box to toggle the first column -->
    <label>
      <input type="checkbox" />
      Label of first column
    </label>

    <!-- Other items ... -->
  </li>
</ul>
```

创建菜单项, 遍历表头的每一列, 并为每一列创建一个菜单项

```js
const menu = document.getElementById('menu')
const table = document.getElementById('table')
const headers = [].slice.call(table.querySelectorAll('th'))
// const headers = Array.from(table.querySelectorAll('th'));

headers.forEach(function (th, index) {
  // Build the menu item
  const li = document.createElement('li')
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')

  // Create the text node
  const text = document.createTextNode(th.textContent)

  label.appendChild(checkbox)
  label.appendChild(text)

  li.appendChild(label)
  menu.appendChild(li)
})
```

监听复选框事件, 当复选框被选中时, 显示对应的列, 否则隐藏对应的列

```js
headers.forEach(function(th, index) {
    // Build the menu item
    ...
    // Handle the event
    checkbox.addEventListener('change', function(e) {
        e.target.checked ? showColumn(index) : hideColumn(index);
    });
});

```

::: info
稍后我们将将实现`showColumn`, `hideColumn`方法。
:::

### 切换菜单

- 右键单击表标题时将显示菜单
- 当用户在菜单外单击时，它将隐藏

```js
const thead = table.querySelector('thead');

// Handle the `contextmenu` event of the header
thead.addEventListener('contextmenu', function(e) {
    // Prevent the default context menu from being shown
    e.preventDefault();

    // Show the menu
    ...

    document.addEventListener('click', documentClickHandler);
});

// Hide the menu when clicking outside of it
const documentClickHandler = function(e) {
    ...
};
```

### 切换表列

先给 th 和 td 添加一个`data-column-index`属性, 用于标识列的索引

```js
const numColumns = headers.length

const cells = [].slice.call(table.querySelectorAll('th, td'))
cells.forEach(function (cell, index) {
  cell.setAttribute('data-column-index', index % numColumns)
})
```

然后根据`data-column-index`属性获取列的索引,找到要隐藏的列, 并将其隐藏,实现`hideColumn`方法

```js
const hideColumn = function (index) {
  cells
    .filter(function (cell) {
      return cell.getAttribute('data-column-index') === `${index}`
    })
    .forEach(function (cell) {
      cell.style.display = 'none'
    })
}
```

同样的思路实现`showColumn`方法

```js
const showColumn = function (index) {
  cells
    .filter(function (cell) {
      return cell.getAttribute('data-column-index') === `${index}`
    })
    .forEach(function (cell) {
      cell.style.display = ''
    })
}
```

### 不允许隐藏最后一列

为了正常使用, 禁止隐藏最后一列, 让我们稍微修改一下构建菜单代码

```js
headers.forEach(function(th, index) {
    // Build the menu item
    ...
    // 为checkbox添加一个属性, 用于标识列的索引
    checkbox.setAttribute('data-column-index', index);
});
```

当每个列都隐藏时，我们添加一个自定义属性`data-shown`来指示该列已被隐藏：

```js
const hideColumn = function(index) {
  cells
      .filter(function(cell) {
          ...
      })
      .forEach(function(cell) {
          ...
          cell.setAttribute('data-shown', 'false');
      });
};
```

然后我们可以计算隐藏了多少列，如果只剩下一列，我们将禁用关联的复选框：

```js
const hideColumn = function (index) {
  // How many columns are hidden
  const numHiddenCols = headers.filter(function (th) {
    return th.getAttribute('data-shown') === 'false'
  }).length

  if (numHiddenCols === numColumns - 1) {
    // There's only one column which isn't hidden yet
    // We don't allow user to hide it
    const shownColumnIndex = thead
      .querySelector('[data-shown="true"]')
      .getAttribute('data-column-index')

    const checkbox = menu.querySelector(
      `[type="checkbox"][data-column-index="${shownColumnIndex}"]`
    )
    checkbox.setAttribute('disabled', 'true')
  }
}
```

为了使它完全工作，我们需要初始化每个单元格的属性，并在显示列时将其转回：`data-shown=true`

```js
cells.forEach(function(cell, index) {
  cell.setAttribute('data-shown', 'true');
});

const showColumn = function(index) {
  cells
      .filter(function(cell) {
          ...
      })
      .forEach(function(cell) {
          ...
          cell.setAttribute('data-shown', 'true');
      });

  menu.querySelectorAll(`[type="checkbox"][disabled]`)
      .forEach(function(checkbox) {
          checkbox.removeAttribute('disabled');
      });
};
```

### 完整代码

::: details 点击查看完整代码
<<< @/code/demo/HideTableColumn.vue
:::

### 示例
::: info
右键单击表头, 显示菜单, 选择要隐藏的列, 可以看到隐藏的列已经被隐藏, 只有最后一列时菜单中的复选框被禁用 
:::
<script setup>
import HideTableColumn from '../code/demo/HideTableColumn.vue'
</script>
<HideTableColumn />