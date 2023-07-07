<script>

export default {
    methods: {
        goMain(evt) {
            evt.preventDefault()
            this.$router.push({
                name: 'main'
            })
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="container__box">
            <h2><b>По вашему запросу ничего не найдено</b></h2>
            <button class="btn" @click="goMain" >На главную</button>
        </div>
        <img src="../../images/notfound.png" alt="" width="240">
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/notfound.scss';
</style>