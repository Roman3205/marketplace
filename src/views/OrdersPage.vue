<script>

import { scrollWin } from '../components/AppFooter.vue';
import dayjs from 'dayjs'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            purchases: [],
            searchInput: '',
            searchPurchases: [],
            notificationTrue: undefined,
            existChat: undefined,
            notificationRefundTrue: undefined,
            existRefund: undefined
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

    computed: {
        ...mapGetters({
            getAccessToken: 'auth/getAccessToken'
        })
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
            try {
                let token = 'Bearer ' + this.getAccessToken
                let response = await axios.get('/purchases', {
                    headers: {
                        Authorization: token
                    }
                })

                let purchases = response.data
                let regex = new RegExp(this.searchInput, 'i')
                this.searchPurchases = purchases.orders.filter((order) => regex.test(order.product_id.title) || regex.test(order.product_id.article))
            } catch (error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            }
        },

        async loadPurchases() {
            try {
                let token = 'Bearer ' + this.getAccessToken
                let response = await axios.get('/purchases', {
                    headers: {
                        Authorization: token
                    }
                })

                this.purchases = response.data
            } catch (error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            }
        },

        async createChat(evt, item) {
            evt.preventDefault()
            evt.stopPropagation()
            this.notificationTrue = false
            this.existChat = false

            try {
                let token = 'Bearer ' + this.getAccessToken
                
                await axios.post('/chat/create', {
                    id: item.product_id.brand_id
                }, {
                    headers: {
                        Authorization: token
                    }
                })

                this.notificationTrue = true

            } catch (error) {
                if(error.response && error.response.status === 409) {
                    this.existChat = true
                } else {
                    console.log('Ошибка при отправке запроса на сервер: ' + error);
                }
            }
        },

        async createRefund(evt, item) {
            evt.preventDefault()
            evt.stopPropagation()
            this.notificationRefundTrue = false
            this.existRefund = false

            try {
                let token = 'Bearer ' + this.getAccessToken

                await axios.post('/refund/create', {
                    productId: item.product_id._id,
                    sellerId: item.product_id.brand_id._id,
                    orderId: item._id
                }, {
                    headers: {
                        Authorization: token
                    }
                })

                this.notificationRefundTrue = true

            } catch (error) {
                if(error.response && error.response.status === 409) {
                    this.existRefund = true
                } else {
                    console.log('Ошибка при отправке запроса на сервер: ' + error);
                }
            }
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
        <div class="notification" v-if="existRefund">
            <div class="alert alert-danger w-100 text-center">Возврат на данный заказ уже создан</div>
        </div>
        <div class="notification" v-if="notificationRefundTrue">
            <div class="alert alert-success w-100 text-center">Возврат данного заказа создан</div>
        </div>
        <div class="notification" v-if="existChat">
            <div class="alert alert-danger w-100 text-center">Чат с продавцом данного товара уже создан</div>
        </div>
        <div class="notification" v-if="notificationTrue">
            <div class="alert alert-success w-100 text-center">Чат с продавцом создан</div>
        </div>
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
                        <div class="product" v-for="(item) in searchPurchases">
                            <div class="image-prod" @click="goProduct($event, item)" :style="'background: url(' + item.product_id.picture + ') no-repeat center center;'">
                            </div>
                            <div class="content-product">
                                <div class="rub">
                                    <h5><b>{{ item.product_id.price }}</b></h5><i class="fa fa-rub"></i>
                                </div>
                                <p><b>{{ item.product_id.brand_id.brandName }} /</b> {{ item.product_id.title }}</p>
                                <div class="active">
                                    <p>Заказан: {{ getTime(item.createdAt) }}</p>
                                    <p>Получен: {{ getTime(item.updatedAt) }}</p>
                                    <button class="create-chat hover" @click="createChat($event, item)" >Чат с продавцом</button>
                                    <button class="create-chat hover mt-4">Возврат</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content" v-if="!searchInput">
                    <div class="product" v-for="(item) in purchases.orders">
                        <div class="image-prod" @click="goProduct($event, item)" :style="'background: url(' + item.product_id.picture + ') no-repeat center center;'">
                        </div>
                        <div class="content-product">
                            <div class="rub">
                                <h5><b>{{ item.product_id.price }}</b></h5><i class="fa fa-rub"></i>
                            </div>
                            <p><b>{{ item.product_id.brand_id.brandName }} /</b> {{ item.product_id.title }}</p>
                            <div class="active">
                                <p>Заказан: {{ getTime(item.createdAt) }}</p>
                                <p>Получен: {{ getTime(item.updatedAt) }}</p>
                                <button class="create-chat hover" @click="createChat($event, item)" >Чат с продавцом</button>
                                <button class="create-chat hover mt-4" @click="createRefund($event, item)">Возврат</button>
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