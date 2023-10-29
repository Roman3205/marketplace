<script>

const scrollWin = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

export { scrollWin }

export default {
  data() {
    return {
      showScroll: false,
      backgroundColor: '#55711a',
      color: '#a6ba95'
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      let position = document.documentElement.scrollTop
      if (position > 400) {
        this.showScroll = true
      } else {
        this.showScroll = false
      }
    },

    scrollUp(evt) {
      evt.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },

    goRoute(evt, routeTo) {
      evt.preventDefault()
      this.$router.push({
        name: routeTo
      })
      scrollWin()
    }
  }
};

</script>

<template>
    <div class="container">
      <div class="container__footer footer">
        <div class="footer-col">
          <h2>Покупателям</h2>
          <ul>
            <li @click="goRoute($event, 'create-manual')">Как сделать заказ</li>
            <li @click="goRoute($event, 'sposob')" >Способы оплаты</li>
            <li @click="goRoute($event, 'vozvrat')" >Возврат товара</li>
            <li @click="goRoute($event, 'pravilapol')" >Правила пользования<br> торговой площадкой</li>
          </ul>
        </div>
        <div class="footer-col">
          <h2>Партнерам</h2>
          <ul>
            <li @click="goRoute($event, 'sellLogin')" >Продавайте на Gorza</li>
            <li @click="goRoute($event, 'pravilapr')" >Правила продажи</li>
          </ul>
        </div>
        <div class="footer-col">
          <h2>Компания</h2>
          <ul>
            <li @click="goRoute($event, 'about-us')" >О нас</li>
          </ul>
        </div>
      </div>
      <div class="menu-bars">
        <div class="home" @click="goRoute($event, 'main')">
          <img src="/images/house.png" alt="" width="40">
        </div>
        <div class="cart" @click="goRoute($event, 'cart')">
          <img src="/images/shop-cart.png" alt="" width="40">
        </div>
        <div class="seller-icon" @click="goRoute($event, 'sellLogin')">
          <img src="/images/seller.png" alt="" width="40">
        </div>
        <div class="user" @click="goRoute($event, 'lk')">
          <img src="/images/user-icon.png" alt="" width="40">
        </div>
      </div>
      <div class="copyright">
        <p>2023 © Gorza Marketplace — интернет-магазин одежды, обуви и аксессуаров. <br>Все права защищены.</p>
      </div>
      <div class="scroll-up inden-scroll" @click="scrollUp" v-if="showScroll" >
        <i class="fa fa-arrow-up"></i>
      </div>
    </div>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/footer.scss';

  .scroll-up {
    background-color: v-bind(backgroundColor)!important;
    color: v-bind(color)!important;

    i {
      background-color: v-bind(backgroundColor)!important;
      color: v-bind(color)!important;
    }
  }
</style>