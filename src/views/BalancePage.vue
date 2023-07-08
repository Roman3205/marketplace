<script>

const opacityEffectsOn = () => {
    document.documentElement.style.overflowY = 'hidden'
    document.querySelector('.header').style.pointerEvents = 'none'
    document.querySelector('.footer').style.pointerEvents = 'none'
    document.querySelector('.header').classList.add('changemenu-opacity')
    document.querySelector('.footer').classList.add('changemenu-opacity')
    document.querySelector('.inden-scroll').style.pointerEvents = 'none'
    document.querySelector('.inden-scroll').style.opacity = '0.4'
}

const opacityEffectsOff = () => {
    document.documentElement.style.overflowY = 'scroll'
    document.querySelector('.header').style.pointerEvents = 'all'
    document.querySelector('.footer').style.pointerEvents = 'all'
    document.querySelector('.header').classList.remove('changemenu-opacity')
    document.querySelector('.footer').classList.remove('changemenu-opacity')
    document.querySelector('.inden-scroll').style.pointerEvents = 'all'
    document.querySelector('.inden-scroll').style.opacity = '1'
}

const scrollMenu = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

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
            scrollMenu()
            opacityEffectsOn()
        },

        closeDon(evt) {
            evt.preventDefault()
            this.showDonateBar = false
            scrollMenu()
            opacityEffectsOff()
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
                    <button class="btn" @click="showDon" :disabled="showDonateBar" >Пополнить</button>
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
                    <div class="alert alert-success"><span class="no-wrap">07.07.2023</span><span>Баланс пополнен на 500р</span></div>
                    <div class="alert alert-danger"><span class="no-wrap">07.07.2023</span><span>С баланса списано 450р по покупке</span></div>
                    <div class="alert alert-danger"><span class="no-wrap">07.07.2023</span><span>С баланса списано 280р по покупке</span></div>
                    <div class="alert alert-success"><span class="no-wrap">06.07.2023</span><span>Баланс пополнен на 140р</span></div>
                    <div class="alert alert-success"><span class="no-wrap">04.07.2023</span><span>Баланс пополнен на 650р</span></div>
                    <div class="alert alert-danger"><span class="no-wrap">03.07.2023</span><span>С баланса списано 350р по покупке</span></div>
                    <div class="alert alert-success"><span class="no-wrap">01.07.2023</span><span>Баланс пополнен на 220р</span></div>
                    <div class="alert alert-success"><span class="no-wrap">29.06.2023</span><span>Баланс пополнен на 450р</span></div>
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