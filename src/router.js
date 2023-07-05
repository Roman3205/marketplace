import { createRouter, createWebHistory } from "vue-router";
import SignupPage from './views/SignupPage.vue'
import LoginPage from  './views/LoginPage.vue'
import MainPage from './views/MainPage.vue'

export default createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupPage
        },
        {
            path: '/',
            name: 'main',
            component: MainPage
        }
    ]
})