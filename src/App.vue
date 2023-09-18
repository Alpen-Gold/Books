<template>
  <!--HTML-->

  <!-- Navbar -->
  <div>
    <Navbar v-if="$store.state.isLogin" />
  </div>

  <!-- View Router -->
  <RouterView />
</template>

<script setup>
//JavaScript

// imports
import Navbar from "./components/Navbar.vue";
import { RouterView } from "vue-router";
</script>

<style scoped>
/*CSS*/
</style>
