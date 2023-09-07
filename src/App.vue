<script>
console.log(document.cookie);
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
      let authRoutes = ['signup', 'login']
      return authRoutes.includes(this.$route.name)
    },

    Seller() {
      let sellerRoutes = ['sellLogin', 'sellSignup']
      return sellerRoutes.includes(this.$route.name)
    },

    NotFound() {
      return this.$route.name === 'notfound';
    },

    SellerMenu() {
      let sellerMenuRoutes = ['statistics', 'sellrefund', 'manage', 'sellchats', 'sellmessenger']
      return sellerMenuRoutes.includes(this.$route.name)
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

    .notification {
      position: fixed;
      top: 50px;
      right: 50px;
      animation-name: notification;
      animation-duration: 8s;
      transform: translateX(50px);
      opacity: 0;
      visibility: hidden;
      cursor: pointer;
  }

  @keyframes notification {
      0% {
        opacity: 0;
        visibility: hidden;
      }

      50% {
          transform: translateX(-50px);
          transition: opacity 0.2s ease, visibility 0.2s ease;
          opacity: 1;
          visibility: visible;
      }

      80% {
          transform: translateX(200px);
          transition: opacity 0.2s ease, visibility 1s ease;
          opacity: 0;
          visibility: hidden;
      }
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
