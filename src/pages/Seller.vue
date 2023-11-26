<template>
  <div class="seller">
    <div class="sidebar-seller">
      <seller-side-bar></seller-side-bar>
    </div>
    <div class="router-seller">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SellerSideBar from "@/components/SellerSideBar.vue";
</script>

<style></style>
