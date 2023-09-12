<script>

import axios from 'axios';
import dayjs from 'dayjs';
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            information: null,
            text: '',
            to: '',
            messages: [],
            timer: null
        }
    },

    mounted() {
        this.loadInfo()

        this.timer = setInterval(this.loadInfo, 50000)
    },

    beforeDestroy() {
        clearInterval(this.timer)
    },

    computed: {
        ...mapGetters({
            getTokenSeller: 'auth/getTokenSeller'
        })
    },

    methods: {
        async loadInfo() {
            try {
                let token = 'Bearer ' + this.getTokenSeller

                let response = await axios.get('/seller/chat', {
                    params: {
                        id: this.$route.params.id
                    },
                        
                    headers: {
                        Authorization: token
                    }
                })

                this.information = response.data.chat
                this.messages = response.data.messages
                this.to = this.information[0].people[0]._id

                this.$nextTick(() => {
                    this.scrollToBottom()
                })
            } catch(error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            }
        },

        scrollToBottom() {
            let container = document.querySelector('.messages-container')
            container.scrollTop = container.scrollHeight
        },

        async sendMessage(evt) {
            evt.preventDefault()

            try {
                let token = 'Bearer ' + this.getTokenSeller

                if(this.text !== '') {
                    await axios.post('/seller/message/send', {
                        text: this.text,
                        to: this.to,
                        id: this.$route.params.id
                    }, {
                        headers: {
                            Authorization: token
                        }
                    })

                    this.text = ''
                }

                this.loadInfo()
            } catch(error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            }
        },

        getDate(date) {
            let day = dayjs(date)
            return day.format('HH:mm D MMMM')
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <div class="block-box">
                <div class="info-user">
                    <div class="user-chat" v-if="information">
                        <b>{{ information[0].people[0].name }}</b>
                    </div>
                </div>
                <div class="messages-container">
                    <h5 style="text-align: center;" v-if="messages.messages == 0" >Сообщений пока нет</h5>
                    <div v-for="(item) in messages.messages" v-if="messages.messages != 0" :class="{'message-l': item.from === to, 'message-r': item.from !== to}" >
                        <div class="text-message">
                            <div>{{ item.text }}</div>
                            <div class="date" :class="{'left': item.from === to, 'right': item.from !== to}" ><p><sub>{{ getDate(item.createdAt) }}</sub></p></div>
                        </div>
                    </div>
                </div>
                <div class="send-message-form">
                    <form @submit="sendMessage">
                        <input v-model="text" type="text" class="form-control" >
                        <button type="submit" class="btn">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/messenger.scss';

</style>