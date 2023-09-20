<template>
  <!-- Navbar start -->
  <nav v-if="$store.state.notFoundView">
    <div class="container">
      <div class="navbar">
        <div>
          <!-- Logo -->
          <RouterLink :to="{ name: 'books' }">
            <div class="logo">
              <a href="#"> <img :src="logo" alt="" class="logo" /></a>
            </div>
          </RouterLink>

          <!-- "Books" button -->
          <RouterLink v-if="!$store.state.typeViewBook" :to="{ name: 'books' }">
            <button class="all-button books-home">
              <i class="fa-solid fa-arrow-left"></i> Kitoblar
            </button>
          </RouterLink>
        </div>

        <!-- Search form -->
        <form class="search" v-if="$store.state.typeViewBook">
          <input
            type="text"
            placeholder="Search..."
            class="search-input"
            @input="inputHandle"
          />
          <button class="all-button" @click="search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        <!-- Login / Logout button -->
        <div class="login">
          <RouterLink
            v-if="$store.state.isLogin"
            class="all-button"
            @click="logOut"
            :to="{ name: 'login' }"
          >
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
  <!-- Navbar end -->
</template>

<script setup>
import logo from "@/img/Logo1.png";
import { RouterLink } from "vue-router";
import { useStore } from "vuex";
let hookStore = useStore();

function logOut() {
  hookStore.commit("setIsLogin", false);
}

function inputHandle(value) {
  hookStore.commit("setSearchQuery", value.target.value);
}

function search(e) {
  console.log(e);
  e.preventDefault();
  hookStore.commit("setCurrentPage");
  hookStore.dispatch("fetchBooks");
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
