<script>

import axios from 'axios'

export default {
    data() {
        return {
            typeF: 'password',
            imageF: '../../images/hide.png',
            typeS: 'password',
            imageS: '../../images/hide.png',
            name: '',
            mail: '',
            password: '',
            confirmPassword: '',
            alertMessage: ''
        }
    },

    methods: {
        goLogin(evt) {
            evt.preventDefault()
            this.$router.push({
                name: 'login'
            })
        },

        toggle(evt, field) {
            evt.preventDefault()
            if(field === 'F') {
                this.typeF = this.typeF === 'password' ? 'text' : 'password'
                this.imageF = this.typeF === 'password' ? '../../images/hide.png' : '../../images/show.png'
            } else if(field === 'S') {
                this.typeS = this.typeS === 'password' ? 'text' : 'password'
                this.imageS = this.typeS === 'password' ? '../../images/hide.png' : '../../images/show.png'
            }
        },

        async Registration(evt) {
            evt.preventDefault()
            this.alertMessage = ''

            let filter = /([a-zA-Zа-яА-Я])\1{2}/;

            if (this.name === '' || this.mail === '' || this.password === '' || this.confirmPassword === '') {
                this.alertMessage = 'Заполните все поля'
            } else if (this.name.length < 3 || this.name.length > 11 || filter.test(this.name)) {
                this.alertMessage = 'Введите корректно свое имя'
            } else if (!/^[А-Яа-я\s,'-.!" "?]+$/.test(this.name)) {
                this.alertMessage = 'Имя должно быть на русском языке'
            } else if (this.mail.length < 13 || this.mail.length > 50 || filter.test(this.mail)) {
                this.alertMessage = 'Введите корректно свою почту'
            } else if (this.password.length < 7) {
                this.alertMessage = 'Слабый пароль'
            } else if (/^[А-Яа-я\s,'-.!" "?]+$/.test(this.password)) {
                this.alertMessage = 'Пароли не должны быть на русском языке'
            } else if (this.password !== this.confirmPassword) {
                this.alertMessage = 'Пароли не совпадают'
            } else if (this.name.trim() !== this.name || this.password.trim() !== this.password || this.mail.trim() !== this.mail) {
                this.alertMessage = 'Уберите все пробелы в полях ввода'
            } else {
                try {
                    let response = await axios.post('/registration', {
                        name: this.name,
                        mail: this.mail,
                        password: this.password
                    })

                    if (response && response.status === 200) {
                        this.alertMessage = 'Вы успешно зарегистрировались'
                        await new Promise(prom => setTimeout(prom, 1300))
                        this.$router.push({
                            name: 'login'
                        })
                    }
                } catch (error) {
                    if (error.response && error.response.status === 409) {
                        this.alertMessage = 'Аккаунт с введенной почтой уже существует'
                    } else {
                        console.log('Ошибка при отправке запроса на сервер: ' + error);
                    }
                }
            }
        }
    }
}
</script>

<template>
    <div class="wrapper">
			<div class="container-regis">
                <div class="inner__image">
				<img src="../../images/regimage.png" width="420" alt="">
			</div>
			<form @submit="Registration" class="inner__form form">
				<h3>Форма регистрации</h3>
				<div class="form__block form-wrapper">
					<input v-model="name" type="text" placeholder="Имя" class="form-control">
				</div>
				<div class="form__block form-wrapper">
					<input v-model="mail" type="email" placeholder="Почта" class="form-control">
				</div>
				<div class="form__block form-wrapper">
					<input v-model="password" :type="typeF" placeholder="Пароль" class="form-control" maxlength="30">
                    <button class="form__block__toggle btn btn-outline-secondary" @click="toggle($event, 'F')">
                        <img :src="imageF"/>
                    </button>
				</div>
				<div class="form__block form-wrapper">
					<input v-model="confirmPassword" :type="typeS" placeholder="Подтвердите пароль" class="form-control" maxlength="30">
                    <button class="form__block__toggle btn btn-outline-secondary" @click="toggle($event, 'S')">
                        <img :src="imageS"/>
                    </button>
				</div>
				<button class="form__submit submit-button" type="submit">Зарегистрироваться</button>
                <div class="form__info">
                    <a @click="goLogin" href="">Уже есть аккаунт?</a>
                    <div v-if="this.alertMessage !== ''" class="w-100 text-center form__info__alert alert" :class="this.alertMessage === 'Вы успешно зарегистрировались' ? 'alert-success' : 'alert-danger'">{{ this.alertMessage }}</div>
                </div>
			</form>
        </div>
	</div>
</template>

<style scoped lang="scss">
    @import '@/assets/scss/signup.scss';
</style>