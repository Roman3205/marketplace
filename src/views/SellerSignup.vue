<script>

export default {
    data() {
        return {
            type: 'password',
            image: '../../images/hide.png'
        }
    },

    methods: {
        toggle(evt) {
            evt.preventDefault()
            this.type = this.type === 'password' ? 'text' : 'password'
            this.image = this.type === 'password' ? '../../images/hide.png' : '../../images/show.png'
        }
    }
}
</script>

<template>
    <div class="wrapper">
			<form action="" class="inner__form form">
				<h3>Регистрация</h3>
				<div class="form-content">
                    <div class="form__block form-wrapper">
                        <div class="brand-name">
                            <span>Название бренда</span>
                            <input type="text" placeholder="Например, LosTomatos" class="form-control">
                        </div>
                        <div class="brand-category">
                            <span>Категория товаров</span>
                            <input type="text" class="form-control" placeholder="Введите категорию" >
                        </div>
                        <div class="contact">
                            <span>Контактное лицо</span>
                            <input type="text" placeholder="Имя Фамилия" class="form-control">
                        </div>
                        <div class="description">
                            <span>Описание бренда</span><br>
                            <textarea name="" id="" cols="23" rows="3" placeholder="Введите описание"></textarea>
                        </div>
                    </div>
                    <div class="form__block form-wrapper">
                        <div class="mail">
                            <span>Email</span>
                            <input type="email" placeholder="Например, mail@gmail.com" class="form-control">
                        </div>
                        <div class="tel">
                            <span>Телефон</span>
                            <input type="tel" placeholder="Например, +79001234567" class="form-control">
                        </div>
                        <div class="password">
                            <span>Пароль</span>
                            <div class="password-user">
                                <input :type="type" placeholder="Придумайте пароль" class="form-control">
                                <button class="form__block__toggle btn btn-outline-secondary" @click="toggle">
                                    <img :src="image"/>
                                </button>
                            </div>
                        </div>
                        <button class="form__submit" type="submit">Стать партнером</button>
                    </div>
                </div>
			</form>
            <!-- <div class="form__info">
                    <div class="form__info__alert alert alert-danger">Произошла ошибка</div>
                     <div class="form__info__alert alert alert-success">Вход выполнен успешно</div> -->
                <!-- </div> -->
	</div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/sellsignup.scss';
</style>