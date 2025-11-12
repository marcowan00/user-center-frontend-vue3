<template>
  <div id="homePage">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup>
import useLoginUserStore from "../stores/useLoginUserStore";

const msg = "欢迎来到用户中心！";
</script>

<style scoped>
#homePage {
}
</style>
