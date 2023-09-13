<script>

import { opacityEffectsOn, opacityEffectsOff } from './InfoDetails.vue';
import { scrollWin } from '../components/AppFooter.vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            showFillMenu: false,
            inputValue1: '',
            inputValue2: '',
            refunds: [],
            currentRefund: null,
            isFillRefund: undefined,
            notCorrectFill: undefined,
            loading: undefined
        }
    },

    mounted() {
        this.loadRefunds()
    },
    
    computed: {
        isFillValue() {
            return this.inputValue1.length >= 50 && this.inputValue2.length >= 22
        },

        linkValue() {
            return this.inputValue2.length >= 22
        },

        ...mapGetters({
            getAccessToken: 'auth/getAccessToken'
        })
    },

    methods: {
        async showFill(evt, item) {
            evt.preventDefault()
            try {
                this.currentRefund = null
                this.showFillMenu = true
                opacityEffectsOn()

                let token = 'Bearer ' + this.getAccessToken

                let response = await axios.get('/refund', {
                    params: {
                        id: item._id
                    },

                    headers: {
                        Authorization: token
                    }
                })

                this.currentRefund = response.data
            } catch (error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            }
        },

        async refundFill(evt, item) {
            evt.preventDefault()

            this.isFillRefund = false
            this.notCorrectFill = false

            let filter = /([a-zA-Zа-яА-Я])\1{3}/

            if(/^[А-Яа-я\s,'-.!" "?]+$/.test(this.inputValue2) || !/^[А-Яа-я\s,'-.!" "?]+$/.test(this.inputValue1) || filter.test(this.inputValue1)) {
                this.notCorrectFill = true
            } else {
                try {
                    let token = 'Bearer ' + this.getAccessToken

                    await axios.post('/refund/fill', {
                        id: item._id,
                        albumLink: this.inputValue2,
                        text: this.inputValue1
                    }, {
                        headers: {
                            Authorization: token
                        }
                    })

                    this.isFillRefund = true

                    await new Promise(prom => setTimeout(prom, 1300))

                    this.closeFill()

                    this.inputValue1 = ''
                    this.inputValue2 = ''

                    this.loadRefunds()
                } catch (error) {
                    console.log('Ошибка при отправке запроса на сервер: ' + error);
                }
            }
        },

        closeFill() {
            this.showFillMenu = false
            opacityEffectsOff()
        },

        goRoute(evt, routeTo) {
            evt.preventDefault()
            this.$router.push({
                name: routeTo
            })
            scrollWin()
        },

        async loadRefunds() {
            try {
                this.loading = true
                let token = 'Bearer ' + this.getAccessToken

                let response = await axios.get('/refund/all', {
                    headers: {
                        Authorization: token
                    }
                })
                this.loading = false

                this.refunds = response.data
            } catch (error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            }
        },

        async returnMoney(item) {
            try {
                let token = 'Bearer ' + this.getAccessToken

                await axios.post('/refund/return/money', {
                    id: item._id
                }, {
                    headers: {
                        Authorization: token
                    }
                })

                this.loadRefunds()
            } catch (error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            }
        },

        getTime(date) {
            let day = dayjs(date)
            return day.format('DD.MM.YYYY')
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper" :class="{
            'opacity': showFillMenu
        }" >
            <spinner-loading v-if="loading" class="mt-4" style="overflow: hidden; display: flex; justify-content: center;"></spinner-loading>
            <h2 v-if="!loading"><b>Возвраты</b></h2>
            <div class="no-returns mt-4" v-if="refunds.length == 0 && !loading">
                <p><b>Здесь будут ваши возвраты</b></p>
                <p>В разделе покупки у каждого товара можно<br> создать заявку на его возврат</p>
                <button @click="goRoute($event, 'orders')" >Перейти к покупкам</button>
            </div>
            <div class="return-container" v-if="refunds.length != 0">
                <div class="return" v-for="(item) in refunds" >
                    <h2><b>Заявка от {{ getTime(item.createdAt) }}</b></h2>
                    <div class="content">
                        <p><b>Номер возврата: {{ item.uniqueNumber }}</b></p>
                        <p v-if="item.text === '' && item.albumLink === ''" class="text-primary"><u>Для начала работ по вашей заявке заполните её</u></p>
                        <p v-if="item.text !== '' && item.albumLink !== ''  && item.status !== 'Отказан' && item.status !== 'Одобрен'" class="text-success"><u>Ожидайте изменений в статусе</u></p>
                        <p v-if="item.returnMoney" class="text-success"><u>Средства возвращены</u></p>
                        <button v-if="item.text === '' && item.albumLink === ''" class="btn btn-primary" @click="showFill($event, item)" >Заполнить заявку</button>
                        <button v-if="item.text !== '' && item.albumLink !== '' && item.status !== 'Отказан' && item.status !== 'Одобрен'" class="btn btn-success" disabled>Заявка заполнена</button>
                        <button @click="returnMoney(item)" v-if="item.status === 'Одобрен' && item.returnMoney == false" class="btn btn-primary text-white">Вернуть средства</button>
                        <button @click="goRoute($event, 'balance')" v-if="item.returnMoney == true" class="btn btn-primary text-white">Посмотреть баланс</button>
                    </div>
                    <div class="status">Статус возврата: <div class="alert" :class="{
                        'alert-warning': item.status === 'Ожидает подтверждения',
                        'alert-primary': item.status === 'В рассмотрении',
                        'alert-success': item.status === 'Одобрен',
                        'alert-danger': item.status === 'Отказан'
                    }">{{ item.status }}</div></div>
                </div>
            </div>
        </div>
        <div class="write-return" v-if="showFillMenu" style="opacity: 1!important; z-index: 999;">
            <i class="fa fa-times" @click="closeFill" ></i>
            <form class="content form-fill" v-if="currentRefund" @submit="refundFill($event, currentRefund)" >
                <div class="product">
                    <div class="info">
                        <img :src="currentRefund.product_id.picture" width="150" alt="">
                        <div class="prod-title">
                            <p><b>{{ currentRefund.product_id.brand_id.brandName }} / {{ currentRefund.product_id.title }}</b></p>
                            <p>Артикул: <b>{{ currentRefund.product_id.article }}</b></p>
                            <p class="price">Цена: <b><span>{{ currentRefund.product_id.price }}</span><i class="fa fa-rub"></i></b></p>
                        </div>
                    </div>
                    <div class="load">
                        <span><h2><b>Шаг 1:</b></h2>Создайте альбом на сайте Imgur (регистрироваться не нужно) и загрузите до 10 изображений</span><br>
                        <a href="https://imgur.com/upload" target="_blank">Ссылка на Imgur</a>
                    </div>
                    <div class="next">
                        <p class="mt-3"><h2><b>Шаг 2:</b></h2>Вставьте ниже ссылку на альбом с фотографиями</p>
                        <input v-model="inputValue2" type="text" class="form-control" placeholder="Ссылка на альбом">
                        <span class="text-danger" v-if="!linkValue">Вставьте корректную ссылку</span>
                    </div>
                    <div class="text">
                        <p><h2><b>Шаг 3:</b></h2></p>
                        <div class="textarea-options">
                            <p>Опишите причину(ы) возврата</p>
                            <span>{{ this.inputValue1.length }} / 250</span>
                        </div>
                        <textarea v-model="inputValue1" maxlength="250"></textarea>
                    </div>
                </div>
                <button class="btn mb-2" :disabled="!isFillValue" :class="{
                    'opacity': !isFillValue
                }" >Отправить</button>
            </form>
            <div v-if="isFillRefund" class="mt-3 alert alert-success w-100 text-center">Заявка успешно заполнена</div>
            <div v-if="notCorrectFill" class="mt-3 alert alert-danger w-100 text-center">Ошибка в заполнении заявки</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/return.scss';

</style>