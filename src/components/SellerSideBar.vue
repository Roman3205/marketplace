<script>

import axios from 'axios'
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions({
            deleteTokenSeller: 'auth/deleteTokenSeller'
        }),

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
        },

        async LogOut(evt) {
            evt.preventDefault()
            try {
                this.deleteTokenSeller()
                // await axios.post('/logout/seller') cookies from server
                this.$router.push({
                    name: 'main'
                })
                await new Promise(prom => setTimeout(prom, 2000))
                window.location.reload()
            } catch (error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            }
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <h2 class="no-toggle"><b>Gorza Partners</b></h2>
            <h2 @click="openBar" class="opener-toggle"><b>Gorza Partners</b></h2>
            <div class="nav-container">
                <button class="btn" @click="goRoute($event, 'statistics')" :class="{
                    active: this.$route.name === 'statistics'
                }" >Главная</button>
                <button class="btn" @click="goRoute($event, 'manage')" :class="{
                    active: this.$route.name === 'manage'
                }" >Управление заказами</button>
                <button class="btn" @click="goRoute($event, 'sellrefund')" :class="{
                    active: this.$route.name === 'sellrefund'
                }" >Заявки на возврат</button>
                <button class="btn" @click="goRoute($event, 'sellchats')" :class="{
                    active: this.$route.name === 'sellchats'
                }" >Чаты</button>
                <button @click="LogOut" class="btn mt-4">Выйти</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '@/assets/scss/sellersidebar.scss';

</style>