<script>
import axios from "axios";
import {
  opacityEffectsOff,
  opacityEffectsOn,
  scrollMenu,
} from "./InfoDetails.vue";
import dayjs from "dayjs";

export default {
  data() {
    return {
      showDonateBar: false,
      inputValue: "",
      userInfo: null,
      operations: [],
      successTopUp: undefined,
      loading: undefined,
      isClickTopUp: false,
    };
  },

  mounted() {
    this.getUser();
    this.getOperations();
  },

  computed: {
    emptyValue() {
      return this.inputValue !== "";
    },
  },

  methods: {
    showDon(evt) {
      evt.preventDefault();
      this.showDonateBar = true;
      scrollMenu();
      opacityEffectsOn();
    },

    closeDon() {
      this.showDonateBar = false;
      scrollMenu();
      opacityEffectsOff();
    },

    autoV(evt, value) {
      evt.preventDefault();
      this.inputValue = value;
    },

    async getUser() {
      try {
        let response = await axios.get("/main");
        this.userInfo = response.data;
      } catch (error) {
        console.log("Ошибка при отправке запроса на сервер: " + error);
      }
    },

    async balanceTopUp(evt) {
      evt.preventDefault();
      try {
        this.isClickTopUp = false;
        this.isClickTopUp = true;
        this.successTopUp = false;
        let response = await axios.post("/balance/topup", {
          money: this.inputValue,
        });

        this.successTopUp = true;

        await new Promise((prom) => setTimeout(prom, 1300));
        this.inputValue = "";
        await axios
          .post(`${response.data.servBank}/transaction/crypt`, response.data)
          .then((response) => {
            window.location.href = `${response.data.urlBank}/payment/${response.data.path}`;
          });
        this.successTopUp = false;
        // window.open(`http://localhost:5444/payment/${responseTran.data.path}`, '_blank')
      } catch (error) {
        console.log("Ошибка при отправке запроса на сервер: " + error);
        window.location.reload();
      } finally {
        this.isClickTopUp = false;
      }
    },

    async getOperations() {
      try {
        this.loading = true;

        let response = await axios.get("/balance/operations");

        this.loading = false;

        this.operations = response.data;
      } catch (error) {
        console.log("Ошибка при отправке запроса на сервер: " + error);
      }
    },

    getTime(date) {
      let day = dayjs(date);
      return day.format("DD.MM.YYYY HH:mm");
    },

    operationValue(item) {
      if (item.name === "replenishment") {
        return "Баланс пополнен на " + item.money + " (пополнение)";
      } else if (item.name === "withdrawals") {
        return "С баланса списано " + item.money + " (оплата заказа)";
      } else if (item.name === "refund") {
        return "Баланс пополнен на " + item.money + " (возврат товара)";
      } else {
        return "";
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div
      class="wrapper"
      :class="{
        opacity: showDonateBar,
      }"
    >
      <div class="balance">
        <h2><b>Баланс</b></h2>
        <div class="balance-menu">
          <div class="rub">
            <p v-if="userInfo">
              <b>{{ userInfo.balance }}</b>
            </p>
            <i class="fa fa-rub"></i>
          </div>
          <button class="btn" @click="showDon" :disabled="showDonateBar">
            Пополнить
          </button>
          <p>Средства с баланса списываются автоматически при оплате покупок</p>
        </div>
      </div>
      <div class="history">
        <spinner-loading
          v-if="loading"
          class="mt-4"
          style="overflow: hidden; display: flex; justify-content: center"
        ></spinner-loading>
        <div class="no-history" v-if="operations.length == 0 && !loading">
          <p>Операций по балансу пока нет</p>
          <p>После совершения первой операции, покажем ее здесь</p>
        </div>
        <div class="transactions" v-if="operations.length != 0">
          <div class="alert">
            <span
              ><h2><b>Дата</b></h2></span
            ><span
              ><h2><b>Операция</b></h2></span
            >
          </div>
          <transition-group name="common-group">
            <div
              v-for="item in operations"
              class="alert"
              :class="{
                'alert-success': item.name === 'replenishment',
                'alert-danger': item.name === 'withdrawals',
                'alert-primary': item.name === 'refund',
              }"
              :key="item._id"
            >
              <span class="no-wrap">{{ getTime(item.createdAt) }}</span
              ><span>{{ operationValue(item) }}</span>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
    <div class="donate-balance" v-if="showDonateBar">
      <i class="fa fa-times" @click="closeDon"></i>
      <form class="content" @submit="balanceTopUp">
        <h2><b>Пополнение баланса</b></h2>
        <div class="inp-balance">
          <span>Сумма</span>
          <input
            v-model="inputValue"
            type="number"
            min="5"
            max="25000"
            class="form-control summ"
          />
          <div class="auto-don">
            <span @click="autoV($event, 100)">100 Р</span
            ><span @click="autoV($event, 500)">500 Р</span
            ><span @click="autoV($event, 1000)">1000 Р</span>
          </div>
        </div>
        <button
          class="btn"
          :disabled="!emptyValue || isClickTopUp"
          :class="{
            opacity: !emptyValue,
          }"
        >
          Оплатить
        </button>
      </form>
      <div
        v-if="successTopUp"
        class="alert mt-1 alert-primary w-100 text-center"
      >
        Перенаправляем на страницу платежа
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/balance.scss";
@import "@/assets/scss/transition-group.scss";
</style>
