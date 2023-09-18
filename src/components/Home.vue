<template>
  <!-- Asosiy konteyner -->
  <div class="container">
    <div class="books">
      <!-- Yuklenmoqda xabari -->
      <div v-if="isLoading" class="boxLoading">
        <span class="booksLoader"></span>
      </div>

      <!-- Kitob topilmadi xabari -->
      <div v-else-if="isNotValue" class="boxError">
        <i class="fa-solid fa-triangle-exclamation"></i>

        <p>Kitob Topilmadi !</p>
      </div>

      <!-- Xatolik xabari -->
      <div v-else-if="isError" class="boxError">
        <i class="fa-solid fa-triangle-exclamation"></i>

        <p>Xatolik chiqdi !</p>
      </div>

      <!-- Kitoblar ro'yxati -->
      <div
        class="wrapper-book"
        v-else
        v-for="(book, index) in $store.state.books"
        :key="book.id"
      >
        <div class="book">
          <!-- Kitob rasmı -->
          <div class="box-img" v-if="book.volumeInfo.imageLinks">
            <img :src="book.volumeInfo.imageLinks?.thumbnail" alt="None" />
          </div>

          <!-- Rasm mavjud emas xabari -->
          <div class="none-img" v-else>
            <p>Rasm mavjud emas!</p>
          </div>

          <!-- Kitob ma'lumotlari -->
          <div class="box-title">
            <p>
              <span class="athors">Yozuvchilar: </span
              >{{ book.volumeInfo.authors?.join(" | ") }}
            </p>

            <p class="title-lorem-book">
              {{ book.volumeInfo?.title }}
            </p>

            <!-- Ko'rish tugmasi -->
            <RouterLink :to="{ name: 'book', params: { id: book.id } }">
              <button class="detail-icon">Ko'rish</button>
            </RouterLink>
          </div>

          <!-- Kitob tartibi -->
          <span class="index-book">{{ index + 1 }}</span>
        </div>
      </div>
    </div>

    <!-- Sahifalash tugmalar joyi -->
    <div v-if="!isError && !isLoading && !isNotValue" class="box-pogination">
      <button
        @click="prevPage"
        :disabled="currentPage <= 1"
        class="all-button"
        :class="currentPage <= 1 ? 'd-button' : null"
      >
        Oldingisi
      </button>
      <span>{{ currentPage }}</span>
      <button
        @click="nextPage"
        class="all-button"
        :class="currentPage === totalPage"
      >
        Keyingisi
      </button>
    </div>
  </div>

  <!-- Past yoki ustida bog'lanishi yuqoridagi qismi -->
  <div v-if="!isError && !isLoading && !isNotValue">
    <FooterCode />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import FooterCode from "./Footer.vue";

let hookStore = useStore();

// Xabarlar va sahifalashni ma'lumotlari
let isLoading = computed(() => hookStore.state.isLoading);
let isError = computed(() => hookStore.state.isError);
let currentPage = computed(() => hookStore.state.currentPage);
let totalPage = computed(() => hookStore.state.totalPage);
let isNotValue = computed(() => hookStore.state.isNotValue);

// Oldingi sahifaga o'tish funksiyasi
function prevPage() {
  hookStore.commit("prevPage");
  hookStore.dispatch("fetchBooks");
}

// Keyingi sahifaga o'tish funksiyasi
function nextPage() {
  hookStore.commit("nextPage");
  hookStore.dispatch("fetchBooks");
}

// Sahifaning yuklanishida kitoblarni olish
onMounted(() => {
  hookStore.dispatch("fetchBooks");
});
</script>

<style>
.box-pogination {
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: end;
  margin-bottom: 25px;
  margin-top: 10px;
  gap: 15px;

  & span {
    font-size: 20px;
    font-weight: 600;
    background-color: #fa7c54;
    padding: 5px 10px;
    color: white;
    border-radius: 5px;
  }
}

.boxLoading {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.athors {
  color: #fa7c54;
  font-weight: 600;
}

.box-img {
  box-shadow: 0 0 20px 0 rgba(128, 128, 128, 0.317);
  min-width: 130px;
  height: 200px;
  margin-left: -60px;
  border-radius: 10px;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
  }
}

.none-img {
  box-shadow: 0 0 20px 0 rgba(128, 128, 128, 0.317);
  background-color: white;
  min-width: 130px;
  height: 200px;
  margin-left: -60px;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;

  & p {
    font-size: 18px;
    color: red;
  }
}

.box-title :nth-child(1) {
  font-size: 14px;
}
.book {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-width: 280px;
  padding: 20px;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.137);

  & .all-button {
    border-radius: 5px !important;
  }
}

.index-book {
  position: absolute;
  top: 0;
  right: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 20px !important;
  background-color: #fa7c54;
  width: 30px;
  height: 30px;
  border-radius: 0 0 15px 15px;
}

.books {
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.wrapper-book {
  padding: 15px 30px;
}

.title-lorem-book {
  font-weight: 600;
}

.detail-icon {
  background-color: #fa7c54;
  border: 2px solid #fa7c54;
  color: white;
  padding: 4px 6px;
  width: 100%;
  border-radius: 3px;
  font-weight: 600;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    color: #fa7c54;
    transition: 0.3s;
  }
}

.boxError {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: red;

  & i {
    font-size: 50px !important;
  }
}

@media only screen and (max-width: 780px) and (min-width: 600px) {
  .book {
    flex-direction: column;
    text-align: center;
    max-width: 200px;
  }

  .none-img {
    min-width: 130px;
    height: 200px;
    margin-left: 0;
  }

  .box-img {
    min-width: 130px;
    height: 150px;
    margin-left: 0 !important;
  }
}

@media only screen and (max-width: 600px) and (min-width: 300px) {
  .book {
    gap: 10px;
    min-width: 300px !important;
    padding: 20px;
    border-radius: 5px;
    position: relative;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.137);

    & .all-button {
      border-radius: 5px !important;
    }
  }

  .none-img {
    min-width: 90px;
    height: 200px;
    margin-left: 0;
  }

  .box-img {
    min-width: 90px;
    height: 150px;
    margin-left: 0 !important;
  }
}
</style>
