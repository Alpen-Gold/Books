<template>
  <!-- Login sahifasi boshlanishi -->
  <div class="login_page">
    <div class="login">
      <div class="logo">
        <img src="../img/Logo1.png" alt="logo" data-test-img-logo />
        <h3>Xush Kelibsiz !</h3>
        <span>Raqamli kutubxonangizni davom ettirish uchun tizimga kiring</span>
      </div>
      <form @submit="loginForm" class="form" data-test-form>
        <!-- Foydalanuvchi nomini kiritish maydoni -->
        <input
          type="text"
          name="username"
          v-model="username"
          placeholder="Username . . ."
          class="search-input"
          data-test-input-token
        />

        <!-- Xatolik xabari -->
        <div v-if="usernameError" class="error-message">
          {{ usernameError }}
        </div>

        <!-- Kirish tugmasi -->
        <button
          type="submit"
          class="all-button btn_login"
          :disabled="disabled"
          data-test-button-login
        >
          <span v-if="disabled" class="loader"></span>
          {{ disabled ? "" : "Kirish" }}
        </button>
      </form>
    </div>
  </div>
  <!-- Login sahifasi tugashi -->
</template>

<script setup>
import { ref } from "vue";

let username = ref("");
let usernameError = ref("");
let disabled = ref(false);
const usernameRegex = /^[a-zA-Z]{16,}$/;

let props = defineProps({
  ucerInfoAndIsLogin: { type: Function },
});

function loginForm(event) {
  event.preventDefault();

  if (usernameRegex.test(username.value)) {
    usernameError.value = "";
    disabled.value = true;

    setTimeout(() => {
      props.ucerInfoAndIsLogin(username);
    }, 3000);
  } else {
    usernameError.value = "Foydalanuvchi nomida xatolik mavjud!";
  }
}
</script>

<style scoped>
/* CSS qismi */

.error-message {
  color: #fa7c54;
  margin-top: 7px;
}

.login_page {
  width: 100%;
  height: 100vh;
  background-image: url("../img/Vector2.png");
  background-size: 88%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);
  width: 412px;
  padding: 36px;
}

.logo {
  text-align: center;
}

.logo img {
  object-fit: cover;
  width: 128px;
}

.logo h3 {
  color: #4d4d4d;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 2px;
}

.logo span {
  color: #ababab;
  font-size: 12px;
  font-weight: 400;
}

.form {
  display: flex;
  flex-direction: column;
  margin: 16px 0;
  margin-bottom: 0;
}

.search-input {
  width: 100%;
  background-color: white;
  border: 2px solid #fa7c54;
  color: #fa7c54;
  outline: none;
  border-radius: 7px;
  padding: 7px 10px;
  font-size: 15px;

  transition: width 0.3s ease-in-out;
}

.search-input::placeholder {
  color: #fa7c54;
}

.btn_login {
  width: 100%;
  margin-top: 15px;
}

@media only screen and (max-width: 600px) and (min-width: 300px) {
  .login {
    width: 300px;
    padding: 36px;
  }
}
</style>
