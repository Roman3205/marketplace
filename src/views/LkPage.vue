<script>

const ScrollWin = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

export default {
    methods: {
        goWallet(evt) {
            evt.preventDefault()
            this.$router.push({
                name: 'balance'
            })
            ScrollWin()
        },

        goDetails(evt) {
            evt.preventDefault()
            this.$router.push({
                name: 'details'
            })
            ScrollWin()
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper col">
            <div class="row block__1">
                <div class="block__content" @click="goDetails" >
                    <div class="block__content__top">
                        <img src="../../images/user.png" alt="" width="68">
                        <h2>Роман</h2>
                    </div>
                    <div class="user-info">
                        <p>Почта <b><span class="upper-span">mail@gmail.com</span></b></p>
                        <button class="btn btn-danger mt-1">Выйти</button>
                    </div>
                </div>
                <div class="block__content">
                    <div class="block__content__top">
                        <img src="../../images/dostavka.png" alt="" width="68">
                        <h2>Доставки</h2>
                    </div>
                    <p>Мои активные доставки</p>
                </div>
                <div class="block__content tov">
                    <div class="block__content__top">
                        <img src="../../images/otzv.png" alt="" width="70">
                        <h2>Покупки</h2>
                    </div>
                    <p>Товаров куплено <strong><span class="upper-span">5</span></strong></p>
                </div>
            </div>
            <div class="row block__2">
                <div class="block__content" @click="goWallet" >
                    <h2>Баланс</h2>
                    <div class="rub">
                        <p><b>0</b></p><i class="fa fa-rub"></i>
                    </div>
                </div>
                <div class="block__content">
                    <h2>Чеки</h2>
                    <p>После каждой покупки добавляются чеки</p>
                </div>
            </div>
            <div class="row block__3">
                <div class="block__content">
                    <div class="block__content__top">
                        <img src="../../images/chats.png" alt="" width="70">
                        <h2>Чаты</h2>
                    </div>
                    <p>Все ваши переписки хранятся здесь</p>
                </div>
                <div class="block__content">
                    <div class="block__content__top">
                        <img src="../../images/vozvrat.png" alt="" width="68">
                        <h2>Возвраты</h2>
                    </div>
                    <p>Возвраты и их оформление</p>
                </div>
                <div class="block__content">
                    <div class="block__content__top">
                        <img src="../../images/otzv.png" alt="" width="68">
                        <h2>Отзывы</h2>
                    </div>
                    <p>Все ваши отзывы</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/lk.scss';
</style>