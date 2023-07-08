<script>
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  components: {
    RouterView,
    AppFooter,
    AppHeader
  },

  computed: {
    Auth() {
      return this.$route.name === 'signup' || this.$route.name === 'login'
    },

    Seller() {
      return this.$route.name === 'sellLogin' || this.$route.name === 'sellSignup'
    }
  }
}
</script>

<template>
  <div class="app">
    <div class="col" v-if="!Auth && !Seller">
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
    width: 12px;
  }

  html::-webkit-scrollbar-thumb {
    background: rgb(145, 51, 208);
    width: 12px;
    height: 35%;
  }

  .changemenu-opacity {
    opacity: 0.4;
  }
</style>
