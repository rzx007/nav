// 快速创建文档
import { input, select } from '@inquirer/prompts'
import { cwd } from 'node:process'
import { resolve } from 'node:path'
import fs from 'node:fs'

/**
 * 1. 输入文档名称
 * 2. 输入文档标题
 * 3. 输入文档级别
 */

const name = await input({
  message: '请输入文档名称',
  default: `${new Date().toLocaleString()}.md`,
  validate: (value) => {
    if (!value) {
      return '文档名称不能为空'
    }
    return true
  },
})

const title = await input({
  message: '请输入文档标题',
  validate: (value) => {
    if (!value) {
      return '文档标题不能为空'
    }
    return true
  },
})

const level = await select({
  message: '请选择文档级别',
  choices: [
    {
      name: '初级',
      value: '1',
    },
    {
      name: '中级',
      value: '2',
    },
    {
      name: '高级',
      value: '3',
    },
  ],
})
// 校验level
if (!['1', '2', '3'].includes(level)) {
  throw new Error('无效的文档级别')
}

const docsPath = resolve(cwd(), 'docs', 'html-dom')
const menuPath = resolve(cwd(), 'docs', 'navs', 'menu.json')

// 创建文档文件, 名称是name
try {
  fs.writeFileSync(resolve(docsPath, name), `# ${title}`)
} catch (error) {
  console.error('创建文档文件失败:', error)
}

// 更新menu.json
try {
  const menu = JSON.parse(fs.readFileSync(menuPath, 'utf-8'))
  // 根据level更新menu
  menu[Number(level) - 1].items.push({ text: title, link: `/html-dom/${name}` })
  fs.writeFileSync(menuPath, JSON.stringify(menu, null, 2))
} catch (error) {
  console.error('更新menu.json失败:', error)
}

console.log('创建文档成功')
