<script>

export default {
    data() {
        return {
            typeF: 'password',
            imageF: '../../images/hide.png',
            typeS: 'password',
            imageS: '../../images/hide.png'
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
			<form action="" class="inner__form form">
				<h3>Форма регистрации</h3>
				<div class="form__block form-wrapper">
					<input type="text" placeholder="Имя" class="form-control">
				</div>
				<div class="form__block form-wrapper">
					<input type="email" placeholder="Почта" class="form-control">
				</div>
				<div class="form__block form-wrapper">
					<input :type="typeF" placeholder="Пароль" class="form-control">
                    <button class="form__block__toggle btn btn-outline-secondary" @click="toggle($event, 'F')">
                        <img :src="imageF"/>
                    </button>
				</div>
				<div class="form__block form-wrapper">
					<input :type="typeS" placeholder="Подтвердите пароль" class="form-control">
                    <button class="form__block__toggle btn btn-outline-secondary" @click="toggle($event, 'S')">
                        <img :src="imageS"/>
                    </button>
				</div>
				<button class="form__submit submit-button" type="submit">Зарегистрироваться</button>
                <div class="form__info">
                    <a @click="goLogin" href="">Уже есть аккаунт?</a>
                    <div class="form__info__alert alert alert-danger">Произошла ошибка</div>
                    <!-- <div class="form__info__alert alert alert-success">Вы успешно зарегистрировались</div> -->
                </div>
			</form>
        </div>
	</div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/signup.scss';
</style>