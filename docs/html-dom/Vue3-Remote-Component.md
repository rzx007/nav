# Vue3 远程加载组件

### 1. 基本远程组件加载

```html
<template>
  <div>
    <h1>远程组件示例</h1>
    <button @click="loadRemoteComponent">加载远程组件</button>
    <Suspense v-if="showRemoteComponent">
      <template #default>
        <RemoteComponent />
      </template>
      <template #fallback>
        <div>加载中...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';

const showRemoteComponent = ref(false);
const RemoteComponent = ref(null);

const loadRemoteComponent = async () => {
  showRemoteComponent.value = true;
  
  RemoteComponent.value = defineAsyncComponent(() => 
    import('https://your-cdn.com/path/to/remote-component.js').then(module => {
      // 可能需要根据实际导出进行调整
      return module.default || module;
    })
  );
};
</script>
```

### 2. 带参数的远程组件加载

```html
<template>
  <div>
    <button @click="loadComponent('UserProfile')">加载用户资料组件</button>
    <button @click="loadComponent('ProductCard')">加载产品卡片组件</button>
    
    <Suspense>
      <template #default>
        <component :is="currentComponent" v-bind="componentProps" />
      </template>
      <template #fallback>
        <div>加载组件中...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { ref, shallowRef, defineAsyncComponent } from 'vue';

const currentComponent = shallowRef(null);
const componentProps = ref({});

const componentMap = {
  UserProfile: {
    url: 'https://your-cdn.com/components/user-profile.js',
    props: { userId: '123' }
  },
  ProductCard: {
    url: 'https://your-cdn.com/components/product-card.js',
    props: { productId: '456' }
  }
};

const loadComponent = async (componentName) => {
  const config = componentMap[componentName];
  if (!config) return;
  
  currentComponent.value = defineAsyncComponent(() =>
    import(/* @vite-ignore */ config.url).then(module => module.default || module)
  );
  componentProps.value = config.props;
};
</script>
```

### 3. 带错误处理的远程组件

```html
  <div>
    <button @click="loadComponent">加载远程组件</button>
    
    <div v-if="error" class="error">
      加载失败: {{ error.message }}
      <button @click="retry">重试</button>
    </div>
    
    <Suspense v-else-if="isLoading">
      <template #default>
        <RemoteComponent />
      </template>
      <template #fallback>
        <div>加载中...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';

const isLoading = ref(false);
const error = ref(null);
const RemoteComponent = ref(null);

const loadComponent = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    
    RemoteComponent.value = defineAsyncComponent({
      loader: () => import(/* @vite-ignore */ 'https://your-cdn.com/components/special-component.js'),
      onError: (err, retry, fail) => {
        error.value = err;
        console.error('加载组件失败:', err);
      }
    });
  } catch (err) {
    error.value = err;
  } finally {
    isLoading.value = false;
  }
};

const retry = () => {
  error.value = null;
  loadComponent();
};
</script>
```

### 4. 使用 Webpack 模块联邦的远程组件

```html
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp',
      remotes: {
        remoteApp: 'remoteApp@http://remote-domain.com/remoteEntry.js'
      }
    })
  ]
};

// Vue组件中使用
<template>
  <Suspense>
    <template #default>
      <RemoteComponent />
    </template>
    <template #fallback>
      <div>加载中...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const RemoteComponent = defineAsyncComponent(() =>
  import('remoteApp/SomeComponent').then(module => module.default)
);
</script>

```

### 服务器端配置

```ts
const app = express();

// 设置CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 提供组件文件
app.get('/components/:componentName.js', (req, res) => {
  const componentName = req.params.componentName;
  
  // 这里可以根据请求动态生成组件，或返回预编译的文件
  const componentCode = `
    export default {
      name: '${componentName}',
      template: '<div>这是远程加载的${componentName}组件</div>'
    }
  `;
  
  res.type('application/javascript').send(componentCode);
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### Vue3 直接远程加载 .vue 文件

```html
  <div>
    <h1>远程加载.vue文件示例</h1>
    <button @click="loadRemoteVueFile">加载远程组件</button>
    
    <div v-if="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>
    
    <component :is="remoteComponent" v-if="remoteComponent" />
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue';
import { compile } from 'vue/compiler-sfc';

const remoteComponent = shallowRef(null);
const loading = ref(false);
const error = ref(null);

const loadRemoteVueFile = async () => {
  try {
    loading.value = true;
    error.value = null;
    remoteComponent.value = null;

    // 1. 获取远程.vue文件内容
    const response = await fetch('http://localhost:3000/remote-component.vue');
    const vueFileContent = await response.text();

    // 2. 编译.vue文件
    const { descriptor } = compile(vueFileContent, {
      filename: 'remote-component.vue'
    });

    // 3. 提取script和template
    const scriptContent = descriptor.script?.content || 'export default {}';
    const templateContent = descriptor.template?.content || '<div>No template</div>';

    // 4. 创建组件选项对象
    const componentOptions = new Function(`
      ${scriptContent.replace('export default', 'return ')}
    `)();

    componentOptions.template = templateContent;

    // 5. 注册组件
    remoteComponent.value = componentOptions;
  } catch (err) {
    error.value = `加载失败: ${err.message}`;
    console.error('加载远程组件失败:', err);
  } finally {
    loading.value = false;
  }
};
</script>

<style>
.error { color: red; }
</style>
```

### 服务端实现 (Node.js + Express)

```ts
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// 允许跨域
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 提供.vue文件
app.get('/remote-component.vue', (req, res) => {
  const filePath = path.join(__dirname, 'components', 'RemoteComponent.vue');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send('Component not found');
      return;
    }
    
    res.type('text/plain').send(data);
  });
});

// 静态文件服务（如果需要加载组件中的资源）
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### 远程组件示例 (RemoteComponent.vue)

```html
<template>
  <div class="remote-component">
    <h2>这是远程加载的组件</h2>
    <p>当前时间: {{ new Date().toLocaleString() }}</p>
    <button @click="count++">点击计数: {{ count }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    console.log('远程组件已挂载');
  }
}
</script>

<style scoped>
.remote-component {
  border: 2px dashed #42b983;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
}

.remote-component h2 {
  color: #42b983;
}
</style>

```

### 优化版本（使用预编译）

对于生产环境，建议服务端预编译组件：
```ts
app.get('/precompiled-component.js', async (req, res) => {
  const filePath = path.join(__dirname, 'components', 'RemoteComponent.vue');
  const vueFileContent = await fs.promises.readFile(filePath, 'utf8');
  
  // 使用@vue/compiler-sfc预编译
  const { compile } = require('vue/compiler-sfc');
  const { descriptor } = compile(vueFileContent);
  
  const script = descriptor.script?.content || 'export default {}';
  const template = descriptor.template?.content || '<div></div>';
  
  const componentCode = `
    ${script}
    export default {
      ...${script.includes('export default') ? '__script__' : '{}'},
      template: ${JSON.stringify(template)}
    }
  `.replace('export default', 'const __script__ =');
  
  res.type('application/javascript').send(componentCode);
});
```

然后在客户端可以直接加载预编译的版本：

```ts
  const module = await import('http://localhost:3000/precompiled-component.js');
  remoteComponent.value = module.default;
};
```
