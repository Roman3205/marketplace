<script>

import axios from 'axios'

export default {
    data() {
        return {
            type: 'password',
            image: '../../images/hide.png',
            brandName: '',
            brandCategory: '',
            name: '',
            mail: '',
            tel: '',
            description: '',
            password: '',
            emptyFields: undefined,
            notCorrectName: undefined,
            notCorrectDescription: undefined,
            notCorrectBrandName: undefined,
            notCorrectMail: undefined,
            notCorrectPassword: undefined,
            emptySpace: undefined,
            successReg: undefined,
            existMail: undefined
        }
    },

    methods: {
        toggle(evt) {
            evt.preventDefault()
            this.type = this.type === 'password' ? 'text' : 'password'
            this.image = this.type === 'password' ? '../../images/hide.png' : '../../images/show.png'
        },

        async Registration(evt) {
            evt.preventDefault()
            this.emptyFields = false
            this.notCorrectName = false
            this.notCorrectDescription = false
            this.notCorrectBrandName = false
            this.notCorrectMail = false
            this.notCorrectPassword = false
            this.emptySpace = false
            this.successReg = false
            this.existMail = false

            let filter = /([a-zA-Zа-яА-Я])\1{1}/;

            if (this.brandName === '' || this.brandCategory === '' || this.name === '' || this.mail === '' || this.tel === '' || this.description === '' || this.password === '') {
                this.emptyFields = true
            } else if (this.name.length < 3 || filter.test(this.name) || !/^[А-Яа-я\s,'-.!" "?]+$/.test(this.name)) {
                this.notCorrectName = true
            } else if (this.brandName.length < 3 || this.brandName.length > 20 || filter.test(this.brandName)) {
                this.notCorrectBrandName = true
            } else if (this.mail.length < 13 || this.mail.length > 35 || filter.test(this.mail)) {
                this.notCorrectMail = true
            } else if (this.description.length < 60 || !/^[А-Яа-я\s,'-.!" "?]+$/.test(this.description)) {
                this.notCorrectDescription = true
            } else if (this.password.length < 7) {
                this.notCorrectPassword = true
            } else if (this.brandName.trim() !== this.brandName || this.brandCategory.trim() !== this.brandCategory || this.name.trim() !== this.name || this.mail.trim() !== this.mail || this.tel.trim() !== this.tel || this.description.trim() !== this.description || this.password.trim() !== this.password) {
                this.emptySpace = true
            } else {
                try {
                    let response = await axios.post('/registration/seller', {
                        brandName: this.brandName,
                        brandCategory: this.brandCategory,
                        name: this.name,
                        mail: this.mail,
                        tel: this.tel,
                        description: this.description,
                        password: this.password
                    })

                    if (response && response.status === 200) {
                        this.successReg = true
                        await new Promise(prom => setTimeout(prom, 1300))
                        this.$router.push({
                            name: 'sellLogin'
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
			<form @submit="Registration" class="inner__form form">
				<h3>Регистрация</h3>
				<div class="form-content">
                    <div class="form__block form-wrapper">
                        <div class="brand-name">
                            <span>Название бренда</span>
                            <input v-model="brandName" type="text" placeholder="Например, LosTomatos" class="form-control">
                        </div>
                        <div class="brand-category">
                            <span>Категория товаров</span>
                            <select class="w-100" v-model="brandCategory">
                                <option class="category-item">Верхняя одежда</option>
                                <option class="category-item">Обувь</option>
                                <option class="category-item">Товары для дома</option>
                                <option class="category-item">Аксессуары</option>
                                <option class="category-item">Электроника</option>
                                <option class="category-item">Игрушки</option>
                                <option class="category-item">Мебель</option>
                                <option class="category-item">Продукты</option>
                                <option class="category-item">Бытовая техника</option>
                                <option class="category-item">Зоотовары</option>
                                <option class="category-item">Спорт</option>
                                <option class="category-item">Автотовары</option>
                                <option class="category-item">Школа</option>
                                <option class="category-item">Книги</option>
                                <option class="category-item">Ювелирные изделия</option>
                                <option class="category-item">Здоровье</option>
                                <option class="category-item">Сад и дача</option>
                            </select>
                        </div>
                        <div class="contact">
                            <span>Контактное лицо</span>
                            <input v-model="name" type="text" placeholder="Имя Фамилия" class="form-control">
                        </div>
                        <div class="description">
                            <span>Описание бренда</span><br>
                            <textarea v-model="description" maxlength="200" name="" id="" cols="23" rows="3" placeholder="Введите описание"></textarea>
                        </div>
                    </div>
                    <div class="form__block form-wrapper">
                        <div class="mail">
                            <span>Email</span>
                            <input v-model="mail" type="email" placeholder="Например, mail@gmail.com" class="form-control">
                        </div>
                        <div class="tel">
                            <span>Телефон</span>
                            <div class="d-flex">
                                <input v-model="tel" type="tel" required pattern="[+][7][9][0-9]{9}" placeholder="Например, +79001234567" class="form-control"><span class="validity"></span>
                            </div>
                        </div>
                        <div class="password">
                            <span>Пароль</span>
                            <div class="password-user">
                                <input v-model="password" :type="type" placeholder="Придумайте пароль" class="form-control">
                                <button class="form__block__toggle btn btn-outline-secondary" @click="toggle">
                                    <img :src="image"/>
                                </button>
                            </div>
                        </div>
                        <button class="form__submit" type="submit">Стать партнером</button>
                    </div>
                </div>
                <div class="form__info mt-4">
                    <div v-if="emptyFields" class="w-100 text-center alert alert-danger">Заполните все поля</div>
                    <div v-if="notCorrectName" class="w-100 text-center alert alert-danger">Введите корректно контактное лицо</div>
                    <div v-if="notCorrectMail" class="w-100 text-center alert alert-danger">Введите корректно почту</div>
                    <div v-if="notCorrectPassword" class="w-100 text-center alert alert-danger">Слабый пароль</div>
                    <div v-if="notCorrectBrandName" class="w-100 text-center alert alert-danger">Название бренда некорректное</div>
                    <div v-if="notCorrectDescription" class="w-100 text-center alert alert-danger">Описание слишком короткое и должно быть на русском языке</div>
                    <div v-if="emptySpace" class="w-100 text-center alert alert-danger">Уберите все пробелы в полях ввода</div>
                    <div v-if="successReg" class="w-100 text-center alert alert-success">Вы успешно зарегистрировались</div>
                    <div v-if="existMail" class="w-100 text-center alert alert-danger">Аккаунт продавца с введенной почтой уже существует</div>
                </div>
			</form>
	</div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/sellsignup.scss';
</style>