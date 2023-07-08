<script>

export default {
    data() {
        return {
            type: 'password',
            image: '../../images/hide.png'
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
        }
    }
}
</script>

<template>
    <div class="wrapper">
			<form action="" class="inner__form form">
				<h3>Вход</h3>
				<div class="form__block form-wrapper">
					<input type="email" placeholder="Почта" class="form-control">
				</div>
				<div class="form__block form-wrapper">
					<input :type="type" placeholder="Пароль" class="form-control">
                    <button class="form__block__toggle btn btn-outline-secondary" @click="toggle($event)">
                        <img :src="image"/>
                    </button>
				</div>
				<button class="form__submit submit-button" type="submit">Войти</button>
                <div class="form__info">
                    <a @click="goReg" href="">Нет аккаунта?</a>
                    <div class="form__info__alert alert alert-danger">Произошла ошибка</div>
                    <!-- <div class="form__info__alert alert alert-success">Вход выполнен успешно</div> -->
                </div>
			</form>
	</div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/login.scss';
</style>