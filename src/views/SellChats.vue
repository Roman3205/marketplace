<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  data() {
    return {
      chats: [],
      loading: undefined,
    };
  },

  mounted() {
    this.loadChats();
  },

  methods: {
    async loadChats() {
      try {
        this.loading = true;
        let response = await axios.get("/seller/chats/all");
        this.loading = false;
        this.chats = response.data;
      } catch (error) {
        console.log("Ошибка при отправке запроса на сервер: " + error);
      }
    },

    getTime(date) {
      let day = dayjs(date);
      return day.format("HH:mm");
    },

    goChat(evt, item) {
      evt.preventDefault();
      this.$router.push({
        name: "sellmessenger",
        params: {
          id: item.uniqueId,
        },
      });
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <div class="info">
        <h2><b>Сообщения</b></h2>
        <br />
        <div class="icon">
          <p>
            Тут собраны все чаты и сообщения, которые созданы пользователями в
            адрес вашего бренда
          </p>
          <img src="/images/picchats.jpg" width="80" alt="" />
        </div>
      </div>
      <spinner-loading
        v-if="loading"
        class="mt-lg-5"
        style="overflow: hidden; display: flex; align-self: center"
      ></spinner-loading>
      <h5 class="no-chats mt-4" v-if="chats.length == 0 && !loading">
        С вами еще никто не связывался
      </h5>
      <div class="chats-container" v-if="chats.length != 0">
        <div
          class="chat-block"
          v-for="item in chats"
          :key="item"
          @click="goChat($event, item)"
        >
          <div class="user">
            <img src="/images/operator.jpg" width="70" alt="" />
            <h2>
              <b>{{ item.people[0].name }}</b>
            </h2>
          </div>
          <h6>Нажмите на чат, чтобы войти в переписку</h6>
          <h5>
            <b>{{ getTime(item.updatedAt) }}</b>
          </h5>
        </div>
      </div>
      <h6 class="disnone">Нажмите на чат, чтобы войти в переписку</h6>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/sellchats.scss";
</style>
