<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            type: 'password',
            image: '/src/assets/images/hide.png',
            brandName: '',
            brandCategory: '',
            name: '',
            mail: '',
            tel: '',
            description: '',
            password: '',
            alertMessage: ''
        }
    },

    computed: {
        ...mapState({
            categoriesArray: state => state.categoriesArray
        })
    },

    methods: {
        toggle(evt) {
            evt.preventDefault()
            this.type = this.type === 'password' ? 'text' : 'password'
            this.image = this.type === 'password' ? '/src/assets/images/hide.png' : '/src/assets/images/show.png'
        },

        async Registration(evt) {
            evt.preventDefault()
            this.alertMessage = ''

            let filter = /([a-zA-Zа-яА-Я])\1{1}/;

            if (this.brandName === '' || this.brandCategory === '' || this.brandCategory === 'Выберите категорию' || this.name === '' || this.mail === '' || this.tel === '' || this.description === '' || this.password === '') {
                this.alertMessage = 'Заполните все поля'
            } else if (this.name.length < 3 || filter.test(this.name) || !/^[А-Яа-я\s,'-.!" "?]+$/.test(this.name)) {
                this.alertMessage = 'Введите корректно контактное лицо'
            } else if (this.brandName.length < 3 || this.brandName.length > 20 || filter.test(this.brandName)) {
                this.alertMessage = 'Название бренда некорректное'
            } else if (this.mail.length < 13 || this.mail.length > 35 || filter.test(this.mail)) {
                this.alertMessage = 'Введите корректно почту'
            } else if (this.description.length < 60 || !/^[А-Яа-я\s,'-.!" "?]+$/.test(this.description)) {
                this.alertMessage = 'Описание слишком короткое и должно быть на русском языке'
            } else if (this.password.length < 7) {
                this.alertMessage = 'Слабый пароль'
            } else if (this.brandName.trim() !== this.brandName || this.brandCategory.trim() !== this.brandCategory || this.name.trim() !== this.name || this.mail.trim() !== this.mail || this.tel.trim() !== this.tel || this.description.trim() !== this.description || this.password.trim() !== this.password) {
                this.alertMessage = 'Уберите все пробелы в полях ввода'
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
                        this.alertMessage = 'Вы успешно зарегистрировались'
                        await new Promise(prom => setTimeout(prom, 1300))
                        this.$router.push({
                            name: 'sellLogin'
                        })
                    }
                } catch (error) {
                    if (error.response && error.response.status === 409) {
                        this.alertMessage = 'Аккаунт продавца с введенной почтой уже существует'
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
                                <option disabled value="" selected class="category-item">Выберите категорию</option>
                                <option class="category-item" v-for="category in categoriesArray">{{ category }}</option>
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
                    <div v-if="alertMessage !== ''" class="w-100 text-center alert" :class="this.alertMessage === 'Вы успешно зарегистрировались' ? 'alert-success' : 'alert-danger'">{{ this.alertMessage }}</div>
                </div>
			</form>
	</div>
</template>

<style scoped lang="scss">
    @import '@/assets/scss/sellSignup.scss';
    
</style>