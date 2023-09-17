<script>

import axios from 'axios'
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            refunds: [],
            isClickChange: false,
            isClickAccept: false,
            isClickReject: false,
            loading: undefined
        }
    },

    mounted() {
        this.loadRefunds()
    },

    computed: {
        ...mapGetters({
            getTokenSeller: 'auth/getTokenSeller'
        })
    },

    methods: {
        async loadRefunds() {
            try {
                this.loading = true
                let token = 'Bearer ' + this.getTokenSeller

                let response = await axios.get('/seller/refunds/all', {
                    headers: {
                        Authorization: token
                    }
                })
                this.loading = false
                
                this.refunds = response.data
            } catch(error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            } finally {
                this.isClickChange = false
            }
        },

        async statusForward(item) {
            try {
                this.isClickChange = false
                this.isClickChange = true
                let token = 'Bearer ' + this.getTokenSeller
            
                await axios.post('/seller/refund/change', {
                    status: item.status,
                    id: item._id
                }, {
                    headers: {
                        Authorization: token
                    }
                })

                this.loadRefunds()
            } catch(error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            }
        },

        async statusReject(item, status) {
            try {
                this.isClickReject = false
                this.isClickReject = true
                let token = 'Bearer ' + this.getTokenSeller
            
                await axios.post('/seller/refund/change', {
                    status: status,
                    id: item._id
                }, {
                    headers: {
                        Authorization: token
                    }
                })

                this.loadRefunds()
            } catch(error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            } finally {
                this.isClickReject = false
            }
        },

        async statusAccept(item, status) {
            try {
                this.isClickAccept = false
                this.isClickAccept = true
                let token = 'Bearer ' + this.getTokenSeller
            
                await axios.post('/seller/refund/change', {
                    status: status,
                    id: item._id
                }, {
                    headers: {
                        Authorization: token
                    }
                })

                this.loadRefunds()
            } catch(error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            } finally {
                this.isClickAccept = false
            }
        },

        getTime(data) {
            let day = dayjs(data)
            return day.format('DD.MM.YYYY')
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <h2 v-if="!loading"><b>Заявки на возврат ваших товаров</b></h2>
            <h5 class="mt-4" v-if="refunds.length == 0 && !loading">Заявок на возврат товаров вашего бренда нет</h5>
            <spinner-loading v-if="loading" style="overflow: hidden; display: flex; align-self: center;"></spinner-loading>
            <div class="container-orders" v-if="refunds.length != 0">
                <div class="sell-order" v-for="(item) in refunds">
                    <div class="left-side-sell">
                        <h2>Дата создания заявки: <b>{{ getTime(item.createdAt) }}</b></h2>
                        <p>Номер возврата: <b>45453713912</b></p>
                        <p>Пользователь: <b>{{ item.author_id.name }}</b></p>
                        <p class="name">Название товара: <b>{{ item.product_id.title }}</b></p>
                        <p>Артикул товара: <b>{{ item.product_id.article }}</b></p>
                        <p>Цена: <b class="price">{{ item.product_id.price }} <i class="fa fa-rub"></i></b></p>
                        <p>Ссылка на альбом с изображениями: <a :href="item.albumLink" target="_blank">{{ item.albumLink }}</a></p>
                    </div>
                    <div class="textarea">
                        <p>Описание возврата: <textarea class="text" maxlength="250" disabled>{{ item.text }}</textarea></p>
                    </div>
                    <div class="right-side-sell">
                        <h2>Статус:</h2>
                        <div class="alert" :class="{
                        'alert-info': item.status === 'Ожидает подтверждения',
                        'alert-primary': item.status === 'В рассмотрении',
                        'alert-success': item.status === 'Одобрен',
                        'alert-danger': item.status === 'Отказан'
                    }">{{ item.status }}</div>
                        <div class="change-status" v-if="item.status !== 'Одобрен' && item.status !== 'Отказан'">
                            <p>Изменить состояние</p>
                            <div class="status">
                                <button :disabled="isClickChange" v-if="item.status !== 'В рассмотрении'" class="next" @click="statusForward(item)">Изменить статус<i class="fa fa-arrow-right"></i></button>
                                <button :disabled="isClickReject" v-if="item.status === 'В рассмотрении'" class="btn btn-danger" @click="statusReject(item, 'Отказан')">Отказать</button>
                                <button :disabled="isClickAccept" v-if="item.status === 'В рассмотрении'" class="btn btn-success" @click="statusAccept(item, 'Одобрен')">Одобрить</button>
                            </div>
                        </div>
                        <p class="text-center" v-if="item.status === 'Одобрен' && item.returnMoney == false"><u>Когда пользователь<br> выберет возврат средств у<br> данного возврата, деньги<br> с вашего баланса спишутся</u></p>
                        <p class="text-center" v-if="item.status === 'Одобрен' && item.returnMoney == true"><u class="text-primary">Деньги возвращены<br> покупателю</u></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/sellrefund.scss';

</style>