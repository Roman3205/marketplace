<template>
  <div class="col">
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
</template>

<script lang="ts" setup>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<style></style>
