<script>
import { scrollWin } from "@/components/AppFooter.vue";
import { opacityEffectsOn, opacityEffectsOff } from "./InfoDetails.vue";
import axios from "axios";
import dayjs from "dayjs";

export default {
  data() {
    return {
      showChangeMenu: false,
      products: [],
      userInfo: null,
      cartInfo: null,
      currentDate: new Date(),
      createAlertMessage: "",
      notificationTrue: undefined,
      runOutProd: undefined,
      titleRunOut: null,
      loading: undefined,
      isClickOrder: false,
      isClickRemove: false,
      cities: ["City A", "City B", "City C", "City D", "City F"],
      city: undefined,
      deliveryInfo: {},
      way: undefined,
    };
  },

  mounted() {
    this.loadCart();
  },

  methods: {
    goRoute(evt, routeTo) {
      evt.preventDefault();
      this.$router.push({
        name: routeTo,
      });
      scrollWin();
    },

    changeWay(evt) {
      evt.preventDefault();
      this.showChangeMenu = true;
      opacityEffectsOn();
    },

    closeChange(evt) {
      evt.preventDefault();
      this.showChangeMenu = false;
      opacityEffectsOff();
    },

    async loadCart() {
      try {
        this.loading = true;

        let response = await axios.get("/cart");

        this.loading = false;
        this.userInfo = response.data.customer;
        this.cartInfo = response.data.cart;
        this.products = response.data.cart.products;
      } catch (error) {
        console.log("Ошибка при отправке запроса на сервер: " + error);
      }
    },

    async setCity() {
      let res = await axios.post("/delivery/city", {
        city: this.city,
        products: this.products,
      });

      this.deliveryInfo = res.data;
    },

    async removeFromCart(evt, item) {
      evt.stopPropagation();
      evt.preventDefault();
      this.isClickRemove = false;
      this.isClickRemove = true;
      try {
        this.notificationTrue = false;
        await axios.post("/cart/remove", {
          article: item.article,
        });

        this.notificationTrue = true;
        let id = this.products.indexOf(item);
        this.products.splice(id, 1);
        await new Promise((prom) => setTimeout(prom, 1100));
        this.loadCart();
      } catch (error) {
        console.log("Ошибка при отправке запроса на сервер: " + error);
      } finally {
        this.isClickRemove = false;
      }
    },

    getRandomDateDelivery() {
      let min = 5;
      let max = 7;
      return Math.floor(Math.random() * (max - min) + min);
    },

    getDeliver(date) {
      let day = dayjs(date);
      let deliveryDate = day.add(this.getRandomDateDelivery(), "day");
      return deliveryDate.format("D MMMM");
    },

    goProduct(evt, item) {
      evt.preventDefault();
      this.$router.push({
        name: "product",
        params: {
          article: item.article,
        },
      });
      scrollWin();
    },

    async createOrders(evt) {
      evt.preventDefault();
      this.isClickOrder = false;
      this.isClickOrder = true;

      this.createAlertMessage = "";
      this.runOutProd = false;

      try {
        if (!this.city) {
          return;
        }
        await axios.post("/order/create", {
          products: this.products,
          way: this.way,
        });

        this.createAlertMessage = "Заказ прошел успешно и оплачен";

        await new Promise((prom) => setTimeout(prom, 900));
        this.loadCart();
        await new Promise((prom) => setTimeout(prom, 900));

        this.$router.push({
          name: "delivery",
        });
      } catch (error) {
        if (error.response && error.response.status === 409) {
          this.createAlertMessage = "У вас недостаточно средств для оплаты";
        } else if (error.response && error.response.status === 400) {
          this.runOutProd = true;
          this.titleRunOut = error.response.data.data
            .map(
              (product) =>
                "Товар " +
                "'" +
                product.title +
                "'" +
                " закончился, удалите его из корзины"
            )
            .join(", ");
        } else {
          console.log("Ошибка при отправке запроса на сервер: " + error);
        }
      } finally {
        this.isClickOrder = false;
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="notification" v-if="notificationTrue">
      <div class="alert alert-info w-100 text-center">
        Товар успешно удален из корзины
      </div>
    </div>
    <div class="notification" v-if="runOutProd">
      <div v-if="titleRunOut" class="alert alert-info w-100 text-center">
        {{ titleRunOut }}
      </div>
    </div>
    <div v-if="products.length == 0 && !loading" class="wrapper-no-content">
      <h2><b>В корзине пока пусто</b></h2>
      <p>
        Загляните на главную, чтобы выбрать товары или найдите нужное в поиске
      </p>
      <button class="no-content-button" @click="goRoute($event, 'main')">
        Перейти на главную
      </button>
    </div>
    <spinner-loading
      v-if="loading"
      style="
        height: 301px;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    ></spinner-loading>
    <div
      v-if="products.length != 0 && !loading"
      class="wrapper"
      :class="{
        opacity: showChangeMenu,
      }"
    >
      <h2><b>Корзина</b></h2>
      <div class="wrapper-mod">
        <div class="product-container">
          <transition-group name="common-group">
            <div
              class="product"
              v-for="item in products"
              @click="goProduct($event, item)"
              :key="item._id"
            >
              <img :src="item.picture" width="150" alt="" />
              <div class="main-content">
                <div class="user">
                  <span class="number-rev"
                    ><span>Артикул товара:</span>
                    <h5>
                      <b>{{ item.article }}</b>
                    </h5></span
                  >
                  <b class="mt-2"
                    >{{ item.brand_id.brandName }} / {{ item.title }}</b
                  >
                  <p class="pt-lg-4">Доставка со склада продавца</p>
                </div>
                <div class="action-menu">
                  <button
                    class="btn btn-danger"
                    :disabled="showChangeMenu || isClickRemove"
                    @click="removeFromCart($event, item)"
                  >
                    Удалить<i class="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
        <div class="oplata-menu">
          <div class="oplata">
            <div class="content">
              <span><b>Доставка в пункт выдачи</b></span
              ><span
                ><u>{{ getDeliver(currentDate) }}</u>
                <span>(дата доставки может измениться)</span></span
              >
              <select class="w-100" v-model="city" @change="setCity">
                <option disabled value="" selected class="category-item">
                  Выберите свой город доставки
                </option>
                <option
                  class="category-item"
                  v-for="city in cities"
                  :key="city"
                >
                  {{ city }}
                </option>
              </select>
              <select
                style="color: white"
                v-model="way"
                v-if="
                  deliveryInfo.bestDistance &&
                  deliveryInfo.bestPrice &&
                  deliveryInfo.bestHours
                "
              >
                <option value="" selected disabled checked>
                  Выберите способ доставки
                </option>
                <option>
                  Самый дешевый: {{ deliveryInfo.bestPrice.name }}
                </option>
                <option>
                  Самый короткий: {{ deliveryInfo.bestDistance.name }}
                </option>
                <option>
                  Самый быстрый: {{ deliveryInfo.bestHours.name }}
                </option>
              </select>
              <div class="active-menu mt-4">
                <p>Товары, {{ products.length }} шт</p>
                <div class="money">
                  <span>{{ cartInfo.totalCost }}</span
                  ><i class="fa fa-rub"></i>
                </div>
              </div>
              <div class="active-menu">
                <h2><b>Итого</b></h2>
                <div class="money">
                  <h2>
                    <b>{{ cartInfo.totalCost }}</b>
                  </h2>
                  <h2>
                    <b><i class="fa fa-rub"></i></b>
                  </h2>
                </div>
              </div>
              <button
                class="btn"
                :disabled="showChangeMenu || isClickOrder"
                @click="createOrders"
              >
                Заказать
              </button>
              <div
                v-if="createAlertMessage !== ''"
                class="alert w-100 mt-2 text-center"
                :class="
                  this.createAlertMessage === 'Заказ прошел успешно и оплачен'
                    ? 'alert-success'
                    : 'alert-danger'
                "
              >
                {{ this.createAlertMessage }}
              </div>
              <div class="check">
                <i class="fa fa-check"></i>
                <p>
                  Соглашаюсь с
                  <b @click="goRoute($event, 'pravilapol')"
                    >правилами пользования<br />
                    торговой площадкой</b
                  >
                  и <b @click="goRoute($event, 'vozvrat')">возврата</b>
                </p>
              </div>
            </div>
          </div>
          <div class="data-user">
            <div class="content">
              <div class="left-side">
                <h2><b>Способы оплаты</b></h2>
                <div class="way">
                  <img src="/images/picbalance.png" width="20" alt="" />
                  <p>Оплата балансом</p>
                </div>
              </div>
              <div class="right-side">
                <i class="fa fa-pencil" @click="changeWay"></i>
              </div>
            </div>
          </div>
          <div class="data-user">
            <div class="content">
              <div class="left-side">
                <h2 @click="goRoute($event, 'details')"><b>Мои данные</b></h2>
                <div class="way">
                  <p>{{ userInfo.name }}</p>
                </div>
              </div>
              <div class="right-side">
                <i class="fa fa-pencil" @click="goRoute($event, 'details')"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="changename" v-if="showChangeMenu">
      <i class="fa fa-times" @click="closeChange"></i>
      <div class="content">
        <h2><b>Способ оплаты</b></h2>
        <div class="bal">Баланс Gorza</div>
        <button class="btn" @click="closeChange">Выбрать</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/cart.scss";
@import "@/assets/scss/transition-group.scss";
span,
select {
  color: #a6ba95;
  background: transparent;
  outline: none;
  box-shadow: none;
  border-color: #a6ba95;
}

option {
  color: #623f55;
}
</style>
