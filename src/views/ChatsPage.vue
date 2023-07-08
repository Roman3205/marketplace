<script>
export default {
    
}

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <div class="info">
                <h2><b>Сообщения</b></h2><br>
                <div class="icon">
                    <p>Здесь показаны<br> все ваши чаты</p>
                    <img src="../../images/picchats.jpg" width="200" alt="">
                </div>
            </div>
            <div class="chats-container">
                <!-- <p>Пока у вас нет никаких чатов</p> -->
                <div class="chat-block">
                    <div class="user">
                        <img src="../../images/operator.jpg" width="70" alt="">
                        <h2><b>Ozon</b></h2>
                    </div>
                    <h6>Нажмите на чат, чтобы войти в переписку</h6>
                    <h5><b>11:05</b></h5>
                </div>
                <div class="chat-block">
                    <div class="user">
                        <img src="../../images/operator.jpg" width="70" alt="">
                        <h2><b>Ozon</b></h2>
                    </div>
                    <h6>Нажмите на чат, чтобы войти в переписку</h6>
                    <h5><b>11:05</b></h5>
                </div>
                <div class="chat-block">
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
    @import '../assets/scss/chats.scss';

</style>