import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'
import { initializeSampleData } from '../src/data/sampleData'

// Gọi hàm này khi ứng dụng khởi động
initializeSampleData()
const pinia = createPinia()
const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')