<script>

import { scrollWin } from '../components/AppFooter.vue';
import dayjs from 'dayjs'
import axios from 'axios'

export default {
    data() {
        return {
            purchases: [],
            searchInput: '',
            searchPurchases: []
        }
    },

    watch: {
        searchInput: {
            handler: 'getSearchPurchases'
        }
    },

    mounted() {
        this.loadPurchases()
    },

    methods: {
        goRoute(evt, routeTo) {
            evt.preventDefault()
            this.$router.push({
                name: routeTo
            })
            scrollWin()
        },

        async getSearchPurchases() {
            let token = 'Bearer ' + localStorage.getItem('token')
            let response = await axios.get('/purchases', {
                headers: {
                    Authorization: token
                }
            })

            let purchases = response.data
            let regex = new RegExp(this.searchInput, 'i')
            this.searchPurchases = purchases.orders.filter((order) => regex.test(order.product_id.title) || regex.test(order.product_id.article))
            console.log(this.searchPurchases);
        },

        async loadPurchases() {
            let token = 'Bearer ' + localStorage.getItem('token')
            let response = await axios.get('/purchases', {
                headers: {
                    Authorization: token
                }
            })

            this.purchases = response.data
        },

        goProduct(evt, item) {
            evt.preventDefault()
            this.$router.push({
                name: 'product',
                params: {
                    article: item.product_id.article
                }
            })
            scrollWin()
        },

        getTime(date) {
            let day = dayjs(date)
            return day.format('D MMMM')
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <h2><b>Покупки</b></h2>
            <div class="orders">
                <div class="input-search">
                    <input type="text" v-model="searchInput" class="form-control mb-5" placeholder="Название или артикул"><i class="fa fa-search"></i>
                </div>
                <div class="results" v-if="searchInput && searchPurchases.length == 0">
                    <h2 class="ms-5"><b>Результаты поиска</b></h2>
                    <p class="ms-5 mt-5">Ничего не найдено</p>
                </div>
                <div class="results" v-if="searchInput && searchPurchases.length != 0">
                    <h2 class="ms-5"><b>Результаты поиска</b></h2>
                    <div class="content mt-4">
                        <div class="product" v-for="(item) in searchPurchases" @click="goProduct($event, item)" >
                            <div class="image-prod" :style="'background: url(' + item.product_id.picture + ') no-repeat center center;'">
                            </div>
                            <div class="content-product">
                                <div class="rub">
                                    <h5><b>{{ item.product_id.price }}</b></h5><i class="fa fa-rub"></i>
                                </div>
                                <p><b>{{ item.product_id.brand_id.brandName }} /</b> {{ item.product_id.title }}</p>
                                <div class="active">
                                    <p>Заказан: {{ getTime(item.createdAt) }}</p>
                                    <p>Получен: {{ getTime(item.updatedAt) }}</p>
                                    <!-- <button class="create-chat hover">Создать чат с продавцом</button>
                                    <button class="create-chat hover mt-4">Оформить возврат</button> -->
                                    <button class="create-chat" disabled style="pointer-events: none;">Чат создан</button>
                                    <button class="create-chat mt-4" disabled style="pointer-events: none;">Возврат создан</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content" v-if="!searchInput">
                    <div class="product" v-for="(item) in purchases.orders" @click="goProduct($event, item)" >
                        <div class="image-prod" :style="'background: url(' + item.product_id.picture + ') no-repeat center center;'">
                        </div>
                        <div class="content-product">
                            <div class="rub">
                                <h5><b>{{ item.product_id.price }}</b></h5><i class="fa fa-rub"></i>
                            </div>
                            <p><b>{{ item.product_id.brand_id.brandName }} /</b> {{ item.product_id.title }}</p>
                            <div class="active">
                                <p>Заказан: {{ getTime(item.createdAt) }}</p>
                                <p>Получен: {{ getTime(item.updatedAt) }}</p>
                                <!-- <button class="create-chat hover">Создать чат с продавцом</button>
                                <button class="create-chat hover mt-4">Оформить возврат</button> -->
                                <button class="create-chat" disabled style="pointer-events: none;">Чат создан</button>
                                <button class="create-chat mt-4" disabled style="pointer-events: none;">Возврат создан</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="no-orders" v-if="purchases.orders == 0">
                <p><b>Здесь будут ваши покупки</b></p>
                <p>На данный момент вы ничего не покупали</p>
                <button @click="goRoute($event, 'main')">На главную</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/orders.scss';

</style>