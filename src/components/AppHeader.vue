<script>

export default {
    methods: {
        goLog(evt) {
            evt.preventDefault()
            this.$router.push({
                name: 'login'
            })
        },

        goMain(evt) {
            evt.preventDefault()
            this.$router.push({
                name: 'main'
            })
        },

        goSeller(evt) {
            evt.preventDefault()
            this.$router.push({
                name: 'sellLogin'
            })
        },

        goLk(evt) {
            evt.preventDefault()
            this.$router.push({
                name: 'lk'
            })
        }
    }
}

</script>
<template>
    <div class="container">
        <div class="container__header header-top">
            <div class="header__money">
                <i class="fa fa-rub"></i><span>RUB</span>
            </div>
            <button @click="goSeller" class="header__button btn btn-primary text-white">Стать продавцом</button>
        </div>
        <div class="container__header header-bottom">
            <div class="header__menu">
                <i class="fa fa-bars"></i>
                <h1 @click="goMain" >MARKETPLACE</h1>
            </div>
            <div class="header__search">
                <label for="search"><i class="fa fa-search" aria-hidden="true"></i></label>
                <input type="text" placeholder="Я ищу..." id="search" class="form-control">
            </div>
            <div class="header__box box">
                <div class="box__user" @click="goLog" >
                    <i class="fa fa-user-o" aria-hidden="true"></i>
                    <span>Войти</span>
                </div>
                <div class="header__cart">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span>Корзина</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/header.scss';
</style>