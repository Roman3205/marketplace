<script>

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <div class="info">
                <h2><b>Сообщения</b></h2><br>
                <div class="icon">
                    <p>Тут собраны все чаты и сообщения, которые написаны пользователями в адрес вашего бренда</p>
                    <img src="../../images/picchats.jpg" width="80" alt="">
                </div>
            </div>
            <!-- <h5 class="no-chats mt-4">С вами еще никто не связывался</h5> -->
            <div class="chats-container">
                <div class="chat-block" v-for="index in 3">
                    <div class="user">
                        <img src="../../images/operator.jpg" width="70" alt="">
                        <h2><b>Ozon</b></h2>
                    </div>
                    <h6>Нажмите на чат, чтобы войти в переписку</h6>
                    <h5><b>11:05</b></h5>
                </div>
            </div>
            <h6 class="disnone">Нажмите на чат, чтобы войти в переписку</h6>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../assets/scss/sellchats.scss';

</style>