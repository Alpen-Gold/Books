<template>
  <!-- Yuklash davomi (isLoading) -->
  <div v-if="isLoading" class="boxLoading">
    <span class="booksLoader"></span>
  </div>

  <div class="boxError" v-else-if="book === null">
    <i class="fa-solid fa-triangle-exclamation"></i>

    <p>Bunday Shifa Topilmadi !</p>
  </div>

  <!-- Xatolikni ko'rsatish (isError) -->
  <div v-else-if="isError" class="boxError">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p>Xatolik chiqdi !</p>
  </div>

  <!-- Kitob tavsif va ma'lumotlar (book) -->
  <div class="box-book-cards" v-else>
    <div class="book-cards container">
      <div class="box-img-book" v-if="book?.volumeInfo?.imageLinks">
        <img :src="book?.volumeInfo?.imageLinks?.smallThumbnail" alt="None" />
      </div>
      <div class="none-img-book" v-else>
        <p>Rasm mavjud emas!</p>
      </div>

      <div class="book-title">
        <h3>{{ book?.volumeInfo?.title }}</h3>

        <p>
          <span class="athors">Yozuvchilar: </span
          >{{ book?.volumeInfo?.authors?.join(" | ") }}
        </p>

        <p>
          <span class="athors">Mamlakat: </span
          >{{ book?.saleInfo?.country || "Mamlakat topilmadi" }}
        </p>

        <p>
          <span class="athors">Miqdori: </span
          >{{ book?.saleInfo?.listPrice?.amount }}
          {{ book?.saleInfo?.listPrice?.currencyCode || "Miqdori yoq" }}
        </p>

        <div class="starts">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>

        <div class="box-button-books">
          <button class="all-button">
            <a :href="book?.volumeInfo?.previewLink" target="_blank"
              ><i class="fa-solid fa-eye"></i
            ></a>
          </button>

          <button class="all-button">
            <a :href="book?.volumeInfo?.infoLink" target="_blank"
              ><i class="fa-solid fa-info"></i
            ></a>
          </button>

          <button class="all-button">
            <a :href="book?.saleInfo?.buyLink" target="_blank">Sotib olish</a>
          </button>
        </div>
      </div>
    </div>

    <!-- Kitob tavsifi -->
    <div class="box-description container">
      <p>
        <span class="description">Tavsif: </span
        >{{ book?.volumeInfo?.description || "Tavsif mavjud emas !" }}
      </p>
    </div>

    <!-- O'xshash kitoblar (books) -->
    <div class="books">
      <div
        class="wrapper-book"
        v-for="(similarBook, index) in books.filter(
          (item) => item.id !== router.currentRoute.value.params.id
        )"
        :key="similarBook.id"
      >
        <div class="book-similar">
          <div class="box-img" v-if="similarBook?.volumeInfo.imageLinks">
            <img
              :src="similarBook?.volumeInfo.imageLinks?.thumbnail"
              alt="None"
            />
          </div>

          <div class="none-img" v-else>
            <p>Rasm mavjud emas!</p>
          </div>

          <div class="box-title">
            <p>
              <span class="athors">Yozuvchilar: </span
              >{{ similarBook?.volumeInfo.authors?.join(" | ") }}
            </p>

            <p class="title-lorem-book">{{ similarBook?.volumeInfo?.title }}</p>

            <RouterLink :to="{ name: 'book', params: { id: similarBook.id } }">
              <button class="detail-icon" @click="booksRender">Ko'rish</button>
            </RouterLink>
          </div>

          <span class="index-book">{{ index + 1 }}</span>
        </div>
      </div>
    </div>

    <!-- Pastilka tugashi -->
    <FooterCode />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import FooterCode from "./Footer.vue";

let store = useStore();
let router = useRouter();

let books = ref([]);
let book = ref(null);
let typeNotFount = ref(false);
let isLoading = computed(() => store.state.isLoading);
let isError = computed(() => store.state.isError);

// Kitoblar ro'yxatini yangilash funktsiyasi
function booksRender() {
  store.dispatch("fetchBooks").then(() => {
    books.value = store.state.books;
    book.value = books.value.find(
      (item) => item.id === router.currentRoute.value.params.id
    );
    console.log(router.currentRoute.value.params.id);
  });
}

// Komponent yuklandiğida kitoblar ro'yxatini yangilash
onMounted(async () => {
  store.dispatch("fetchBooks").then(() => {
    books.value = store.state.books;
    book.value = books.value.find(
      (item) => item.id === router.currentRoute.value.params.id
    );
    console.log(router.currentRoute.value.params.id);
  });
});
</script>

<style scoped>
.boxLoading,
.boxError {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.book-cards {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 30px;
  margin-top: 30px;
}

.box-img {
  min-width: 130px;
  min-height: 200px;
  border-radius: 10px;
  object-fit: cover;
  & img {
    box-shadow: 0 0 20px 0 rgba(128, 128, 128, 0.317);
    border-radius: 10px;
    width: 100%;
    min-height: 100%;
  }
}

.none-img-book {
  box-shadow: 0 0 20px 0 rgba(128, 128, 128, 0.317);
  background-color: white;
  min-width: 130px;
  height: 200px;
  border-radius: 10px;
  text-align: center;
  margin-left: 0;
  & p {
    font-size: 18px;
    color: red;
  }
}

.box-button-books {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  margin-top: 15px;
}

.book-title .athors,
.description {
  color: #fa7c54;
  font-weight: 600;
}

.box-description {
  font-size: 18px;
  line-height: 1.6;
  letter-spacing: 1.5px;
}

.starts {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  color: rgb(241, 188, 53);
}

.wrapper-book {
  padding: 15px 30px;
}

.books {
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.book-similar {
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
.box-img-book {
  min-width: 130px;
  min-height: 200px;
  margin-left: 0;
  & img {
    border-radius: 10px;
    min-height: 100%;
    min-width: 100%;
  }
}
</style>
