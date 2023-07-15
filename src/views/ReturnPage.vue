<script>

import { opacityEffectsOn, opacityEffectsOff } from './InfoDetails.vue';
import { scrollWin } from '../components/AppFooter.vue'

export default {
    data() {
        return {
            showFillMenu: false,
            inputValue1: '',
            inputValue2: ''
        }
    },

    computed: {
        isFillValue() {
            return this.inputValue1.length >= 50 && this.inputValue2.length >= 22
        }
    },

    methods: {
        showFill(evt) {
            evt.preventDefault()
            this.showFillMenu = true
            opacityEffectsOn()
        },

        closeFill(evt) {
            evt.preventDefault()
            this.showFillMenu = false
            opacityEffectsOff()
        },

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
        <div class="wrapper" :class="{
            'opacity': showFillMenu
        }" >
            <!-- <div class="no-returns">
                <p><b>Здесь будут ваши возвраты</b></p>
                <p>В разделе покупки у каждого товара можно<br> создать заявку на его возврат</p>
                <button @click="goRoute($event, 'orders')" >Перейти к покупкам</button>
            </div> -->
            <div class="return-container">
                <div class="return" v-for="index in 6" >
                    <h2><b>Заявка от 14.07.2023</b></h2>
                    <div class="content">
                        <p><b>Номер возврата: 45231435</b></p>
                        <p class="text-primary"><u>Для начала работ по вашей заявке заполните её</u></p>
                        <!-- <p class="text-success"><u>Ожидайте изменений в статусе</u></p> -->
                        <button class="btn btn-primary" @click="showFill" >Заполнить заявку</button>
                        <!-- <button class="btn btn-success" disabled>Заявка заполнена</button> -->
                    </div>
                    <div class="status">Статус возврата: <div class="alert alert-warning">Ожидает заполнения</div></div>
                </div>
            </div>
        </div>
        <div class="write-return" v-if="showFillMenu" style="opacity: 1!important; z-index: 999;">
            <i class="fa fa-times" @click="closeFill" ></i>
            <div class="content">
                <div class="product">
                    <div class="info">
                        <img src="https://basket-09.wb.ru/vol1302/part130277/130277706/images/c246x328/1.jpg" width="150" alt="">
                        <div class="prod-title">
                            <p><b>BSmarty / Беспроводные наушники Pro</b></p>
                            <p>Артикул: <b>33232341</b></p>
                            <p class="price">Цена: <b><span>3 212</span><i class="fa fa-rub"></i></b></p>
                        </div>
                    </div>
                    <div class="load">
                        <span><h2><b>Шаг 1:</b></h2>Создайте альбом на сайте Imgur (регистрироваться не нужно) и загрузите до 10 изображений</span><br>
                        <a href="https://imgur.com/upload" target="_blank">Ссылка на Imgur</a>
                    </div>
                    <div class="next">
                        <p class="mt-3"><h2><b>Шаг 2:</b></h2>Вставьте ниже ссылку на альбом с фотографиями</p>
                        <input v-model="inputValue2" type="text" class="form-control" placeholder="Ссылка на альбом">
                        <span class="text-danger">Вставьте корректную ссылку</span>
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
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/return.scss';

</style>