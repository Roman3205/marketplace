<script>

import axios from 'axios'
import { scrollWin } from './AppFooter.vue'

export default {
    data() {
        return {
            isOpenMenu: false,
            userInfo: null,
            products: [],
            searchInput: '',
            categoryFilterProducts: []
        }
    },

    mounted() {
        this.getUser();
    },

    watch: {
        searchInput: {
            handler: 'searchProducts',
            immediate: true
        }
    },

    methods: {
        goRoute(evt, routeTo) {
            evt.preventDefault()
            this.$router.push({
                name: routeTo
            })
            scrollWin()
        },

        openMenu(evt) {
            evt.preventDefault()
            this.isOpenMenu = true
            document.documentElement.querySelector('.appear-menu').classList.add('open-menu')
            document.documentElement.querySelector('.content-app').style.opacity = '0.4'
            document.documentElement.querySelector('.content-app').style.pointerEvents = 'none'
            document.documentElement.style.overflowY = 'hidden'
            document.querySelector('.header').style.pointerEvents = 'none'
            scrollWin()
        },

        closeMenu(evt) {
            evt.preventDefault()
            this.isOpenMenu = false
            document.documentElement.querySelector('.appear-menu').classList.remove('open-menu')
            document.documentElement.querySelector('.content-app').style.opacity = '1'
            document.documentElement.querySelector('.content-app').style.pointerEvents = 'all'
            document.documentElement.style.overflowY = 'scroll'
            document.querySelector('.header').style.pointerEvents = 'all'
            scrollWin()
        },

        async getUser() {
            let token = 'Bearer ' + localStorage.getItem('token');
            let response = await axios.get('/main', {
                headers: {
                    Authorization: token
                }
            })
            this.userInfo = response.data
        },

        async searchProducts() {
            let response = await axios.get('/products/all')
            let products = response.data
            let regex = new RegExp(this.searchInput, 'i')
            this.products = products.filter((product) => regex.test(product.title))
            console.log(this.products)
        },

        async categoryFilter(evt, category) {
            evt.preventDefault()

            let response = await axios.get('/products/all')
            let products = response.data

            this.categoryFilterProducts = products.filter((product) => product.category === category)
            console.log(this.categoryFilterProducts);
        }
    }
}

</script>
<template>
    <div class="appear-menu">
        <div class="categories">
            <div class="category-item" @click="categoryFilter($event, 'Верхняя одежда')">Верхняя одежда</div>
            <div class="category-item" @click="categoryFilter($event, 'Обувь')">Обувь</div>
            <div class="category-item" @click="categoryFilter($event, 'Товары для дома')">Товары для дома</div>
            <div class="category-item" @click="categoryFilter($event, 'Аксессуары')">Аксессуары</div>
            <div class="category-item" @click="categoryFilter($event, 'Электроника')">Электроника</div>
            <div class="category-item" @click="categoryFilter($event, 'Игрушки')">Игрушки</div>
            <div class="category-item" @click="categoryFilter($event, 'Мебель')">Мебель</div>
            <div class="category-item" @click="categoryFilter($event, 'Продукты')">Продукты</div>
            <div class="category-item" @click="categoryFilter($event, 'Бытовая техника')">Бытовая техника</div>
            <div class="category-item" @click="categoryFilter($event, 'Зоотовары')">Зоотовары</div>
            <div class="category-item" @click="categoryFilter($event, 'Спорт')">Спорт</div>
            <div class="category-item" @click="categoryFilter($event, 'Автотовары')">Автотовары</div>
            <div class="category-item" @click="categoryFilter($event, 'Школа')">Школа</div>
            <div class="category-item" @click="categoryFilter($event, 'Книги')">Книги</div>
            <div class="category-item" @click="categoryFilter($event, 'Ювелирные изделия')">Ювелирные изделия</div>
            <div class="category-item" @click="categoryFilter($event, 'Здоровье')">Здоровье</div>
            <div class="category-item" @click="categoryFilter($event, 'Сад и дача')">Сад и дача</div>
        </div>
        <i class="fa fa-times" @click="closeMenu" ></i>
    </div>
    <div class="container" :class="{
        'opacity': isOpenMenu
    }" >
        <div class="container__header header-top">
            <div class="header__money">
                <i class="fa fa-rub"></i><span>RUB</span>
            </div>
            <button @click="goRoute($event, 'sellLogin')" class="header__button btn btn-primary text-white">Стать продавцом</button>
        </div>
        <div class="container__header header-bottom">
            <div class="header__menu">
                <i class="fa fa-bars" @click="openMenu" ></i>
                <h1 @click="goRoute($event, 'main')" >MARKETPLACE</h1>
            </div>
            <div class="header__search">
                <input type="text" v-model="searchInput" placeholder="Я ищу..." id="search" class="form-control">
                <label for="search"><i class="fa fa-search"></i></label>
            </div>
            <div class="header__box box">
                <div v-if="!userInfo" class="box__user" @click="goRoute($event, 'login')" >
                    <i class="fa fa-user-o"></i>
                    <span>Войти</span>
                </div>
                <div v-if="userInfo" class="box__user" @click="goRoute($event, 'lk')" >
                    <i class="fa fa-user-o"></i>
                    <span>{{ userInfo.name }}</span>
                </div>
                <div v-if="!userInfo" class="header__cart" @click="goRoute($event, 'login')" >
                    <i class="fa fa-shopping-cart"></i>
                    <span>Корзина</span>
                </div>
                <div v-if="userInfo" class="header__cart" @click="goRoute($event, 'cart')" >
                    <i class="fa fa-shopping-cart"></i>
                    <span>Корзина</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/header.scss';

</style>