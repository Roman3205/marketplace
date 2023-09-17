<script>

import axios from 'axios'
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            orders: [],
            isClickManage: false,
            loading: undefined
        }
    },

    mounted() {
        this.loadOrders()
    },
    
    computed: {
        ...mapGetters({
            getTokenSeller: 'auth/getTokenSeller'
        })
    },

    methods: {
        async loadOrders() {
            try {
                this.loading = true
                let token = 'Bearer ' + this.getTokenSeller
                let response = await axios.get('/seller/orders/all', {
                    headers: {
                        Authorization: token
                    }
                })
                this.loading = false
                this.orders = response.data
            } catch(error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            } finally {
                this.isClickManage = false
            }
        },

        getTime(date) {
            let day = dayjs(date)
            return day.format('D.MM в HH:mm')
        },

        async statusForward(item) {
            try {
                this.isClickManage = false
                this.isClickManage = true
                let token = 'Bearer ' + this.getTokenSeller
                await axios.post('/seller/order/change', {
                    status: item.status,
                    id: item._id
                }, {
                    headers: {
                        Authorization: token
                    }
                })

                this.loadOrders()
            } catch(error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            }
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <h2 v-if="!loading"><b>Заказы ваших товаров</b></h2>
            <spinner-loading v-if="loading" style="overflow: hidden; display: flex; align-self: center;"></spinner-loading>
            <h5 class="mt-4" v-if="orders.length == 0 && !loading" >Ваши товары еще никто не заказывал</h5>
            <div class="container-orders" v-if="orders.length != 0">
                <div class="sell-order" v-for="(item) in orders">
                    <div class="left-side-sell">
                        <h2>Дата заказа: <b>{{ getTime(item.createdAt) }}</b></h2>
                        <p>Покупатель: <b>{{ item.customer_id.name }}</b></p>
                        <p>Название товара: <b>{{ item.product_id.brand_id.brandName }} / {{ item.product_id.title }}</b></p>
                        <p>Артикул товара: <b>{{ item.product_id.article }}</b></p>
                    </div>
                    <div class="right-side-sell">
                        <h2>Статус:</h2>
                        <div v-if="item.status === 'Создан'" class="alert alert-danger">Ожидает подтверждения</div>
                        <div v-if="item.status !== 'Создан'" class="alert" :class="{
                            'alert-danger': item.status === 'Создан',
                            'alert-info': item.status === 'Отправлен на сборку' || item.status === 'Собран',
                            'alert-warning': item.status === 'Отсортирован', 
                            'alert-primary': item.status === 'Передан в доставку',
                            'alert-success': item.status === 'Готов к получению',
                            }">{{ item.status }}</div>
                        <div class="change-status" v-if="item.status !== 'Готов к получению'">
                            <p>Изменить состояние</p>
                            <div class="status">
                                <button :disabled="isClickManage" class="next" @click="statusForward(item)">Изменить статус<i class="fa fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/sellmanage.scss';

</style>