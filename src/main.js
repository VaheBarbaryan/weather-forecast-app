import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import { vue3Debounce } from 'vue-debounce'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(vue3Debounce)
app.directive("debounce", vue3Debounce({lock:true}))
app.mount('#app')
