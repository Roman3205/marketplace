<script>

import { scrollWin } from './AppFooter.vue'

export default {
    data() {
        return {
            isOpenMenu: false
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
        }
    }
}

</script>
<template>
    <div class="appear-menu">
        <div class="categories">
            <div class="category-item">Мужская верхняя одежда</div>
            <div class="category-item">Женская верхняя одежда</div>
            <div class="category-item">Мужская обувь</div>
            <div class="category-item">Женская обувь</div>
            <div class="category-item">Товары для дома</div>
            <div class="category-item">Аксессуары</div>
            <div class="category-item">Электроника</div>
            <div class="category-item">Игрушки</div>
            <div class="category-item">Мебель</div>
            <div class="category-item">Продукты</div>
            <div class="category-item">Бытовая техника</div>
            <div class="category-item">Зоотовары</div>
            <div class="category-item">Спорт</div>
            <div class="category-item">Автотовары</div>
            <div class="category-item">Школа</div>
            <div class="category-item">Книги</div>
            <div class="category-item">Ювелирные изделия</div>
            <div class="category-item">Здоровье</div>
            <div class="category-item">Сад и дача</div>
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
                <input type="text" placeholder="Я ищу..." id="search" class="form-control">
                <label for="search"><i class="fa fa-search"></i></label>
            </div>
            <div class="header__box box">
                <div class="box__user" @click="goRoute($event, 'login')" >
                    <i class="fa fa-user-o"></i>
                    <span>Войти</span>
                </div>
                <div class="header__cart" @click="goRoute($event, 'cart')" >
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