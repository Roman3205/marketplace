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
        <div class="wrapper">
            <h2><b>Покупки</b></h2>
            <div class="orders">
                <div class="input-search">
                    <input type="text" class="form-control mb-5" placeholder="Название или артикул"><i class="fa fa-search"></i>
                </div>
                <!-- <div class="results">
                    <h2 class="ms-5"><b>Результаты поиска</b></h2>
                    <p class="ms-5 mt-5">Ничего не найдено</p>
                </div> -->
                <div class="content">
                    <div class="product" v-for="index in 10">
                        <div class="image-prod" style="background: url('https://basket-09.wb.ru/vol1302/part130277/130277706/images/c246x328/1.jpg') no-repeat center center;">
                        </div>
                        <div class="content-product">
                            <div class="rub">
                                <h5><b>1 253</b></h5><i class="fa fa-rub"></i>
                            </div>
                            <p><b>BrandName</b> Наушники</p>
                            <div class="active">
                                <p>Заказ: 7 июня</p>
                                <p>Получение: 10 июня</p>
                                <!-- <button class="create-chat hover">Создать чат с продавцом</button>
                                <button class="create-chat hover mt-4">Оформить возврат</button> -->
                                <button class="create-chat" disabled style="pointer-events: none;">Чат создан</button>
                                <button class="create-chat mt-4" disabled style="pointer-events: none;">Возврат создан</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="no-orders">
                <p><b>Здесь будут ваши покупки</b></p>
                <p>На данный момент вы ничего не покупали</p>
                <button @click="goRoute($event, 'main')">На главную</button>
            </div> -->
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/orders.scss';

</style>