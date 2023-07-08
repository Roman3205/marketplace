<script>
    import axios from 'axios';
    import dayjs from 'dayjs';

    export default {
        // data() {
        //     return {
        //         information: null,
        //         messages: [],
        //         text: '',
        //         to: '',
        //         param: null
        //     }
        // },

        // mounted() {
        //     this.loadInfo()
        // },

        // methods: {
        //     async loadInfo() {
        //         let response = await axios.get('/chat', {
        //             params: {
        //                 id: this.$route.params.id
        //             }
        //         })
        //         this.information = response.data.chat
        //         this.messages = response.data.messages
        //         this.to = this.information.people[0]._id
        //         this.param = this.messages[0].messages

        //         this.$nextTick(() => {
        //             this.scrollToBottom()
        //         })
        //     },

        //     scrollToBottom() {
        //         let container = document.querySelector('.messages-container')
        //         container.scrollTop = container.scrollHeight
        //     },

        //     async sendMessage(e) {
        //         e.preventDefault()
        //         if(this.text !== '') {
        //             await axios.post('/message/send', {
        //                 text: this.text,
        //                 to: this.to,
        //                 id: this.$route.params.id
        //             })
        //             this.text = ''
        //         }
        //         this.loadInfo()
        //     },

        //     getRelativeDate(date) {
        //         let day = dayjs(date)
        //         return day.fromNow()
        //     }
        // }
    }
</script>

<template>
    <div class="container">
        <div class="wrapper">
            <div class="block-box">
                <div class="info-user">
                    <div class="user-chat" v-if="information">
                        {{ information.people[0].firstName }} {{ information.people[0].lastName }}
                    </div>
                </div>
                <div class="messages-container">
                    <div v-for="(item) in param" :class="{'message-l': item.from === to, 'message-r': item.from !== to}" >
                        <div class="text-message">
                            <div>{{ item.text }}</div>
                            <div class="date" :class="{'left': item.from === to, 'right': item.from !== to}" ><p><sub>{{ getRelativeDate(item.createdAt) }}</sub></p></div>
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