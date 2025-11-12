<template>
  <div id="app"><BasicLayout /></div>
</template>

<script setup lang="ts">
import BasicLayout from "./layouts/BasicLayout.vue";
import useLoginUserStore from "./stores/useLoginUserStore";

console.log(process.env.NODE_ENV);

const loginUserStore = useLoginUserStore();
loginUserStore.fetchLoginUser();
</script>

<style scoped></style>
