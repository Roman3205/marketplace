<script>
import { scrollWin } from "@/components/AppFooter.vue";
import axios from "axios";
import dayjs from "dayjs";

export default {
  data() {
    return {
      orders: [],
      totalPrice: 0,
      date: new Date(),
      successRecieved: undefined,
      loading: undefined,
      isClickRecieve: false,
    };
  },

  mounted() {
    this.loadOrders();
  },

  methods: {
    goRoute(evt, routeTo) {
      evt.preventDefault();
      this.$router.push({
        name: routeTo,
      });
      scrollWin();
    },

    async loadOrders() {
      try {
        this.loading = true;

        let response = await axios.get("/orders/all");

        this.loading = false;

        this.orders = response.data.orders;

        this.totalPrice = 0;

        for (let i = 0; i < this.orders.length; i++) {
          this.totalPrice += this.orders[i].money;
        }
      } catch (error) {
        console.log("Ошибка при отправке запроса на сервер: " + error);
      }
    },

    async setRecieved(evt, item) {
      evt.preventDefault();
      evt.stopPropagation();

      this.isClickRecieve = false;
      this.isClickRecieve = true;
      try {
        this.successRecieved = false;

        await axios.post("/order/recieved", {
          id: item._id,
        });

        this.successRecieved = true;
        let id = this.orders.indexOf(item);
        this.orders.splice(id, 1);
        await new Promise((prom) => setTimeout(prom, 500));
        this.loadOrders();
      } catch (error) {
        console.log("Ошибка при отправке запроса на сервер: " + error);
      } finally {
        this.isClickRecieve = false;
      }
    },

    goProduct(evt, item) {
      evt.preventDefault();
      this.$router.push({
        name: "product",
        params: {
          article: item.product_id.article,
        },
      });
      scrollWin();
    },

    getRandomDateDelivery() {
      let min = 7;
      let max = 9;
      return Math.floor(Math.random() * (max - min) + min);
    },

    getDeliver(date) {
      let day = dayjs(date);
      let deliveryDate = day.add(this.getRandomDateDelivery(), "day");
      return deliveryDate.format("D MMMM");
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="notification" v-if="successRecieved">
      <div class="alert alert-success w-100 text-center">
        Товар получен вами в пункте выдачи
      </div>
    </div>
    <div class="wrapper">
      <h2 v-if="!loading"><b>Доставка</b></h2>
      <spinner-loading
        v-if="loading"
        class="mt-4"
        style="overflow: hidden; display: flex; justify-content: center"
      ></spinner-loading>
      <div class="no-delivery mt-4" v-if="this.orders.length == 0 && !loading">
        <p><b>Пока у вас нет доставок</b></p>
        <p>
          Для активной доставки нужно оплатить<br />
          выбранные товары из корзины
        </p>
        <button @click="goRoute($event, 'cart')">Перейти к корзине</button>
      </div>
      <div class="delivery-block" v-if="this.orders.length != 0">
        <div class="delivery-title">
          <div class="dostavka">
            <img
              src="https://static.tildacdn.com/tild3563-6631-4138-b639-386636343539/IMG_3708.PNG"
              alt=""
              width="30"
            />
            <p><b>Доставка в пункт выдачи</b></p>
            <h6 class="m-0">
              <u>{{ getDeliver(this.date) }}</u>
            </h6>
            <span>(дата доставки может измениться)</span>
          </div>
          <p class="text-primary"><u>Пункт выдачи работает ежедневно</u></p>
        </div>
        <div class="delivery-items">
          <transition-group name="group-second">
            <div
              class="item"
              v-for="item in orders"
              @click="goProduct($event, item)"
              :key="item._id"
              :style="
                item.status === 'Готов к получению'
                  ? { maxHeight: '500px!important' }
                  : {}
              "
            >
              <div
                class="image-delivery-prod"
                :style="
                  'background: url(' +
                  item.product_id.picture +
                  ') no-repeat center center;'
                "
              >
                <button class="btn text-success btn-outline-success oplata">
                  Оплачен
                </button>
              </div>
              <div class="rub">
                <h6 class="pb-3 ps-lg-2">
                  <span>{{ item.product_id.title }}</span>
                </h6>
              </div>
              <div class="status-panel">
                <div
                  class="alert text-center"
                  :class="{
                    'alert-danger': item.status === 'Создан',
                    'alert-info':
                      item.status === 'Отправлен на сборку' ||
                      item.status === 'Собран',
                    'alert-warning': item.status === 'Отсортирован',
                    'alert-primary': item.status === 'Передан в доставку',
                    'alert-success': item.status === 'Готов к получению',
                  }"
                >
                  {{ item.status }}
                </div>
                <div
                  v-if="item.status === 'Готов к получению'"
                  class="get recieve"
                >
                  Получили заказ?
                  <div
                    class="alert alert-success"
                    :class="{ 'click-recieve': isClickRecieve }"
                    @click="setRecieved($event, item)"
                  >
                    Да
                  </div>
                </div>
                <div
                  v-if="item.status !== 'Готов к получению'"
                  class="get"
                  style="pointer-events: none"
                >
                  <div class="alert alert-warning">Заказ еще не доставлен</div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
        <div class="delivery-total-amount">
          <h2>
            <b><span>Итого:</span></b
            ><span class="rub-z"
              ><b>{{ this.totalPrice }}</b
              ><i class="fa fa-rub"></i
            ></span>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/delivery.scss";
@import "@/assets/scss/transition-group.scss";
</style>
