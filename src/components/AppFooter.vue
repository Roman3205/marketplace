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

    scrollUp(e) {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },

    goOplata(evt) {
      evt.preventDefault()
      this.$router.push({
        name: 'sposob'
      })
      scrollWin()
    },

    goVozvrat(evt) {
      evt.preventDefault()
      this.$router.push({
        name: 'vozvrat'
      })
      scrollWin()
    },

    goPravilaPol(evt) {
      evt.preventDefault()
      this.$router.push({
        name: 'pravilapol'
      })
      scrollWin()
    },

    goPravilaPr(evt) {
      evt.preventDefault()
      this.$router.push({
        name: 'pravilapr'
      })
      scrollWin()
    },

    goSeller(evt) {
      evt.preventDefault()
      this.$router.push({
        name: 'sellLogin'
      })
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
            <li @click="goOplata" >Способы оплаты</li>
            <li @click="goVozvrat" >Возврат товара</li>
            <li @click="goPravilaPol" >Правила пользования торговой<br> площадкой</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Партнерам</h4>
          <ul>
            <li @click="goSeller" >Продавайте на Marketplace</li>
            <li @click="goPravilaPr" >Правила продажи</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Компания</h4>
          <ul>
            <li>О нас</li>
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
.container {
    background-color: rgb(145, 51, 208);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 30px 30px 0px 0px;
    height: 600px;
    gap: 50px;
}

.footer {
    display: flex;
    justify-content: center;
    color: #e6e6e6;
    gap: 200px;
    padding-top: 60px;
}

ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.scroll-up {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: rgb(208, 107, 248);
  color: #e6e6e6;
  position: fixed;
  bottom: 50px;
  align-self: flex-start;
  left: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  cursor: pointer;
}

.footer-col h4 {
    font-size: 18px;
    text-transform: capitalize;
    margin-bottom: 35px;
    font-weight: 500;
    position: relative;
    padding-left: 30px;
    font-size: 32px;
}

.footer-col ul li {
    text-decoration: none;
    font-weight: 300;
    transition: all 0.5s ease;
    font-size: 21px;
    cursor: pointer;
}

.copyright {
  text-align: center;
  color: #e6e6e6;
}

.footer-col ul li:hover {
  opacity: 0.7;
}

@media screen and (max-width: 767px) {
    .container {
        flex-direction: column;
        height: fit-content;
        gap: 20px;
    }

    .footer-col:last-child {
        margin-bottom: 60px;
    }
}

</style>