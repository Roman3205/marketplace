<script>
import axios from "axios";

export default {
  data() {
    return {
      type: "password",
      image: "/images/hide.png",
      mail: "",
      password: "",
      alertMessage: "",
    };
  },

  methods: {
    goReg(evt) {
      evt.preventDefault();
      this.$router.push({
        name: "sellSignup",
      });
    },

    toggle(evt) {
      evt.preventDefault();
      this.type = this.type === "password" ? "text" : "password";
      this.image =
        this.type === "password" ? "/images/hide.png" : "/images/show.png";
    },

    async Login(evt) {
      evt.preventDefault();
      this.alertMessage = "";
      localStorage.clear();

      if (this.mail === "" || this.password === "") {
        this.alertMessage = "Заполните все поля";
      } else {
        try {
          await axios.post("/logout");

          await axios.post("/login/seller", {
            mail: this.mail,
            password: this.password,
          });

          this.alertMessage = "Вход выполнен успешно";
          localStorage.setItem("tokenSell", true);
          await new Promise((prom) => setTimeout(prom, 1300));
          this.$router.push({
            name: "statistics",
          });
        } catch (error) {
          if (error.response && error.response.status === 404) {
            this.alertMessage = "Пользователь не найден";
          } else if (error.response && error.response.status === 400) {
            this.alertMessage = "Неверно введены данные";
          } else {
            console.log("Ошибка при отправке запроса на сервер: " + error);
          }
        }
      }
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <form @submit="Login" class="inner__form form">
      <h3>Вход</h3>
      <div class="form__block form-wrapper">
        <input
          v-model="mail"
          type="email"
          placeholder="Почта"
          class="form-control"
        />
      </div>
      <div class="form__block form-wrapper">
        <input
          v-model="password"
          :type="type"
          placeholder="Пароль"
          class="form-control"
        />
        <button
          class="form__block__toggle btn btn-outline-secondary"
          @click="toggle($event)"
        >
          <img :src="image" />
        </button>
      </div>
      <button class="form__submit submit-button" type="submit">Войти</button>
      <div class="form__info">
        <a @click="goReg" href="">Пройдите регистрацию</a>
        <div
          v-if="alertMessage !== ''"
          class="w-100 text-center form__info__alert alert"
          :class="
            this.alertMessage === 'Вход выполнен успешно'
              ? 'alert-success'
              : 'alert-danger'
          "
        >
          {{ this.alertMessage }}
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/sellLogin.scss";
</style>
