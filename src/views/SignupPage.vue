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
            emptyFields: undefined,
            notCorrectName: undefined,
            notCorrectMail: undefined,
            notCorrectPassword: undefined,
            notPasswordsMatch: undefined,
            notCorrectLetters: undefined,
            lettersPassword: undefined,
            emptySpace: undefined,
            successReg: undefined,
            existMail: undefined
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
            this.emptyFields = false
            this.notCorrectName = false
            this.notCorrectMail = false
            this.notCorrectPassword = false
            this.notPasswordsMatch = false
            this.notCorrectLetters = false
            this.lettersPassword = false
            this.emptySpace = false
            this.successReg = false
            this.existMail = false

            let filter = /([a-zA-Zа-яА-Я])\1{1}/;

            if (this.name === '' || this.mail === '' || this.password === '' || this.confirmPassword === '') {
                this.emptyFields = true
            } else if (this.name.length < 3 || this.name.length > 11 || filter.test(this.name)) {
                this.notCorrectName = true
            } else if (!/^[А-Яа-я\s,'-.!" "?]+$/.test(this.name)) {
                this.notCorrectLetters = true
            } else if (this.mail.length < 13 || this.mail.length > 35 || filter.test(this.mail)) {
                this.notCorrectMail = true
            } else if (this.password.length < 7) {
                this.notCorrectPassword = true
            } else if (/^[А-Яа-я\s,'-.!" "?]+$/.test(this.password)) {
                this.lettersPassword = true
            } else if (this.password !== this.confirmPassword) {
                this.notPasswordsMatch = true
            } else if (this.name.trim() !== this.name || this.password.trim() !== this.password || this.mail.trim() !== this.mail) {
                this.emptySpace = true
            } else {
                try {
                    let response = await axios.post('/registration', {
                        name: this.name,
                        mail: this.mail,
                        password: this.password
                    })

                    if (response && response.status === 200) {
                        this.successReg = true
                        await new Promise(prom => setTimeout(prom, 1300))
                        this.$router.push({
                            name: 'login'
                        })
                    }
                    
                } catch (error) {
                    if (error.response && error.response.status === 409) {
                        this.existMail = true
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
                    <div v-if="emptyFields" class="w-100 text-center form__info__alert alert alert-danger">Заполните все поля</div>
                    <div v-if="notCorrectName" class="w-100 text-center form__info__alert alert alert-danger">Введите корректно свое имя</div>
                    <div v-if="notCorrectMail" class="w-100 text-center form__info__alert alert alert-danger">Введите корректно свою почту</div>
                    <div v-if="notCorrectPassword" class="w-100 text-center form__info__alert alert alert-danger">Слабый пароль</div>
                    <div v-if="notPasswordsMatch" class="w-100 text-center form__info__alert alert alert-danger">Пароли не совпадают</div>
                    <div v-if="notCorrectLetters" class="w-100 text-center form__info__alert alert alert-danger">Имя должно быть на русском языке</div>
                    <div v-if="lettersPassword" class="w-100 text-center form__info__alert alert alert-danger">Пароли не должны быть на русском языке</div>
                    <div v-if="emptySpace" class="w-100 text-center form__info__alert alert alert-danger">Уберите все пробелы в полях ввода</div>
                    <div v-if="successReg" class="w-100 text-center form__info__alert alert alert-success">Вы успешно зарегистрировались</div>
                    <div v-if="existMail" class="w-100 text-center form__info__alert alert alert-danger">Аккаунт с введенной почтой уже существует</div>
                </div>
			</form>
        </div>
	</div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/signup.scss';
</style>