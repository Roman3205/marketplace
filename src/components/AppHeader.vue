<script>

import axios from 'axios'
import { scrollWin } from './AppFooter.vue'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    data() {
        return {
            isOpenMenu: false,
            userInfo: null,
            searchInput: '',
            categoryFilterProducts: [],
            products: []
        }
    },

    created() {
        this.debouncedClickSearch = _.debounce(this.getProductsAll, 900)
    },

    unmounted() {
        this.debouncedClickSearch.cancel()
    },

    mounted() {
        this.getUser()
    },

    // watch: {
    //     searchInput: {
    //         handler: 'debouncedClickSearch'
    //     }
    // },

    computed: {
        ...mapState({
            categoriesArray: state => state.categoriesArray
        }),

        ...mapGetters({
            getAccessToken: 'auth/getAccessToken',
            getTokenSeller: 'auth/getTokenSeller'
        })
    },
    

    methods: {
        ...mapActions({
            searchProductsFunction: 'searchProductsFunction',
            saveInputValue: 'saveInputValue',
            setFilteredCategory: 'setFilteredCategory',
            getCategory: 'getCategory'
        }),

        goRoute(evt, routeTo) {
            if(routeTo === 'main') {
                this.searchProductsFunction([])
                this.saveInputValue('')
                this.setFilteredCategory([])
                this.getCategory('')
                evt.preventDefault()
                this.$router.push({
                    name: 'main'
                })
                scrollWin()
            } else {
                evt.preventDefault()
                this.$router.push({
                    name: routeTo
                })
                scrollWin()
            }
        },

        openMenu() {
            this.isOpenMenu = true
            const root = document.documentElement
            root.querySelector('.space-menu').classList.add('open-space')
            root.querySelector('.appear-menu').classList.add('open-menu')
            root.style.overflowY = 'hidden'
            scrollWin()
        },

        closeMenu() {
            this.isOpenMenu = false
            const root = document.documentElement
            root.querySelector('.space-menu').classList.remove('open-space')
            root.querySelector('.appear-menu').classList.remove('open-menu')
            root.style.overflowY = 'scroll'
            scrollWin()
        },

        async getUser() {
            if(this.getTokenSeller === null) {
                try {
                    let token = 'Bearer ' + this.getAccessToken
                    let response = await axios.get('/main', {
                        headers: {
                            Authorization: token
                        }
                    })
                    
                    this.userInfo = response.data
                } catch (error) {
                    return
                }
            }
        },

        async getProductsAll() {
            try {
                if(this.getTokenSeller === null && this.searchInput !== '') {
                   let response = await axios.get('/products/filter', {params: {value: this.searchInput}})
                    this.products = response.data

                    this.$router.push('/')
                    this.setFilteredCategory([])
                    this.getCategory('')
                    this.searchProductsFunction(this.products)
                    this.saveInputValue(this.searchInput)
                } else if (this.searchInput === '') {
                    this.searchProductsFunction([])
                    this.saveInputValue('')
                } else {
                    return
                }
            } catch (error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            }
        },

        async categoryFilter(evt, category) {
            evt.preventDefault()
            this.$router.push('/')
            this.searchInput = ''
            this.searchProductsFunction([])
            this.saveInputValue('')
            let response = await axios.get('/products/category', {params: {category: category}})
            this.categoryFilterProducts = response.data
            this.setFilteredCategory(this.categoryFilterProducts)
            this.getCategory(category)

            await new Promise(prom => setTimeout(prom, 100))

            this.closeMenu()
        }
    }
}
</script>
<template>
    <div class="space-menu" @click="closeMenu">
        <div class="appear-menu" @click.stop>
            <div class="categories">
                <div class="category-item" v-for="item in categoriesArray" @click="categoryFilter($event, item)">{{ item }}</div>
            </div>
            <i class="fa fa-times" @click="closeMenu" ></i>
        </div>
    </div>
    <div class="container" :class="{
        'opacity': isOpenMenu
    }" >
        <div class="container__header header-top">
            <div class="header__money">
                <i class="fa fa-rub"></i><span>RUB</span>
            </div>
            <button @click="goRoute($event, 'sellLogin')" class="header__button btn text-white">Стать продавцом</button>
        </div>
        <div class="container__header header-bottom">
            <div class="header__menu">
                <i class="fa fa-bars" @click="openMenu" ></i>
                <h1 @click="goRoute($event, 'main')" >GORZA</h1>
            </div>
            <div class="header__search">
                <input type="text" @input="this.debouncedClickSearch" v-model="searchInput" placeholder="Я ищу..." id="search" class="form-control">
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
                <div class="header__cart" @click="goRoute($event, 'cart')" >
                    <i class="fa fa-shopping-cart"></i>
                    <span>Корзина</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '@/assets/scss/header.scss';

</style>