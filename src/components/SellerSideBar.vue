<script>

export default {
    methods: {
        goRoute(evt, routeTo) {
            evt.preventDefault()
            this.$router.push({
                name: routeTo
            })
        },

        openBar(evt) {
            evt.preventDefault()
            document.querySelector('.container').classList.toggle('opener')
            document.documentElement.querySelector('.router-seller').classList.toggle('opener-sell')
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <h2 class="no-toggle"><b>Marketplace Partners</b></h2>
            <h2 @click="openBar" class="opener-toggle"><b>Marketplace Partners</b></h2>
            <div class="nav-container">
                <button class="btn" @click="goRoute($event, 'statistics')" >Статистика</button>
                <button class="btn" @click="goRoute($event, 'public')" >Публикация товара</button>
                <button class="btn" @click="goRoute($event, 'sellchats')" >Чаты</button>
                <button class="btn" @click="goRoute($event, 'manage')" >Управление заказами</button>
                <button class="btn mt-4">Выйти</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/sellersidebar.scss';

</style>