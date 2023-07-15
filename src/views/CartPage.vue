<script>

import { scrollWin } from '../components/AppFooter.vue'
import { opacityEffectsOff, opacityEffectsOn } from './InfoDetails.vue'

export default {
    data() {
        return {
            showChangeMenu: false
        }
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
        }
    }
}

</script>

<template>
    <div class="container">
        <!-- <div class="wrapper-no-content">
            <h2><b>В корзине пока пусто</b></h2>
            <p>Загляните на главную, чтобы выбрать товары или найдите нужное в поиске</p>
            <button class="no-content-button" @click="goRoute($event, 'main')" >Перейти на главную</button>
        </div> -->
        <div class="wrapper" :class="{
            'opacity': showChangeMenu
        }">
            <h2><b>Корзина</b></h2>
            <div class="wrapper-mod">
                <div class="product-container">
                    <div class="product" v-for="index in 5">
                        <img src="https://basket-09.wb.ru/vol1302/part130277/130277706/images/c246x328/1.jpg" width="150" alt="">
                        <div class="main-content">
                            <div class="user">
                                <span class="number-rev"><span>Артикул товара:</span><h5><b>№324213</b></h5></span>
                                <b class="mt-2">BSmarty / Беспроводные наушники Pro</b>
                                <p class="pt-4">Доставка со склада продавца</p>
                            </div>
                            <div class="action-menu">
                                <button class="btn btn-danger" :disabled="showChangeMenu"><i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="oplata-menu">
                    <div class="oplata">
                        <div class="content">
                            <span><b>Доставка в пункт выдачи</b></span><span><u>13 июня</u></span>
                            <div class="active-menu mt-4">
                                <p>Товары, 2 шт</p>
                                <div class="money"><span>1 391</span><i class="fa fa-rub"></i></div>
                            </div>
                            <div class="active-menu">
                                <h2><b>Итого</b></h2>
                                <div class="money"><h2><b>1 391</b></h2><h2><b><i class="fa fa-rub"></i></b></h2></div>
                            </div>
                            <button class="btn" :disabled="showChangeMenu">Заказать</button>
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
                                    <img src="../../images/user.png" width="25" alt=""><p>Роман +79001234567</p>
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