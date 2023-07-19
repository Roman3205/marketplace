<script>
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import SellerSideBar from './components/SellerSideBar.vue'

export default {
  components: {
    RouterView,
    AppFooter,
    AppHeader,
    SellerSideBar
  },

  computed: {
    Auth() {
      return this.$route.name === 'signup' || this.$route.name === 'login'
    },

    Seller() {
      return this.$route.name === 'sellLogin' || this.$route.name === 'sellSignup'
    },

    NotFound() {
      return this.$route.name === 'notfound'
    },

    SellerMenu() {
      return this.$route.name === 'statistics' || this.$route.name === 'sellrefund' || this.$route.name === 'manage' || this.$route.name === 'sellchats' || this.$route.name === 'sellmessenger'
    }
  }
}
</script>

<template>
  <div class="app">
    <div class="col" v-if="!Auth && !Seller && !SellerMenu && !NotFound">
      <div class="row header">
        <app-header></app-header>
      </div>
      <div class="row content-app">
        <router-view></router-view>
      </div>
      <div class="row footer">
        <app-footer></app-footer>
      </div>
    </div>
    <router-view v-if="Auth"></router-view>
    <router-view v-if="Seller"></router-view>
    <router-view v-if="NotFound"></router-view>
    <div class="seller" v-if="SellerMenu">
      <div class="sidebar-seller">
        <seller-side-bar></seller-side-bar>
      </div>
      <div class="router-seller">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'FreeMono', monospace;
    overflow-x: hidden;
  }

  html::-webkit-scrollbar {
    background: rgb(208, 208, 208);
    width: 10px;
  }

  html::-webkit-scrollbar-thumb {
    background: rgb(145, 51, 208);
    width: 10px;
    height: 35%;
  }

  .content-app {
    min-height: calc(100vh - 735px);
  }

  .changemenu-opacity {
    opacity: 0.4;
  }

  textarea {
    outline: none;
  }

  .app {
    display: flex;
    justify-content: center;
  }

  .seller {
    display: flex;
    background-color: #efefef;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }

  .sidebar-seller {
    width: 25%;
  }

  .router-seller {
    width: 100%;
    background-color: #efefef;
    display: flex;
    justify-content: center;
  }

  @media screen and (max-width: 900px) {
    .seller {
      flex-direction: column;
      justify-content: start;
    }

    .sidebar-seller {
      width: 100%;
      overflow: hidden;
      min-height: 120.5px!important;
    }

    .opener-sell {
      position: absolute;
      top: 370px;
    }

    .router-seller {
      overflow: hidden;
    }
  }
</style>
