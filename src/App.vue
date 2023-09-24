<template>
  <!--HTML-->

  <!-- Navbar -->
  <div>
    <Navbar
      v-if="$store.state.isLogin"
      :notFoundView="$store.state.notFoundView"
      :typeViewBook="$store.state.typeViewBook"
      :is_Login="$store.state.isLogin"
      @fetchBooksAndCurrent="fetchBooksAndCurrent"
      @searchQuery="searchQuery"
      @isLogin="isLogin"
    />
  </div>

  <!-- View Router -->
  <RouterView />
</template>

<script setup>
//JavaScript

// imports
import { useStore } from "vuex";
import Navbar from "./components/Navbar.vue";
import { RouterView, useRouter } from "vue-router";
let router = useRouter();
let hookStore = useStore();

function fetchBooksAndCurrent() {
  hookStore.commit("setCurrentPage");
  hookStore.dispatch("fetchBooks");
}

function searchQuery(value) {
  hookStore.commit("setSearchQuery", value.target.value);
}

function isLogin() {
  hookStore.commit("setIsLogin", false);
  router.push("/login");
}
</script>

<style scoped>
/*CSS*/
</style>
