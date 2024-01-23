# 树形数据相互转换

## 把树形数据转换成扁平数组

::: details 查看代码
<<< @/code/tree/treeToArray.ts{ts}
:::

### 参数

接受两个参数：

- **Tree**: 树形结构数组

- **Options**: 一个可选的参数对象，用于配置转换方法的具体行为

  | 属性         | 描述                                             | 类型                                            | 默认值     |
  | ------------ | ------------------------------------------------ | ----------------------------------------------- | ---------- |
  | addFields    | 需要添加的字段名称及其对应的属性值计算方法的列表 | [{ fieldName: string;callback: (item) => any }] | []         |
  | childrenKey  | 子节点的键名                                     | string                                          | 'children' |
  | ignoreFields | 要忽略的字段名称列表                             | string[]                                        | []         |
  | needParentId | 是否添加节点信息的父节点 ID                      | boolean                                         | true       |

### 示例

```javascript
const treeArray = [
  {
    id: '1',
    name: 'Node 1',
    list: [
      {
        id: '2',
        name: 'Node 2',
        list: [
          {
            id: '3',
            name: 'Node 3'
          }
        ]
      },
      {
        id: '4',
        name: 'Node 4'
      }
    ]
  }
]
const calculateDepth = (node) => {
  let depth = 0
  let parent = node
  while (parent) {
    depth++
    parent = parent['parentId'] && treeArray.find((n) => n.id === parent['parentId'])
  }
  return depth
}
const options = {
  childrenKey: 'list',
  ignoreFields: [],
  addFields: [
    {
      fieldName: 'hasChildren', // 添加新字段 'hasChildren'，用于判断是否有子节点
      callback: (node) => Boolean(node['children'])
    },
    {
      fieldName: 'depth', // 添加新字段 'depth'，用于记录节点深度
      callback: calculateDepth
    }
  ],
  needParentId: true
}

const flatArray = treeToArray(treeArray, options)

console.log(flatArray)
```
结果如下：
```json
[
  { "id": "1", "name": "Node 1", "parentId": "", "hasChildren": false, "depth": 1 },
  { "id": "2", "name": "Node 2", "parentId": "1", "hasChildren": false, "depth": 1 },
  { "id": "3", "name": "Node 3", "parentId": "2", "hasChildren": false, "depth": 1 },
  { "id": "4", "name": "Node 4", "parentId": "1", "hasChildren": false, "depth": 1 }
]
```

## 把扁平数组转换成树形数据

::: details 查看代码
<<< @/code/tree/arrayToTree.ts{ts}
:::

### 参数

它接受两个参数：

- **Array**: 扁平的节点数组
- **Options**: 一个可选的参数对象，用于配置转换方法的具体行为

  | 参数        | 描述                         | 类型   | 默认值     |
  | ----------- | ---------------------------- | ------ | ---------- |
  | childrenKey | 自定义节点 children 字段名称 | string | 'children' |
  | idKey       | 自定义节点 ID 字段名称       | string | 'id'       |
  | pidKey      | 自定义节点父 ID 字段名称     | string | 'pid'      |

### 示例

```javascript
const flatArray = [
  { uid: '1', name: 'node1', pid: null },
  { uid: '2', name: 'node2', pid: '1' },
  { uid: '3', name: 'node3', pid: '1' },
  { uid: '4', name: 'node4', pid: '2' },
  { uid: '5', name: 'node5', pid: '2' },
  { uid: '6', name: 'node6', pid: '3' }
]

const options = {
  idKey: 'id',
  pidKey: 'pid',
  childrenKey: 'children'
}

const treeArray = arrayToTree(flatArray, options)
```

### 生成随机树形数据

<<< @/code/tree/generateTree.ts{ts}