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

<style scoped>
    .container__box {
        display: flex;
        flex-direction: column;
        gap: 60px;
    }

    .container {
        display: flex;
        gap: 110px;
        margin: 70px 0px 100px 70px;
    }

    .container button {
        background-color: rgb(145, 51, 208);
        width: 300px;
        color: #fff;
        transition: 0.6s;
    }

    .container button:hover {
        opacity: 0.8!important;
    }

</style>