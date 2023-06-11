<template>
  <MainLayout>
    <div class="w-100 flex justify-center">
      <div class="flex min-h-full flex-1 mt-36 lg:max-w-7xl justify-center">
        <div
          class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
        >
          <div class="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {{ isLogin ? "Sign in to your account" : "Create an account" }}
              </h2>
              <p class="mt-2 text-sm leading-6 text-gray-500">
                {{ isLogin ? "Not a user?" : "Already a user?" }}
                {{ " " }}
                <a
                  @click="isLogin = !isLogin"
                  class="font-semibold text-primaryBlue hover:text-indigo-500"
                  >{{ isLogin ? "Register here!" : "Sign in" }}</a
                >
              </p>
            </div>

            <div class="mt-10">
              <div>
                <div v-if="isLogin" class="space-y-6">
                  <div>
                    <label
                      for="email"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Email address</label
                    >
                    <div class="mt-2">
                      <input
                        v-model="email"
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required=""
                        class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="password"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Password</label
                    >
                    <div class="mt-2">
                      <input
                        v-model="password"
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required=""
                        class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        for="remember-me"
                        class="ml-3 block text-sm leading-6 text-gray-700"
                        >Remember me</label
                      >
                    </div>

                    <div class="text-sm leading-6">
                      <a
                        @click="password_reset()"
                        class="font-semibold text-indigo-600 hover:text-indigo-500"
                        >Forgot password?</a
                      >
                    </div>
                  </div>

                  <div>
                    <button
                      @click="user_login()"
                      :disabled="isLoading"
                      type="submit"
                      class="flex w-full justify-center rounded-md bg-primaryOrange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <span v-if="!isLoading"> Sign in </span>
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                          class="opacity-25"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div v-else class="space-y-6">
                  <div>
                    <label
                      for="name"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Name</label
                    >
                    <div class="mt-2">
                      <input
                        v-model="name"
                        id="name"
                        name="name"
                        type="text"
                        required="true"
                        class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="email"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Email address</label
                    >
                    <div class="mt-2">
                      <input
                        v-model="email"
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required="true"
                        class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="password"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Password</label
                    >
                    <div class="mt-2">
                      <input
                        v-model="password"
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required=""
                        class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      @click="user_register()"
                      :disabled="isLoading"
                      type="submit"
                      class="flex w-full justify-center rounded-md bg-primaryOrange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <span v-if="!isLoading"> Register </span>
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                          class="opacity-25"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <span v-if="errorMessage" class="my-4 text-red-500">
                {{ errorMessage }}
              </span>

              <div class="mt-10">
                <div class="relative">
                  <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="w-full border-t border-gray-200" />
                  </div>
                  <div class="relative flex justify-center text-sm font-medium leading-6">
                    <span class="bg-white px-6 text-gray-900">Or continue with</span>
                  </div>
                </div>

                <div class="mt-6 grid grid-cols-1 gap-4">
                  <a
                    @click="google_login()"
                    :disabled="isLoading"
                    class="flex w-full items-center justify-center gap-3 rounded-md bg-[#4285F4] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                  >
                    <svg
                      v-if="!isLoading"
                      style="color: white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-google"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                        fill="white"
                      ></path>
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                        class="opacity-25"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span class="text-sm font-semibold leading-6">Google</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="relative hidden w-0 flex-1 lg:block">
          <img
            class="absolute inset-0 h-full w-full object-cover"
            src="@/assets/images/login-bg.webp"
            alt="Plane takes off from a tropical island"
          />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/components/layouts/MainLayout.vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const isLoading = ref(false);

const name = ref("");
const email = ref("");
const password = ref("");

const isLogin = ref(true);
const errorMessage = ref("");

const user_register = async () => {
  isLoading.value = true;
  const data = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  const result = await userStore.user_register(data);
  if (result.error) {
    isLoading.value = false;
    errorMessage.value = result.error;
    return;
  }
  isLoading.value = false;
};

const user_login = async () => {
  isLoading.value = true;
  const data = {
    email: email.value,
    password: password.value,
  };
  const result = await userStore.user_login(data);
  if (result.error) {
    isLoading.value = false;
    errorMessage.value = result.error;
    return;
  }
  isLoading.value = false;
};

const google_login = async () => {
  isLoading.value = true;
  const result = await userStore.google_login();
  if (result.error) {
    isLoading.value = false;
    errorMessage.value = result.error;
    return;
  }
  isLoading.value = false;
};
</script>

<style lang="scss" scoped></style>
