<script>

import axios from 'axios'

export default {
    data() {
        return {
            type: 'password',
            image: '../../images/hide.png',
            mail: '',
            password: '',
            emptyFields: undefined,
            successLogin: undefined,
            existUser: undefined,
            notCorrectData: undefined
        }
    },

    methods: {
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
            this.emptyFields = false
            this.successLogin = false
            this.existUser = false
            this.notCorrectData = false

            if (this.mail === "" || this.password === "") {
                this.emptyFields = true
            } else {
                try {
                    let response = await axios.post('/login', {
                        mail: this.mail,
                        password: this.password,
                    }, {
                        withCredentials: true
                    })

                    this.successLogin = true
                    localStorage.setItem('token', response.data)
                    await new Promise(prom => setTimeout(prom, 1300))
                    this.$router.push({
                        name: 'main'
                    })
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        this.existUser = true
                    } else if (error.response && error.response.status === 400) {
                        this.notCorrectData = true
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
                    <div v-if="emptyFields" class="w-100 text-center form__info__alert alert alert-danger">Заполните все поля</div>
                    <div v-if="existUser" class="w-100 text-center form__info__alert alert alert-danger">Пользователь не найден</div>
                    <div v-if="notCorrectData" class="w-100 text-center form__info__alert alert alert-danger">Неверно введены данные</div>
                    <div v-if="successLogin" class="w-100 text-center form__info__alert alert alert-success">Вход выполнен успешно</div>
                </div>
			</form>
	</div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/login.scss';
</style>