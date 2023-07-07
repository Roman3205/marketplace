<script>

const scrollWin = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

export default {
  data() {
    return {
      showScroll: false
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
      const position = document.documentElement.scrollTop

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
          <h4>Покупателям</h4>
          <ul>
            <li>Как сделать заказ</li>
            <li @click="goRoute($event, 'sposob')" >Способы оплаты</li>
            <li @click="goRoute($event, 'vozvrat')" >Возврат товара</li>
            <li @click="goRoute($event, 'pravilapol')" >Правила пользования торговой<br> площадкой</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Партнерам</h4>
          <ul>
            <li @click="goRoute($event, 'sellLogin')" >Продавайте на Marketplace</li>
            <li @click="goRoute($event, 'pravilapr')" >Правила продажи</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Компания</h4>
          <ul>
            <li @click="goRoute($event, 'about-us')" >О нас</li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        <p>2023 © Marketplace — интернет-магазин одежды, обуви и аксессуаров. <br>Все права защищены.</p>
      </div>
      <div class="scroll-up" @click="scrollUp" v-if="showScroll" >
        <i class="fa fa-arrow-up"></i>
      </div>
    </div>
</template>

<style scoped>
  @import '../assets/scss/footer.scss';
</style>