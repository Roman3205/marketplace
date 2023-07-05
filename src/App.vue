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
    }
  }
}
</script>

<template>
  <div class="app">
    <div class="col" v-if="!Auth">
      <div class="row header">
        <app-header></app-header>
      </div>
      <div class="row content">
        <router-view></router-view>
      </div>
      <div class="row footer">
        <app-footer></app-footer>
      </div>
    </div>
    <router-view v-if="Auth"></router-view>
  </div>
</template>

<style>
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: 'FreeMono', monospace;
    overflow-x: hidden;
  }

  .content {
    min-height: calc(100vh - 535px);
  }
</style>
