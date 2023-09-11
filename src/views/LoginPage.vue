<script>

import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            type: 'password',
            image: '../../images/hide.png',
            mail: '',
            password: '',
            alertMessage: ''
        }
    },

    computed: {
        ...mapGetters({
            getToken: 'auth/getAccessToken'
        })
    },

    methods: {
        ...mapActions({
            updateAccessToken: 'auth/updateAccessToken'
        }),

        goReg(evt) {
            evt.preventDefault()
            this.$router.push({
                name: 'signup'
            })
        },

        toggle(evt) {
            evt.preventDefault()
            this.type = this.type === 'password' ? 'text' : 'password'
            this.image = this.type === 'password' ? '../../images/hide.png' : '../../images/show.png'
        },

        async Login(evt) {
            evt.preventDefault()
            this.alertMessage = ''

            if (this.mail === "" || this.password === "") {
                this.alertMessage = 'Заполните все поля'
            } else {
                try {
                    // разобраться тут
                    await axios.post('/logout/seller')
                    localStorage.removeItem('tokenSell')
                    //

                    let response = await axios.post('/login', {
                        mail: this.mail,
                        password: this.password,
                    })

                    this.alertMessage = 'Вход выполнен успешно'
                    this.updateAccessToken(response.data)
                    await new Promise(prom => setTimeout(prom, 1300))
                    this.$router.push({
                        name: 'main'
                    })
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        this.alertMessage = 'Пользователь не найден'
                    } else if (error.response && error.response.status === 400) {
                        this.alertMessage = 'Неверно введены данные'
                    }
                }
            }
        }
    }
}
</script>

<template>
    <div class="wrapper">
		<form @submit="Login" class="inner__form form">
			<h3>Вход</h3>
            {{ getToken }}
			<div class="form__block form-wrapper">
				<input v-model="mail" type="email" placeholder="Почта" class="form-control">
			</div>
			<div class="form__block form-wrapper">
				<input v-model="password" :type="type" placeholder="Пароль" class="form-control">
                <button class="form__block__toggle btn btn-outline-secondary" @click="toggle($event)">
                    <img :src="image"/>
                </button>
			</div>
			<button class="form__submit submit-button" type="submit">Войти</button>
            <div class="form__info">
                <a @click="goReg" href="">Нет аккаунта?</a>
                <div v-if="alertMessage !== ''" class="w-100 text-center form__info__alert alert" :class="this.alertMessage === 'Вход выполнен успешно' ? 'alert-success' : 'alert-danger'">{{ alertMessage }}</div>
            </div>
		</form>
	</div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/login.scss';
</style>