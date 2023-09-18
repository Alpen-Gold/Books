import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    apiKey: "AIzaSyBnwVB6wKC1WTHbckBRr7dCYbKfMU5VX2M",
    books: [],
    isLogin: JSON.parse(localStorage.getItem("token")) === true || false,
    searchQuery: localStorage.getItem("searchValue"),
    ucerInfo: JSON.parse(localStorage.getItem("ucerInfo")),
    isLoading: false,
    isError: false,
    currentPage: 1,
    totalPage: 1,
    isNotValue: false,
    typeViewBook: true,
    notFoundView: true,
  },

  mutations: {
    // API kalitini sozlash
    setApiKey(state, apiKey) {
      state.apiKey = apiKey;
    },

    // Kitoblar ro'yxatini sozlash
    setBooks(state, books) {
      state.books = books;
    },

    // Kirishni o'rnatish
    setIsLogin(state, isLogin) {
      localStorage.setItem("token", JSON.stringify(isLogin));
      state.isLogin = isLogin;
    },

    // Qidiruv so'rovini o'zgartirish
    setSearchQuery(state, value) {
      localStorage.setItem("searchValue", value);
      state.searchQuery = value;
    },

    // Foydalanuvchi ma'lumotlarini o'zgartirish
    setUserInfo(state, value) {
      let ucerInfo = {
        ucername: String(value),
      };
      localStorage.setItem("ucerInfo", JSON.stringify(ucerInfo));
    },

    // Yuklashni o'zgartirish
    setLoading(state, value) {
      state.isLoading = value;
    },

    // Oldingi sahifaga o'tish
    prevPage(state) {
      if (state.currentPage > 1) {
        state.currentPage--;
      }
    },

    // Keyingi sahifaga o'tish
    nextPage(state) {
      if (state.currentPage < state.totalPage) {
        state.currentPage++;
      }
    },

    // Kitoblar ko'rinishini o'zgartirish
    setTypeViewBook(state, value) {
      state.typeViewBook = value;
    },

    setNotFoundView(state, value) {
      state.notFoundView = value;
    },
  },

  actions: {
    // Kitoblar ro'yxatini olish
    async fetchBooks(context) {
      context.commit("setLoading", true);
      const { searchQuery, currentPage, apiKey, totalPage } = context.state;

      try {
        let response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes",
          {
            params: {
              q:
                String(searchQuery) !== ""
                  ? String(searchQuery)
                  : "programming",

              startIndex: (currentPage - 1) * 20,
              maxResults: 10,
              key: apiKey,
            },
          }
        );

        context.commit("setBooks", response.data.items);
        context.state.totalPage = Math.ceil(response.data.totalItems - 1 / 30);

        if (totalPage < 1) context.state.isNotValue = true;
        else context.state.isNotValue = false;
      } catch (error) {
        context.state.isError = true;
        console.error(error);
      } finally {
        context.commit("setLoading", false);
      }
    },
  },

  getters: {},
});
