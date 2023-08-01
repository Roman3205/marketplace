<script>

import { scrollWin } from '../components/AppFooter.vue'
import { opacityEffectsOn, opacityEffectsOff } from './InfoDetails.vue'
import axios from 'axios'
import dayjs from 'dayjs'

export default {
    data() {
        return {
            showChangeMenu: false,
            products: [],
            userInfo: null,
            cartInfo: null,
            currentDate: new Date(),
            successCreate: undefined,
            notEnoughMoney: undefined,
            notificationTrue: undefined,
            runOutProd: undefined,
            titleRunOut: null
        }
    },

    mounted() {
        this.loadCart()
    },

    methods: {
        goRoute(evt, routeTo) {
            evt.preventDefault()
            this.$router.push({
                name: routeTo
            })
            scrollWin()
        },

        changeWay(evt) {
            evt.preventDefault()
            this.showChangeMenu = true
            opacityEffectsOn()
        },

        closeChange(evt) {
            evt.preventDefault()
            this.showChangeMenu = false
            opacityEffectsOff()
        },

        async loadCart() {
            let token = 'Bearer ' + localStorage.getItem('token')

            let response = await axios.get('/cart', {
                headers: {
                    Authorization: token
                }
            })

            this.userInfo = response.data.customer
            this.cartInfo = response.data.cart
            this.products = response.data.cart.products
        },

        async removeFromCart(evt, item) {
            evt.stopPropagation()
            evt.preventDefault()
            this.notificationTrue = false

            let token = 'Bearer ' + localStorage.getItem('token')
            await axios.post('/cart/remove', {
                article: item.article
            }, {
                headers: {
                    Authorization: token
                }
            })

            this.notificationTrue = true

            await new Promise(prom => setTimeout(prom, 1000))

            this.loadCart()
        },

        getRandomDateDelivery() {
            let min = 5
            let max = 7
            return Math.floor(Math.random() * (max - min) + min)
        },

        getDeliver(date) {
            let day = dayjs(date)
            let deliveryDate = day.add(this.getRandomDateDelivery(), 'day')
            return deliveryDate.format('D MMMM')
        },

        goProduct(evt, item) {
            evt.preventDefault()
            this.$router.push({
                name: 'product',
                params: {
                    article: item.article
                }
            })
            scrollWin()
        },

        async createOrders(evt) {
            evt.preventDefault()

            this.successCreate = false
            this.notEnoughMoney = false
            this.runOutProd = false

            try {
                let token = 'Bearer ' + localStorage.getItem('token')
                await axios.post('/order/create', {
                    products: this.products
                }, {
                    headers: {
                        Authorization: token
                    }
                })

                this.successCreate = true

                await new Promise(prom => setTimeout(prom, 2000))

                this.loadCart()

                await new Promise(prom => setTimeout(prom, 1000))

                this.$router.push({
                    name: 'delivery'
                })

            } catch (error) {
                if(error.response && error.response.status === 409) {
                    this.notEnoughMoney = true
                } else if(error.response && error.response.status === 400) {
                    this.runOutProd = true
                    this.titleRunOut = error.response.data.data.map(product => (
                        'Товар ' + "'" + product.title + "'" + ' в вашей корзине закончился'
                    )).join(', ')
                }
            }
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="notification" v-if="notificationTrue">
            <div class="alert alert-info w-100 text-center">Товар успешно удален из корзины</div>
        </div>
        <div class="notification" v-if="runOutProd">
            <div v-if="titleRunOut" class="alert alert-info w-100 text-center">{{ titleRunOut }}</div>
        </div>
        <div v-if="products.length === 0" class="wrapper-no-content">
            <h2><b>В корзине пока пусто</b></h2>
            <p>Загляните на главную, чтобы выбрать товары или найдите нужное в поиске</p>
            <button class="no-content-button" @click="goRoute($event, 'main')" >Перейти на главную</button>
        </div>
        <div v-if="products.length !== 0" class="wrapper" :class="{
            'opacity': showChangeMenu
        }">
            <h2><b>Корзина</b></h2>
            <div class="wrapper-mod">
                <div class="product-container">
                    <div class="product" v-for="(item) in products" @click="goProduct($event, item)" >
                        <img :src="item.picture" width="150" alt="">
                        <div class="main-content">
                            <div class="user">
                                <span class="number-rev"><span>Артикул товара:</span><h5><b>{{ item.article }}</b></h5></span>
                                <b class="mt-2">{{ item.brand_id.brandName }} / {{ item.title }}</b>
                                <p class="pt-lg-4">Доставка со склада продавца</p>
                            </div>
                            <div class="action-menu">
                                <button class="btn btn-danger" :disabled="showChangeMenu" @click="removeFromCart($event, item)" >Удалить<i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="oplata-menu">
                    <div class="oplata">
                        <div class="content">
                            <span><b>Доставка в пункт выдачи</b></span><span><u>{{ getDeliver(currentDate) }}</u> <span>(дата доставки может измениться)</span></span>
                            <div class="active-menu mt-4">
                                <p>Товары, {{ products.length }} шт</p>
                                <div class="money"><span>{{ cartInfo.totalCost }}</span><i class="fa fa-rub"></i></div>
                            </div>
                            <div class="active-menu">
                                <h2><b>Итого</b></h2>
                                <div class="money"><h2><b>{{ cartInfo.totalCost }}</b></h2><h2><b><i class="fa fa-rub"></i></b></h2></div>
                            </div>
                            <button class="btn" :disabled="showChangeMenu" @click="createOrders" >Заказать</button>
                            <div v-if="successCreate" class="alert w-100 mt-2 text-center alert-success">Заказ прошел успешно и оплачен</div>
                            <div v-if="notEnoughMoney" class="alert w-100 mt-2 text-center alert-danger">У вас недостаточно средств для оплаты</div>
                            <div class="check">
                                <i class="fa fa-check"></i> <p>Соглашаюсь с <b @click="goRoute($event, 'pravilapol')">правилами пользования<br> торговой площадкой</b> и <b @click="goRoute($event, 'vozvrat')">возврата</b></p>
                            </div>
                        </div>
                    </div>
                    <div class="data-user">
                        <div class="content">
                            <div class="left-side">
                                <h2><b>Способы оплаты</b></h2>
                                <div class="way">
                                    <img src="../../images/picbalance.png" width="20" alt=""><p>Оплата балансом</p>
                                </div>
                            </div>
                            <div class="right-side">
                                <i class="fa fa-pencil" @click="changeWay"></i>
                            </div>
                        </div>
                    </div>
                    <div class="data-user">
                        <div class="content">
                            <div class="left-side">
                                <h2 @click="goRoute($event, 'details')"><b>Мои данные</b></h2>
                                <div class="way">
                                    <img :src="'../../images/' + userInfo.profilePicture" width="25" alt=""><p>{{ userInfo.name }}</p>
                                </div>
                            </div>
                            <div class="right-side">
                                <i class="fa fa-pencil" @click="goRoute($event, 'details')"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="changename" v-if="showChangeMenu">
            <i class="fa fa-times" @click="closeChange" ></i>
            <div class="content">
                <h2><b>Способ оплаты</b></h2>
                <div class="bal">Баланс Marketplace</div>
                <button class="btn" @click="closeChange" >Выбрать</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/cart.scss';

</style>