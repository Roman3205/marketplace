<script>
import { mapState } from "vuex";
import dayjs from "dayjs";
import axios from "axios";
import Map from "@/components/Map.vue";

const opacityEffectsOn = () => {
  document.querySelector("#container-stat").style.overflowY = "hidden";
  document.documentElement.style.overflowY = "hidden";
  document.querySelector(".sidebar-seller").style.pointerEvents = "none";
  document.querySelector(".sidebar-seller").classList.add("changemenu-opacity");
};

const opacityEffectsOff = () => {
  document.querySelector("#container-stat").style.overflowY = "scroll";
  document.documentElement.style.overflowY = "hidden";
  document.querySelector(".sidebar-seller").style.pointerEvents = "all";
  document
    .querySelector(".sidebar-seller")
    .classList.remove("changemenu-opacity");
};

export default {
  data() {
    return {
      showSaleMenu: false,
      discount: "",
      discountItem: "",
      showPublicMenu: false,
      textareaValue: "",
      inputName: "",
      photoValue: "",
      selectValue: "",
      priceValue: "",
      sellerInfo: null,
      createAlertMessage: "",
      products: [],
      discountSuccess: undefined,
      deleteProd: undefined,
      recycleProd: undefined,
      loading: undefined,
      isClickProd: false,
      isClickDiscount: false,
      isClickDelete: false,
      quantity: 0,
      size: "",
      weight: 0,
    };
  },

  components: {
    Map,
  },

  mounted() {
    this.getSeller();
    this.getProducts();
  },

  computed: {
    ...mapState({
      categoriesArray: (state) => state.categoriesArray,
    }),

    emptyValue() {
      return this.discount >= 5 && this.discount <= 90;
    },

    CreateFill() {
      return (
        this.inputName.length >= 8 &&
        this.textareaValue.length >= 150 &&
        this.photoValue.length >= 10 &&
        this.selectValue !== "" &&
        this.priceValue !== ""
      );
    },
  },

  methods: {
    showSale(evt, item) {
      evt.preventDefault();
      this.showSaleMenu = true;
      this.discountItem = item._id;
      opacityEffectsOn();
    },

    closeSale() {
      this.showSaleMenu = false;
      opacityEffectsOff();
    },

    showPublic(evt) {
      evt.preventDefault();
      this.showPublicMenu = true;
      opacityEffectsOn();
    },

    closePublic() {
      this.showPublicMenu = false;
      opacityEffectsOff();
    },

    async getSeller() {
      try {
        let response = await axios.get("/seller/main");

        this.sellerInfo = response.data;
      } catch (error) {
        console.log("Ошибка при отправке запроса на сервер: " + error);
      }
    },

    async CreateProd(evt) {
      evt.preventDefault();
      this.createAlertMessage = "";
      this.isClickProd = false;
      this.isClickProd = true;
      let filter = /([a-zA-Zа-яА-Я])\1{1}/;
      if (
        filter.test(this.inputName) ||
        !/^[А-Яа-я\s,'-.!" "?]+$/.test(this.textareaValue) ||
        /^[А-Яа-я\s,'-.!" "?]+$/.test(this.photoValue) ||
        !filter.test(this.textareaValue) ||
        this.size === "" ||
        this.weight <= 0 ||
        this.quantity <= 0
      ) {
        this.createAlertMessage = "Произошла ошибка в заполнении";
      } else {
        try {
          await axios.post("/product/create", {
            title: this.inputName,
            description: this.textareaValue,
            picture: this.photoValue,
            price: this.priceValue,
            category: this.selectValue,
            size: this.size,
            quantity: this.quantity,
            weight: this.weight,
          });

          this.createAlertMessage = "Товар успешно опубликован";
          await new Promise((prom) => setTimeout(prom, 1300));
          this.getSeller();
          this.getProducts();
          this.inputName = "";
          this.textareaValue = "";
          this.photoValue = "";
          this.priceValue = "";
          this.selectValue = "";
          this.closePublic();
          this.createAlertMessage = "";
        } catch (error) {
          if (error.response && error.response.status === 409) {
            this.createAlertMessage =
              "Товар с введенным описанием или фото уже существует";
          } else {
            console.log("Ошибка при отправке запроса на сервер: " + error);
          }
        } finally {
          this.isClickProd = false;

          this.createAlertMessage = "";
        }
      }
    },

    async getProducts() {
      try {
        this.loading = true;
        let response = await axios.get("/seller/products/all");
        this.loading = false;
        this.products = response.data;
      } catch (error) {
        console.log("Ошибка при отправке запроса на сервер: " + error);
      }
    },

    async deleteProduct(evt, item) {
      evt.preventDefault();
      this.isClickDelete = false;
      this.isClickDelete = true;
      this.deleteProd = false;

      try {
        await axios.post("/product/remove", {
          id: item._id,
        });

        this.deleteProd = true;

        await new Promise((prom) => setTimeout(prom, 1300));

        this.getProducts();
      } catch (error) {
        console.log("Ошибка при отправке запроса на сервер: " + error);
      } finally {
        this.isClickDelete = false;
      }
    },

    async returnCurrentProduct(evt, item) {
      evt.preventDefault();
      this.recycleProd = false;

      try {
        await axios.post("/product/return/sell", {
          id: item._id,
        });

        this.recycleProd = true;

        await new Promise((prom) => setTimeout(prom, 1300));

        this.getProducts();
      } catch (error) {
        console.log("Ошибка при отправке запроса на сервер: " + error);
      }
    },

    async setDiscount(evt) {
      evt.preventDefault();
      this.isClickDiscount = false;
      this.isClickDiscount = true;
      this.discountSuccess = false;

      try {
        await axios.post("/discount/set", {
          id: this.discountItem,
          discount: this.discount,
        });

        this.discountSuccess = true;
        await new Promise((prom) => setTimeout(prom, 1300));
        this.getProducts();
        this.discount = "";
        this.closeSale();
        this.discountSuccess = false;
      } catch (error) {
        console.log("Ошибка при отправке запроса на сервер: " + error);
      } finally {
        this.isClickDiscount = false;
      }
    },

    getTime(date) {
      let day = dayjs(date);
      return day.fromNow(true);
    },
  },
};
</script>

<template>
  <div class="container" id="container-stat">
    <div class="notification" v-if="deleteProd">
      <div class="alert alert-info w-100 text-center">
        Товар теперь имеет статус "Закончился на складе", продажи оставновлены
      </div>
    </div>
    <div class="notification" v-if="recycleProd">
      <div class="alert alert-info w-100 text-center">
        Продажи вашего товара возобновлены
      </div>
    </div>
    <div
      class="wrapper"
      :class="{
        opacity: showSaleMenu || showPublicMenu,
      }"
    >
      <div class="container_top">
        <div class="block_left">
          <div class="information">
            <h2 class="mb-4"><b>Информация</b></h2>
            <div class="wrapper-info">
              <h5 v-if="sellerInfo">
                Название бренда: <b>{{ sellerInfo.brandName }}</b>
              </h5>
              <h5 v-if="sellerInfo">
                Контактное лицо: <b>{{ sellerInfo.name }}</b>
              </h5>
              <h5 v-if="sellerInfo">
                Категория: <b>{{ sellerInfo.brandCategory }}</b>
              </h5>
              <h5 v-if="sellerInfo">
                Почта: <b>{{ sellerInfo.mail }}</b>
              </h5>
              <h5 v-if="sellerInfo">
                Телефон: <b>{{ sellerInfo.tel }}</b>
              </h5>
              <h5 v-if="sellerInfo">
                Описание бренда: <br /><textarea
                  disabled
                  v-model="sellerInfo.description"
                ></textarea>
              </h5>
            </div>
          </div>
        </div>
        <div class="block_right">
          <div class="statistics">
            <h2 class="mb-4"><b>Статистика</b></h2>
            <div class="wrapper-statistics">
              <h5 v-if="sellerInfo">
                Товаров продано: <b>{{ sellerInfo.sold }}</b>
              </h5>
              <h5 v-if="sellerInfo">
                Активных заказов: <b>{{ sellerInfo.activeOrders }}</b>
              </h5>
              <h5 v-if="sellerInfo">
                Возвратов: <b>{{ sellerInfo.returns }}</b>
              </h5>
              <h5 v-if="sellerInfo">
                Активных возвратов: <b>{{ sellerInfo.activeReturns }}</b>
              </h5>
              <h5 v-if="sellerInfo">
                Время с момента заключения партнерства: <br /><b>{{
                  getTime(sellerInfo.createdAt)
                }}</b>
              </h5>
            </div>
          </div>
          <div class="balance">
            <h2 class="mb-4"><b>Баланс</b></h2>
            <div class="wrapper-balance">
              <h5 class="text-success">У вас на счету:</h5>
              <h2 class="summ" v-if="sellerInfo">
                {{ sellerInfo.balance }}<i class="fa fa-rub"></i>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div
        style="
          width: 100%;
          height: fit-content;
          pointer-events: none;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        "
      >
        <Map />
        <div
          style="
            text-align: left;
            width: fit-content;
            padding: 15px;
            background: lightgray;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            margin-right: 75px;
            gap: 3px;
          "
        >
          <span
            >На данной карте городов показаны маршруты между пунктами выдачи
            в<br />
            этих городах (условные ПВЗ в каждом городе)</span
          >
          <br />
          <span class="alert alert-info"
            ><u
              >Вам не требуется самим выбирать маршруты и простраивать их,<br />
              система сделает это за вас</u
            ></span
          >
          <br />
          <span>Ниже список городов, где находятся ваши склады:</span>
          <span
            style="font-size: 20px; font-weight: 800"
            v-for="city in sellerInfo?.storages"
            :key="city"
            >{{ city }}</span
          >
        </div>
      </div>
      <div class="container_bottom">
        <div class="blocks-title">
          <h2><b>Ваши товары</b></h2>
          <button class="btn" @click="showPublic">
            <b>Опубликовать новый товар</b>
          </button>
        </div>
        <div class="container-blocks">
          <spinner-loading
            v-if="loading"
            style="overflow: hidden; display: flex; align-self: center"
          ></spinner-loading>
          <h5 class="mt-4" v-if="products.products == 0 && !loading">
            У вас нет опубликованных товаров
          </h5>
          <div
            style="display: flex; flex-direction: column; gap: 10px"
            v-if="products.products != 0"
          >
            <div
              class="products-card"
              v-for="item in products.products"
              :key="item"
            >
              <div class="info-prod p-2">
                <div
                  class="image-prod"
                  :style="
                    'background: url(' +
                    item.picture +
                    ') no-repeat center center; border: 2px solid gray;'
                  "
                >
                  <button
                    v-if="item.discount > 0"
                    class="btn btn-danger"
                    disabled
                  >
                    - {{ item.discount }} %
                  </button>
                </div>
                <div class="add-info">
                  <p>
                    <b>{{ item.title }}</b>
                  </p>
                  <p class="rub d-flex gap-2">
                    Цена: <b>{{ item.price }} <i class="fa fa-rub"></i></b>
                  </p>
                  <p>
                    Товар куплен: <b>{{ item.amountSold }}</b> раз(а)
                  </p>
                </div>
              </div>
              <div class="manage-prod">
                <button
                  class="btn btn-outline-success"
                  @click="showSale($event, item)"
                >
                  <b>Повесить скидку</b>
                </button>
                <button
                  :disabled="isClickDelete"
                  v-if="item.runOut == false"
                  class="btn btn-outline-danger"
                  @click="deleteProduct($event, item)"
                >
                  <b>Товар закончился<i class="fa fa-trash"></i></b>
                </button>
                <button
                  v-if="item.runOut == true"
                  class="btn btn-outline-primary"
                  @click="returnCurrentProduct($event, item)"
                >
                  <b>Возобновить продажу<i class="fa fa-recycle"></i></b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="changesale" v-if="showSaleMenu">
      <i class="fa fa-times" @click="closeSale"></i>
      <form class="content" @submit="setDiscount">
        <span class="w-100"
          ><h2><b>Скидка</b></h2>
          (от текущей цены)</span
        >
        <p>
          <b
            >Введите только число<br />
            (от 5 до 90)</b
          >
        </p>
        <div class="input d-flex price">
          <input
            v-model="discount"
            type="number"
            class="form-control"
            min="5"
            max="90"
          />%
        </div>
        <button
          class="btn"
          :class="{
            opacity: !emptyValue,
          }"
          :disabled="isClickDiscount"
        >
          Применить
        </button>
      </form>
      <div
        v-if="discountSuccess"
        class="w-100 mt-1 mb-4 p-2 text-center alert alert-success"
      >
        Скидка успешно создана
      </div>
    </div>
    <div class="changesale create" v-if="showPublicMenu">
      <i class="fa fa-times" @click="closePublic"></i>
      <form class="content" @submit="CreateProd">
        <h2><b>Создание товара</b></h2>
        <div>
          <p>Введите название</p>
          <input
            type="text"
            class="form-control mt-2"
            maxlength="30"
            v-model="inputName"
            placeholder="Например, Беспроводные наушники"
          />
        </div>
        <div>
          <p>Выберите категорию товара</p>
          <select class="mt-2 w-100" v-model="selectValue">
            <option disabled value="" selected class="category-item">
              Выберите категорию
            </option>
            <option
              class="category-item"
              v-for="category in categoriesArray"
              :key="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
        <div>
          <div class="textarea-options">
            <p>Сделайте описание вашему товару</p>
            <span>{{ this.textareaValue.length }} / 300</span>
          </div>
          <textarea
            class="mt-2"
            v-model="textareaValue"
            maxlength="300"
          ></textarea>
        </div>
        <div>
          <p>Введите размеры товара</p>
          <input
            type="text"
            class="form-control mt-2"
            maxlength="15"
            v-model="size"
            placeholder="Например, 200 x 400"
          />
        </div>
        <div>
          <p>Введите вес товара в граммах.</p>
          <input
            type="text"
            class="form-control mt-2"
            maxlength="10"
            v-model="weight"
            placeholder="Например, 400"
          />
        </div>

        <div>
          <p>Введите количество товара на складе в шт.</p>
          <input
            type="text"
            class="form-control mt-2"
            maxlength="3"
            v-model="quantity"
            placeholder="Например, 35"
          />
        </div>
        <div class="photo">
          <p>Вставьте ссылку на фотографию (1 шт) вашего товара</p>
          <input
            type="text"
            placeholder="Ссылка на фото из интернета"
            v-model="photoValue"
            class="mt-2 form-control"
          />
        </div>
        <div class="price">
          <p>Введите цену товара (в руб.)</p>
          <input
            type="number"
            placeholder="Цена"
            v-model="priceValue"
            class="mt-2 form-control"
            min="1"
            max="50000"
          />
        </div>
        <button
          class="btn"
          :class="{
            opacity: !CreateFill,
          }"
          :disabled="isClickProd"
        >
          Опубликовать товар
        </button>
        <div
          v-if="this.createAlertMessage !== ''"
          class="w-100 mt-1 mb-4 p-2 text-center alert"
          :class="
            this.createAlertMessage === 'Товар успешно опубликован'
              ? 'alert-success'
              : 'alert-danger'
          "
        >
          {{ this.createAlertMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/sellstatistics.scss";
</style>
