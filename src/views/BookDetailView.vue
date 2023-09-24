<template>
  <!-- BookDetail page bookslaar sahifasi -->
  <BookDetail
    @booksRenderView="booksRenderView"
    @onMountedView="onMountedView"
    :book="book"
    :books="books"
    :isLoading="isLoading"
    :isError="isError"
    :filteredBooks="
      books.filter((item) => item.id !== router.currentRoute.value.params.id)
    "
  />
</template>

<script setup>
import { useRouter } from "vue-router";
import BookDetail from "../components/BookDetail.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";

let store = useStore();
let router = useRouter();

let books = ref([]);
let book = ref(null);

let isLoading = computed(() => store.state.isLoading);
let isError = computed(() => store.state.isError);

function booksRenderView() {
  store.dispatch("fetchBooks").then(() => {
    books.value = store.state.books;
    book.value = books.value.find(
      (item) => item.id === router.currentRoute.value.params.id
    );
    console.log(router.currentRoute.value.params.id);
  });
}

async function onMountedView() {
  store.dispatch("fetchBooks").then(() => {
    books.value = store.state.books;
    book.value = books.value.find(
      (item) => item.id === router.currentRoute.value.params.id
    );
    console.log(router.currentRoute.value.params.id);
  });
}
</script>

<style scoped></style>
