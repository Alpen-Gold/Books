<template>
  <!-- Home page bookslaar sahifasi -->
  <Home
    :storeElements="{ isNotValue, totalPage, currentPage, isError, isLoading }"
    :books="$store.state.books"
    @prevPageView="prevPageView"
    @nextPageView="nextPageView"
    @mountView="mountView"
  />
</template>

<script setup>
import { computed } from "vue";
import Home from "../components/Home.vue";
import { useStore } from "vuex";

let hookStore = useStore();

let isLoading = computed(() => hookStore.state.isLoading);
let isError = computed(() => hookStore.state.isError);
let currentPage = computed(() => hookStore.state.currentPage);
let totalPage = computed(() => hookStore.state.totalPage);
let isNotValue = computed(() => hookStore.state.isNotValue);

function prevPageView() {
  hookStore.commit("prevPage");
  hookStore.dispatch("fetchBooks");
}

function nextPageView() {
  hookStore.commit("nextPage");
  hookStore.dispatch("fetchBooks");
}

function mountView() {
  hookStore.dispatch("fetchBooks");
}
</script>

<style scoped></style>
