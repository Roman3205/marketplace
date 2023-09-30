import axios from 'axios'

const backend_host = import.meta.env.VITE_BACKEND_HOST
// const backend_port = import.meta.env.VITE_BACKEND_PORT

// axios.defaults.baseURL = 'https://' + backend_host + ':' + backend_port
axios.defaults.baseURL = 'https://' + String(backend_host)

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