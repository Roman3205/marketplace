<script>
export default {
    data() {
        return {
            showDonateBar: false,
            inputValue: ''
        }
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
            document.documentElement.style.overflowY = 'hidden'
        },

        closeDon(evt) {
            evt.preventDefault()
            this.showDonateBar = false
            document.documentElement.style.overflowY = 'scroll';
        },

        autoV(evt, value) {
            evt.preventDefault()
            this.inputValue = value
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
                        <p><b>0</b></p><i class="fa fa-rub"></i>
                    </div>
                    <button class="btn" @click="showDon" >Пополнить</button>
                    <p>Средства с баланса списываются автоматически при оплате покупок</p>
                </div>
            </div>
            <div class="history">
                <!-- <div class="no-history">
                    <p>Операций по балансу пока нет</p>
                    <p>После совершения первой операции, покажем ее здесь</p>
                </div> -->
                <div class="transactions">
                    <div class="alert"><span><h2><b>Дата</b></h2></span><span><h2><b>Операция</b></h2></span></div>
                    <div class="alert alert-success"><span>07.07.2023</span><span>Баланс пополнен на 500р</span></div>
                    <div class="alert alert-danger"><span>07.07.2023</span><span>С баланса списано 450р по покупке</span></div>
                    <div class="alert alert-danger"><span>07.07.2023</span><span>С баланса списано 280р по покупке</span></div>
                    <div class="alert alert-success"><span>06.07.2023</span><span>Баланс пополнен на 140р</span></div>
                    <div class="alert alert-success"><span>04.07.2023</span><span>Баланс пополнен на 650р</span></div>
                    <div class="alert alert-danger"><span>03.07.2023</span><span>С баланса списано 350р по покупке</span></div>
                    <div class="alert alert-success"><span>01.07.2023</span><span>Баланс пополнен на 220р</span></div>
                    <div class="alert alert-success"><span>29.06.2023</span><span>Баланс пополнен на 450р</span></div>
                </div>
            </div>
        </div>
        <div class="donate-balance" v-if="showDonateBar">
            <i class="fa fa-times" @click="closeDon" ></i>
            <div class="content">
                <h2><b>Пополнение баланса</b></h2>
                <div class="inp-balance">
                    <span>Сумма</span>
                    <input v-model="inputValue" type="text" class="form-control summ">
                    <div class="auto-don">
                        <span @click="autoV($event, 100)">100 Р</span><span @click="autoV($event, 500)">500 Р</span><span @click="autoV($event, 1000)">1000 Р</span>
                    </div>
                </div>
                <button class="btn" :disabled="!emptyValue" :class="{
            'opacity': !emptyValue
        }" >Оплатить</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/balance.scss';

</style>