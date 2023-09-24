<template>
  <!--HTML-->

  <!-- Login page -->
  <Login :ucerInfoAndIsLogin="ucerInfoAndIsLogin" />
</template>

<script setup>
//JavaScript

import { useStore } from "vuex";
import Login from "../components/Login.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

let storeHook = useStore();

let router = useRouter();

function ucerInfoAndIsLogin(username) {
  storeHook.commit("setUserInfo", username);
  storeHook.commit("setIsLogin", true);
  router.push("/books");
}
</script>

<style scoped>
/*CSS*/
</style>
