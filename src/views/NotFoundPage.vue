<script>

export default {
    methods: {
        goMain(evt) {
            evt.preventDefault()
            this.$router.push('/')
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="wrapper">
            <div class="container__box">
                <h2><b>По вашему запросу ничего не найдено</b></h2>
                <button class="btn" @click="goMain" >Назад</button>
            </div>
            <div class="image">
                <img src="/images/notfound.png" alt="" width="230">
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '@/assets/scss/notfound.scss';
</style>