<script>

import axios from 'axios'
import { opacityEffectsOff, opacityEffectsOn, scrollMenu } from './InfoDetails.vue'
import dayjs from 'dayjs'

export default {
    data() {
        return {
            showDonateBar: false,
            inputValue: '',
            userInfo: null,
            operations: [],
            successTopUp: undefined
        }
    },

    mounted() {
        this.getUser()
        this.getOperations()
    },

    computed: {
        emptyValue() {
            return this.inputValue !== ''
        }
    },

    methods: {
        showDon(evt) {
            evt.preventDefault()
            this.showDonateBar = true
            scrollMenu()
            opacityEffectsOn()
        },

        closeDon() {
            this.showDonateBar = false
            scrollMenu()
            opacityEffectsOff()
        },

        autoV(evt, value) {
            evt.preventDefault()
            this.inputValue = value
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

        async balanceTopUp(evt) {
            evt.preventDefault()
            this.successTopUp = false

            let token = 'Bearer ' + localStorage.getItem('token')
            await axios.post('/balance/topup', {
                money: this.inputValue
            }, {
                headers: {
                    Authorization: token
                }
            })

            this.successTopUp = true

            await new Promise(prom => setTimeout(prom, 1300))
            this.getUser()
            this.getOperations()
            this.inputValue = ''
            this.closeDon()
            this.successTopUp = false
        },

        async getOperations() {
            let token = 'Bearer ' + localStorage.getItem('token')
            let response = await axios.get('/balance/operations', {
                headers: {
                    Authorization: token
                }
            })

            this.operations = response.data
        },

        getTime(date) {
            let day = dayjs(date)
            return day.format('DD.MM.YYYY HH:mm')
        },

        operationValue(item) {
            if(item.name === 'replenishment') {
                return 'Баланс пополнен на ' + item.money + ' (пополнение)'
            } else if(item.name === 'withdrawals') {
                return 'С баланаса списано ' + item.money + ' (оплата заказа)'
            } else {
                return ''
            }
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper" :class="{
            'opacity': showDonateBar
        }">
            <div class="balance">
                <h2><b>Баланс</b></h2>
                <div class="balance-menu">
                    <div class="rub">
                        <p v-if="userInfo"><b>{{ userInfo.balance }}</b></p><i class="fa fa-rub"></i>
                    </div>
                    <button class="btn" @click="showDon" :disabled="showDonateBar" >Пополнить</button>
                    <p>Средства с баланса списываются автоматически при оплате покупок</p>
                </div>
            </div>
            <div class="history">
                <div class="no-history" v-if="operations.operations == 0">
                    <p>Операций по балансу пока нет</p>
                    <p>После совершения первой операции, покажем ее здесь</p>
                </div>
                <div class="transactions" v-if="operations.operations != 0">
                    <div class="alert"><span><h2><b>Дата</b></h2></span><span><h2><b>Операция</b></h2></span></div>
                    <div v-for="(item) in operations.operations" class="alert" :class="{
                        'alert-success': item.name === 'replenishment',
                        'alert-danger': item.name === 'withdrawals'
                    }"><span class="no-wrap">{{ getTime(item.createdAt) }}</span><span>{{ operationValue(item) }}</span></div>
                </div>
            </div>
        </div>
        <div class="donate-balance" v-if="showDonateBar">
            <i class="fa fa-times" @click="closeDon" ></i>
            <form class="content" @submit="balanceTopUp" >
                <h2><b>Пополнение баланса</b></h2>
                <div class="inp-balance">
                    <span>Сумма</span>
                    <input v-model="inputValue" type="number" min="5" max="25000" class="form-control summ">
                    <div class="auto-don">
                        <span @click="autoV($event, 100)">100 Р</span><span @click="autoV($event, 500)">500 Р</span><span @click="autoV($event, 1000)">1000 Р</span>
                    </div>
                </div>
                <button class="btn" :disabled="!emptyValue" :class="{
            'opacity': !emptyValue
        }" >Оплатить</button>
            </form>
            <div v-if="successTopUp" class="alert mt-1 alert-success w-100 text-center">Баланс успешно пополнен</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/balance.scss';

</style>