<script>

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <h2><b>Заказы ваших товаров</b></h2>
            <h5 class="mt-4">Ваши товары еще никто не заказывал</h5>
            <div class="container-orders">
                <div class="sell-order" v-for="index in 4">
                    <div class="left-side-sell">
                        <h2>Дата заказа: <b>16.07</b></h2>
                        <p>Покупатель: <b>Роман</b></p>
                        <p>Название товара: <b>BSmarty / Беспроводные наушники Pro</b></p>
                        <p>Артикул товара: <b>32362713912</b></p>
                    </div>
                    <div class="right-side-sell">
                        <h2>Статус:</h2>
                        <div class="alert alert-warning">Ожидает подтверждения</div>
                        <div class="change-status">
                            <p>Изменить состояние</p>
                            <div class="status">
                                <button class="prev"><i class="fa fa-arrow-left"></i>Назад</button>
                                <button class="next">Вперед<i class="fa fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/sellmanage.scss';

</style>