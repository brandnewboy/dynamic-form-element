import { createApp } from 'vue'
import { ElLoading } from 'element-plus'

import 'element-plus/dist/index.css'

import App from './App.vue'
import { router } from './router'

createApp(App)
  .directive('loading', ElLoading.directive)
  .use(router)
  .mount('#app')
