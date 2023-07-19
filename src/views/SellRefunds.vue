<script>

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <h2><b>Заявки на возврат ваших товаров</b></h2>
            <!-- <h5 class="mt-4">Заявок на возврат товаров вашего бренда нет</h5> -->
            <div class="container-orders">
                <div class="sell-order" v-for="index in 4">
                    <div class="left-side-sell">
                        <h2>Дата создания заявки: <b>16.07</b></h2>
                        <p>Номер возврата: <b>45453713912</b></p>
                        <p>Пользователь: <b>Роман</b></p>
                        <p class="name">Название товара: <b>BSmarty / Беспроводные наушники Pro</b></p>
                        <p>Артикул товара: <b>32362713912</b></p>
                        <p>Цена: <b class="price">3 432 <i class="fa fa-rub"></i></b></p>
                        <p>Ссылка на альбом с изображениями: <a href="" target="_blank">клик</a></p>
                    </div>
                    <div class="textarea">
                        <p>Описание возврата: <textarea class="text" maxlength="250" disabled></textarea></p>
                    </div>
                    <div class="right-side-sell">
                        <h2>Статус:</h2>
                        <div class="alert alert-primary">В работе</div>
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
    @import '../assets/scss/sellrefund.scss';

</style>