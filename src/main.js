import axios from 'axios'

// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_HOST
// axios.defaults.baseURL = 'https://server-marketplace.onrender.com'
axios.defaults.baseURL = 'http://localhost:3333'

// jwt in cookies from server
// axios.defaults.withCredentials = true

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('ru')
dayjs.extend(relativeTime)

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import cookies from 'vue-cookies'
import components from './components/UI/ui'
const app = createApp(App)

// cookie for installation on client
app.use(cookies, {
    expires: '1d', 
    path: '/', 
    domain: '', 
    secure: '', 
    sameSite: 'Lax'
})

components.forEach((component) => {
    app.component(component.name, component)
})

app
    .use(router)
    .use(store)
    .mount('#app')