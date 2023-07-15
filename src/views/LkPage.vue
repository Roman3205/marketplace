<script>

import { scrollWin } from '../components/AppFooter.vue';

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
        <div class="wrapper col">
            <div class="row block__1">
                <div class="block__content" @click="goRoute($event, 'details')" >
                    <div class="block__content__top">
                        <img src="../../images/user.png" alt="" width="68">
                        <h2>Роман</h2>
                    </div>
                    <div class="user-info">
                        <p>Почта <b><span class="upper-span">mail@gmail.com</span></b></p>
                        <button class="btn btn-danger mt-1">Выйти</button>
                    </div>
                </div>
                <div class="block__content" @click="goRoute($event, 'delivery')" >
                    <div class="block__content__top">
                        <img src="../../images/dostavka.png" alt="" width="68">
                        <h2>Доставки</h2>
                    </div>
                    <p>Мои активные доставки</p>
                </div>
                <div class="block__content tov" @click="goRoute($event, 'orders')" >
                    <div class="block__content__top">
                        <img src="../../images/otzv.png" alt="" width="70">
                        <h2>Покупки</h2>
                    </div>
                    <p>Товаров куплено <strong><span class="upper-span">5</span></strong></p>
                </div>
            </div>
            <div class="row block__2">
                <div class="block__content balmoney" @click="goRoute($event, 'balance')" >
                    <div class="block__content__top balance-cont">
                        <div class="balance-title">
                            <img src="../../images/picbalance.png" alt="" width="55">
                            <h2>Баланс</h2>
                        </div>
                        <div class="rub">
                            <h4><b>0</b></h4><i class="fa fa-rub"></i>
                        </div>
                    </div>
                    <p>Узнайте все операции вашего баланса</p>
                </div>
                <div class="block__content" @click="goRoute($event, 'reviews')" >
                    <div class="block__content__top">
                        <img src="../../images/otzv.png" alt="" width="68">
                        <h2>Отзывы</h2>
                    </div>
                    <p>Все ваши отзывы</p>
                </div>
            </div>
            <div class="row block__3">
                <div class="block__content" @click="goRoute($event, 'chats')" >
                    <div class="block__content__top">
                        <img src="../../images/chats.png" alt="" width="70">
                        <h2>Чаты</h2>
                    </div>
                    <p>Все ваши переписки хранятся здесь</p>
                </div>
                <div class="block__content" @click="goRoute($event, 'refund')" >
                    <div class="block__content__top">
                        <img src="../../images/vozvrat.png" alt="" width="68">
                        <h2>Возвраты</h2>
                    </div>
                    <p>Возвраты и их оформление</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/lk.scss';
</style>