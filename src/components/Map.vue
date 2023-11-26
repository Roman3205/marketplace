<script setup lang="ts">
import { ref } from "vue";
import * as vNG from "v-network-graph";
import data from "./data";

const graph = ref<vNG.Instance>();
</script>

<template>
  <v-network-graph
    ref="graph"
    :nodes="data.nodes"
    :edges="data.edges"
    :layouts="data.layouts"
    :configs="data.configs"
  >
  </v-network-graph>
</template>

<style scoped>
* {
  pointer-events: none;
  width: 500px;
  height: 400px;
}
</style>
