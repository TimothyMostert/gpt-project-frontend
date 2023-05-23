<template>
  <div>
    <input type="text" name="name" id="name" v-model="name" />
    <input type="email" name="email" id="email" v-model="email" />
    <input type="password" name="password" id="password" v-model="password" />
    <div @click="user_register()">Register with password</div>
    <br />
    <br />
    <div>Login</div>
    <input type="email" name="email" id="email" v-model="email" />
    <input type="password" name="password" id="password" v-model="password" />
    <div @click="user_login()">Login with password</div>
    <div @click="google_login()">Login with google</div>
  </div>
</template>

<script setup>
import Api from "@/services/Api.service.js";
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");

const user_register = async () => {
  const data = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  const response = await Api.user_register(data);
  console.log(response);
};

const user_login = async () => {
  const data = {
    email: email.value,
    password: password.value,
  };
  const response = await Api.user_login(data);
  console.log(response);
};

const google_login = async () => {
  const response = await Api.google_login();
    console.log(response.data);
  window.location.href = response.data;
};
</script>

<style lang="scss" scoped></style>
