<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  data() {
    return {
      information: null,
      text: "",
      to: "",
      messages: [],
      timer: null,
      isClickSent: false,
    };
  },

  mounted() {
    this.loadInfo();

    this.timer = setInterval(this.loadInfo, 50000);
  },

  beforeUnmount() {
    clearInterval(this.timer);
  },

  methods: {
    async loadInfo() {
      try {
        let response = await axios.get("/seller/chat", {
          params: {
            id: this.$route.params.id,
          },
        });

        this.information = response.data.chat;
        this.messages = response.data.messages;
        this.to = this.information[0].people[0]._id;

        this.$nextTick(() => {
          this.scrollToBottom();
        });
      } catch (error) {
        console.log("Ошибка при отправке запроса на сервер: " + error);
      }
    },

    scrollToBottom() {
      let container = document.querySelector(".messages-container");
      container.scrollTop = container.scrollHeight;
    },

    async sendMessage(evt) {
      evt.preventDefault();

      try {
        this.isClickSent = false;
        this.isClickSent = true;

        if (this.text !== "") {
          await axios.post("/seller/message/send", {
            text: this.text,
            to: this.to,
            id: this.$route.params.id,
          });

          this.text = "";
        }

        this.loadInfo();
      } catch (error) {
        console.log("Ошибка при отправке запроса на сервер: " + error);
      } finally {
        this.isClickSent = false;
      }
    },

    getDate(date) {
      let day = dayjs(date);
      return day.format("HH:mm D MMMM");
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <div class="block-box">
        <div class="info-user">
          <div class="user-chat" v-if="information">
            <b>{{ information[0].people[0].name }}</b>
          </div>
        </div>
        <div class="messages-container">
          <h5 style="text-align: center" v-if="messages.messages == 0">
            Сообщений пока нет
          </h5>

          <div v-if="messages.messages != 0">
            <div
              v-for="item in messages.messages"
              :key="item"
              :class="{
                'message-l': item.from === to,
                'message-r': item.from !== to,
              }"
            >
              <div class="text-message">
                <div>{{ item.text }}</div>
                <div
                  class="date"
                  :class="{ left: item.from === to, right: item.from !== to }"
                >
                  <p>
                    <sub>{{ getDate(item.createdAt) }}</sub>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="send-message-form">
          <form @submit="sendMessage">
            <input
              v-model="text"
              type="text"
              placeholder="Введите сообщение"
              class="form-control"
            />
            <button type="submit" class="btn" :disabled="isClickSent">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/messenger.scss";
</style>
