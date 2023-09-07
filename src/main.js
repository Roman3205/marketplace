import axios from 'axios'
// заменить переменными окружения
axios.defaults.baseURL = 'http://' + 'localhost' + ':' + 3333
axios.defaults.withCredentials = true

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.locale('ru')
dayjs.extend(relativeTime)

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

let app = createApp(App)

app
    .use(router)
    .use(store)
    .mount('#app')