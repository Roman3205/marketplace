import axios from 'axios'

const backend_host = import.meta.env.VITE_BACKEND_HOST
const backend_port = import.meta.env.VITE_BACKEND_PORT

axios.defaults.baseURL = 'http://' + backend_host + ':' + backend_port

// jwt in cookies
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

const app = createApp(App)

app
    .use(router)
    .use(store)
    .mount('#app')