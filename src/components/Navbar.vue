<template>
  <!-- Navbar start -->
  <nav v-if="props.notFoundView">
    <div class="container">
      <div class="navbar">
        <div>
          <!-- Logo -->
          <RouterLink :to="{ name: 'books' }">
            <div class="logo" id="logo">
              <a href="#">
                <img :src="logo" alt="" class="logo" data-test-img
              /></a>
            </div>
          </RouterLink>

          <!-- "Books" button -->

          <div v-if="!props.typeViewBook">
            <RouterLink :to="{ name: 'books' }" class="test-click">
              <button
                class="all-button books-home"
                id="exit_books"
                data-test-page-book
              >
                <i class="fa-solid fa-arrow-left"></i> Kitoblar
              </button>
            </RouterLink>
          </div>
        </div>

        <!-- Search form -->
        <form class="search" v-if="props.typeViewBook">
          <input
            type="text"
            placeholder="Search..."
            class="search-input"
            id="search-input"
            @input="inputHandle"
            data-test-input-search
          />

          <button class="all-button" @click="search" id="click-search-btn">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        <!-- Login / Logout button -->
        <div class="">
          <button
            v-if="props.is_Login"
            class="all-button"
            @click="logOut"
            data-test-log-out
          >
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>
  <!-- Navbar end -->
</template>

<script setup>
import logo from "@/img/Logo1.png";
import { RouterLink } from "vue-router";

const emit = defineEmits(["isLogin", "searchQuery", "fetchBooksAndCurrent"]);

let props = defineProps({
  notFoundView: { type: Boolean },
  typeViewBook: { type: Boolean },
  is_Login: { type: Boolean },
});

function logOut() {
  emit("isLogin");
}

function inputHandle(value) {
  emit("searchQuery", value);
}

function search(e) {
  e.preventDefault();
  emit("fetchBooksAndCurrent");
}
</script>

<style scoped>
nav {
  background-color: white;
  box-shadow: 0 10px 20px 0 #00000011;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.search {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
}

.search-input {
  background-color: white;
  border: 2px solid #fa7c54;
  color: #fa7c54;
  outline: none;
  border-radius: 7px;
  padding: 7px 10px;
  font-size: 15px;
  width: 300px;
  transition: width 0.3s ease-in-out;
}

.search-input::placeholder {
  color: #fa7c54;
}

.logo {
  max-width: 70px;
}

.books-home {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 20px;
}

.navbar :nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media only screen and (max-width: 780px) and (min-width: 600px) {
  .search-input {
    padding: 7px 10px;
    font-size: 15px;
    width: 200px;
  }
}

@media only screen and (max-width: 600px) and (min-width: 300px) {
  .search-input {
    padding: 7px 10px;
    font-size: 15px;
    width: 100px;
  }

  .logo {
    max-width: 70px;

    .navbar {
      padding: 10px 0;
    }
  }
}
</style>
