<script>

import axios from 'axios'
import { mapGetters } from 'vuex'

const opacityEffectsOn = () => {
    document.documentElement.style.overflowY = 'hidden'
    document.querySelector('.header').style.pointerEvents = 'none'
    document.querySelector('.footer').style.pointerEvents = 'none'
    document.querySelector('.header').classList.add('changemenu-opacity')
    document.querySelector('.footer').classList.add('changemenu-opacity')
}

const opacityEffectsOff = () => {
    document.documentElement.style.overflowY = 'scroll'
    document.querySelector('.header').style.pointerEvents = 'all'
    document.querySelector('.footer').style.pointerEvents = 'all'
    document.querySelector('.header').classList.remove('changemenu-opacity')
    document.querySelector('.footer').classList.remove('changemenu-opacity')
}

const scrollMenu = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

export { opacityEffectsOff, opacityEffectsOn, scrollMenu }

export default {
    data() {
        return {
            showChangeMail: false,
            showChangeName : false,
            inputMail: '',
            inputName: '',
            userInfo: null,
            nameAlertMessage: '',
            mailAlertMessage: ''
        }
    },

    mounted() {
        this.getUser()
    },

    computed: {
        emptyValue() {
            return this.inputMail === ''
        },

        ...mapGetters({
            getAccessToken: 'auth/getAccessToken'
        })
    },

    methods: {
        showChange() {
            this.showChangeMail = true
            scrollMenu()
            opacityEffectsOn()
        },

        closeChange() {
            this.showChangeMail = false
            opacityEffectsOff()
        },

        changeName() {
            this.showChangeName = true
            scrollMenu()
            opacityEffectsOn()
        },

        closeName() {
            this.showChangeName = false
            opacityEffectsOff()
        },

        async getUser() {
            try {
                let token = 'Bearer ' + this.getAccessToken;
                let response = await axios.get('/main', {
                    headers: {
                        Authorization: token
                    }
                })
                this.userInfo = response.data
                this.inputName = this.userInfo.name
            } catch (error) {
                console.log('Ошибка при отправке запроса на сервер: ' + error);
            }
        },

        async ChangeMail(evt) {
            this.mailAlertMessage = ''
            
            try {
                evt.preventDefault()
                let token = 'Bearer ' + this.getAccessToken
                await axios.post('/mail/change', {
                    mail: this.inputMail
                }, { headers: {
                        Authorization: token
                    }}
                )

                this.mailAlertMessage = 'Почта успешно изменена'

                await new Promise(prom => setTimeout(prom, 1300))
                this.inputMail = ''
                this.closeChange()
                this.getUser()
                this.mailAlertMessage = ''

            } catch (error) {
                if(error.response && error.response.status === 409) {
                    this.mailAlertMessage = 'Почта уже привязана к другому аккаунту'
                } else {
                    console.log('Ошибка при отправке запроса на сервер: ' + error);
                }
            }
        },

        async ChangeName(evt) {
            this.nameAlertMessage = ''
            evt.preventDefault()
            
            let filter = /([a-zA-Zа-яА-Я])\1{1}/;
            if (this.inputName.length < 3 || this.inputName.length > 11 || !/^[А-Яа-я\s,'-.!" "?]+$/.test(this.inputName) || this.inputName.trim() !== this.inputName || filter.test(this.inputName)) {
                this.nameAlertMessage = 'Ошибка заполнения'
            } else {
                try {
                    let token = 'Bearer ' + this.getAccessToken;
                    await axios.post('/name/change', {
                        name: this.inputName
                    }, { headers: {
                            Authorization: token
                        }}
                    )

                    this.nameAlertMessage = 'Имя успешно изменено'

                    await new Promise(prom => setTimeout(prom, 1300))
                    this.closeName()
                    this.getUser()
                    window.location.reload()
                } catch (error) {
                    console.log('Ошибка при отправке запроса на сервер: ' + error);
                }
            }
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper__1" :class="{
        'opacity': showChangeMail || showChangeName }">
            <div class="username-block">
                <label for="file"><img src="../../images/user.png" alt="" width="140"></label>
                <input type="file" class="d-none" id="file">
                <h2 v-if="userInfo"><b>{{ userInfo.name }}</b></h2>
                <i class="fa fa-pencil" @click="changeName"></i>
            </div>
            <div class="user-data">
                <div class="email">
                    <p><b>Email</b></p>
                    <div class="mail">
                        <p v-if="userInfo">{{ userInfo.mail }}</p>
                        <i class="fa fa-pencil" @click="showChange"></i>
                    </div>
                </div>
                <div class="tel">
                    <p><b>Телефон</b></p>
                    <p>Не требуется</p>
                </div>
            </div>
        </div>
        <div class="wrapper__2" :class="{
        'opacity': showChangeMail || showChangeName }">
            <div class="summ-block">
                <h2><b>Сумма выкупа</b></h2>
                <p>Общая сумма ваших покупок на сайте за последние два года</p>
            </div>
            <div class="rub">
                <p v-if="userInfo"><b>{{ userInfo.amountRedemption }}</b></p><i class="fa fa-rub"></i>
            </div>
        </div>
        <div class="changemail" v-if="showChangeMail">
            <i class="fa fa-times" @click="closeChange" ></i>
            <form class="content" @submit="ChangeMail">
                <h2><b>Изменить email</b></h2>
                <div class="inp-mail">
                    <span>Новый email</span>
                    <input v-model="inputMail" type="email" class="form-control summ">
                </div>
                <button class="btn" :disabled="emptyValue" :class="{
            'opacity': emptyValue
        }" >Изменить</button>
            </form>
            <div v-if="this.mailAlertMessage !== ''" class="w-100 mt-3 text-center form__info__alert alert" :class="this.mailAlertMessage === 'Почта успешно изменена' ? 'alert-success' : 'alert-danger'">{{ this.mailAlertMessage }}</div>
        </div>
        <div class="changename" v-if="showChangeName">
            <i class="fa fa-times" @click="closeName" ></i>
            <form class="content" @submit="ChangeName">
                <h2><b>Изменить имя</b></h2>
                <div class="inp-mail">
                    <span>Имя</span>
                    <input v-model="inputName" type="text" class="form-control summ">
                </div>
                <button class="btn" :disabled="!inputName" :class="{
            'opacity': !inputName
        }" >Сохранить</button>
            </form>
            <div v-if="this.nameAlertMessage !== ''" class="w-100 mt-3 text-center form__info__alert alert" :class="this.nameAlertMessage === 'Имя успешно изменено' ? 'alert-success' : 'alert-danger'">{{ this.nameAlertMessage }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/infodetails.scss';

</style>