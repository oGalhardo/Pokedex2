import './assets/main.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import { apolloProvider } from './modules/query'
const pinia = createPinia()
const app = createApp(App).use(Quasar, quasarUserOptions)
app.use(apolloProvider)

app.use(pinia)

app.mount('#app')
