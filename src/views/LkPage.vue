<script>
import axios from "axios";
import { scrollWin } from "@/components/AppFooter.vue";

export default {
  data() {
    return {
      userInfo: null,
    };
  },

  mounted() {
    this.getUser();
  },

  methods: {
    goRoute(evt, routeTo) {
      evt.preventDefault();
      this.$router.push({
        name: routeTo,
      });
      scrollWin();
    },

    async getUser() {
      let response = await axios.get("/main");
      this.userInfo = response.data;
    },

    async LogOut(evt) {
      evt.stopPropagation();
      localStorage.clear();
      await axios.post("/logout");
      this.$router.push({
        name: "main",
      });
      await new Promise((prom) => setTimeout(prom, 2000));
      window.location.reload();
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="wrapper col">
      <div class="row block__1">
        <div class="block__content" @click="goRoute($event, 'details')">
          <div class="block__content__top">
            <img src="/images/user.png" alt="" width="68" />
            <h2 v-if="userInfo">{{ userInfo.name }}</h2>
          </div>
          <div class="user-info">
            <p v-if="userInfo">
              Почта<br /><b
                ><span class="upper-span">{{ userInfo.mail }}</span></b
              >
            </p>
            <button
              @click="LogOut"
              class="btn btn-danger mt-1"
              style="width: 100px; text-align: center"
            >
              Выйти
            </button>
          </div>
        </div>
        <div class="block__content" @click="goRoute($event, 'delivery')">
          <div class="block__content__top">
            <img src="/images/dostavka.png" alt="" width="68" />
            <h2>Доставки</h2>
          </div>
          <p>Мои активные доставки</p>
        </div>
        <div class="block__content tov" @click="goRoute($event, 'orders')">
          <div class="block__content__top">
            <img src="/images/otzv.png" alt="" width="70" />
            <h2>Покупки</h2>
          </div>
          <p v-if="userInfo">
            Товаров куплено
            <strong
              ><span class="upper-span">{{
                userInfo.boughtProducts
              }}</span></strong
            >
          </p>
        </div>
      </div>
      <div class="row block__2">
        <div
          class="block__content balmoney"
          @click="goRoute($event, 'balance')"
        >
          <div class="block__content__top balance-cont">
            <div class="balance-title">
              <img src="/images/picbalance.png" alt="" width="55" />
              <h2>Баланс</h2>
            </div>
            <div class="rub">
              <h4 v-if="userInfo">
                <b>{{ userInfo.balance }}</b>
              </h4>
              <i class="fa fa-rub"></i>
            </div>
          </div>
          <p>Узнайте все операции вашего баланса</p>
        </div>
        <div class="block__content" @click="goRoute($event, 'reviews')">
          <div class="block__content__top">
            <img src="/images/otzv.png" alt="" width="68" />
            <h2>Отзывы</h2>
          </div>
          <p>Все ваши отзывы</p>
        </div>
      </div>
      <div class="row block__3">
        <div class="block__content" @click="goRoute($event, 'chats')">
          <div class="block__content__top">
            <img src="/images/chats.png" alt="" width="70" />
            <h2>Чаты</h2>
          </div>
          <p>Все ваши переписки хранятся здесь</p>
        </div>
        <div class="block__content" @click="goRoute($event, 'refund')">
          <div class="block__content__top">
            <img src="/images/vozvrat.png" alt="" width="68" />
            <h2>Возвраты</h2>
          </div>
          <p>Возвраты и их оформление</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/lk.scss";
</style>
