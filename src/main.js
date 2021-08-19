import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import installElementPlus from './plugins/element'
import './assets/fonts/iconfont.css'





const app = createApp(App)
installElementPlus(app)
app.use(router)
.mount('#app')

