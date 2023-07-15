<script>

import { scrollWin } from '../components/AppFooter.vue'

export default {
    methods: {
        goRoute(evt, routeTo) {
            evt.preventDefault()
            this.$router.push({
                name: routeTo
            })
            scrollWin()
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <h2><b>Доставка</b></h2>
            <!-- <div class="no-delivery">
                <p class="mt-4"><b>Пока у вас нет доставок</b></p>
                <p>Для активной доставки нужно оплатить<br> выбранные товары из корзины</p>
                <button @click="goRoute($event, 'cart')" >Перейти к корзине</button>
            </div> -->
                <div class="delivery-block">
                    <div class="delivery-title">
                        <div class="dostavka">
                            <img src="https://static.tildacdn.com/tild3563-6631-4138-b639-386636343539/IMG_3708.PNG" alt="" width="30">
                            <p><b>Доставка в пункт выдачи</b></p>
                        </div>
                        <p class="text-primary"><u>Пункт выдачи работает ежедневно</u></p>
                    </div>
                    <div class="delivery-items">
                        <div class="item" v-for="index in 9">
                            <div class="image-delivery-prod" style="background: url('https://basket-09.wb.ru/vol1302/part130277/130277706/images/c246x328/1.jpg') no-repeat center center;" >
                                <button class="btn text-success btn-outline-success oplata">Оплачен</button>
                            </div>
                            <div class="rub">
                                <h2><b><span>323</span></b></h2><h2><b><i class="fa fa-rub"></i></b></h2>
                            </div>
                            <div class="alert alert-primary">Передано в доставку</div>
                            <!-- <div class="get mb-2">Получили заказ? <div class="alert alert-success">Да</div><div class="alert alert-danger">Нет</div></div> -->
                            <div class="get" style="pointer-events: none;"><div class="alert alert-warning">Заказ еще не доставлен</div></div>
                        </div>
                    </div>
                    <div class="delivery-total-amount">
                        <h2><b><span>Итого:</span></b><span class="rub-z"><b>5 323</b><i class="fa fa-rub"></i></span></h2>
                    </div>
                </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/delivery.scss';

</style>