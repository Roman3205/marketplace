<script>

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
            inputName: 'Роман'
        }
    },

    computed: {
        emptyValue() {
            return this.inputMail !== '' || this.inputName !== ''
        }
    },

    methods: {
        showChange(evt) {
            evt.preventDefault()
            this.showChangeMail = true
            scrollMenu()
            opacityEffectsOn()
        },

        closeChange(evt) {
            evt.preventDefault()
            this.showChangeMail = false
            opacityEffectsOff()
        },

        changeName(evt) {
            evt.preventDefault()
            this.showChangeName = true
            scrollMenu()
            opacityEffectsOn()
        },

        closeName(evt) {
            evt.preventDefault()
            this.showChangeName = false
            opacityEffectsOff()
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
                <h2><b>Роман</b></h2>
                <i class="fa fa-pencil" :class="{
                    'none': showChangeName && !showChangeMail || !showChangeName && showChangeMail
                }" @click="changeName"></i>
            </div>
            <div class="user-data">
                <div class="email">
                    <p><b>Email</b></p>
                    <div class="mail">
                        <p>Не указано</p>
                        <i class="fa fa-pencil" @click="showChange" :class="{
                            'none': !showChangeName && showChangeMail || showChangeName && !showChangeMail
                        }" ></i>
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
                <p><b>3 123</b></p><i class="fa fa-rub"></i>
            </div>
        </div>
        <div class="changemail" v-if="showChangeMail">
            <i class="fa fa-times" @click="closeChange" ></i>
            <div class="content">
                <h2><b>Изменить email</b></h2>
                <div class="inp-mail">
                    <span>Новый email</span>
                    <input v-model="inputMail" type="mail" class="form-control summ">
                </div>
                <button class="btn" :disabled="!emptyValue" :class="{
            'opacity': !emptyValue
        }" >Изменить</button>
            </div>
        </div>
        <div class="changename" v-if="showChangeName">
            <i class="fa fa-times" @click="closeName" ></i>
            <div class="content">
                <h2><b>Изменить имя</b></h2>
                <div class="inp-mail">
                    <span>Имя</span>
                    <input v-model="inputName" type="mail" class="form-control summ">
                </div>
                <button class="btn" :disabled="!emptyValue" :class="{
            'opacity': !emptyValue
        }" >Сохранить</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/infodetails.scss';

</style>