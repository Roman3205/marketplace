<script>

import dayjs from 'dayjs'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            chats: [],
            loading: undefined
        }
    },

    mounted() {
        this.loadChats()
    },

    computed: {
        ...mapGetters({
            getAccessToken: 'auth/getAccessToken'
        })
    },

    methods: {
        async loadChats() {
            try {
                this.loading = true
                let token = 'Bearer ' + this.getAccessToken

                let response = await axios.get('/chats/all', {
                    headers: {
                        Authorization: token
                    }
                })

                this.loading = false

                this.chats = response.data
            } catch (error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            }
        },

        getTime(date) {
            let day = dayjs(date)
            return day.format('HH:mm')
        },

        goChat(evt, item) {
            evt.preventDefault()
            this.$router.push({
                name: 'messenger',
                params: {
                    id: item.uniqueId
                }
            })
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <div class="info">
                <h2><b>Сообщения</b></h2><br>
                <div class="icon">
                    <p>Здесь показаны<br> все ваши чаты</p>
                    <img src="/src/assets/images/picchats.jpg" width="200" alt="">
                </div>
            </div>
            <div class="chats-container">
                <spinner-loading v-if="loading" class="mt-4" style="overflow: hidden; display: flex; justify-content: center;"></spinner-loading>
                <p v-if="chats.length == 0 && !loading">Пока у вас нет никаких чатов</p>
                <div class="chat-block" v-if="chats.length != 0" v-for="(item) in chats" @click="goChat($event, item)" >
                    <div class="user">
                        <img src="/src/assets/images/operator.jpg" width="70" alt="">
                        <h2><b>{{ item.people[0].brandName }}</b></h2>
                    </div>
                    <h6>Нажмите на чат, чтобы войти в переписку</h6>
                    <h5><b>{{ getTime(item.updatedAt) }}</b></h5>
                </div>
            </div>
            <h6 class="disnone">Нажмите на чат, чтобы войти в переписку</h6>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '@/assets/scss/chats.scss';

</style>