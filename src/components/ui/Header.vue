<template>
  <nav class="">
    <header
      class="absolute inset-x-0 top-0 z-50 bg-gradient-to-b from-primaryBlue/60 to-transparent px-4 py-2"
    >
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <BaseLogo />

        <!-- mobile -->
        <div class="flex lg:hidden">
          <button
            v-if="!userStore.isLoggedIn"
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = true"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            v-else
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="userMenuOpen = true"
          >
            <span class="sr-only">Open user menu</span>
            <UserCircleIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <!-- desktop -->
        <NavigationLinks class="hidden lg:flex lg:gap-x-12" />
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            v-if="!userStore.isLoggedIn"
            @click="goRoute('login')"
            class="text-sm font-semibold leading-6 text-gray-900"
            >Log in <span aria-hidden="true">&rarr;</span></a
          >
          <a v-else @click="userMenuOpen = true" class="group block flex-shrink-0 cursor-pointer">
            <UserAvatarWithName :user="userStore.user" />
          </a>
        </div>
      </nav>
      
      <MobileMenu :open="mobileMenuOpen" @update:open="mobileMenuOpen = false" />
      <UserMenu :open="userMenuOpen" @update:open="userMenuOpen = false" />
    </header>
  </nav>
</template>

<script setup>
import { Bars3Icon, UserCircleIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import MobileMenu from "@/components/ui/MobileMenu.vue";
import UserMenu from "@/components/ui/UserMenu.vue";
import BaseLogo from "@/components/base/BaseLogo.vue";
import UserAvatarWithName from "@/components/ui/UserAvatarWithName.vue";

const userStore = useUserStore();

const router = useRouter();

import { ref } from "vue";
import NavigationLinks from "./NavigationLinks.vue";

const mobileMenuOpen = ref(false);
const userMenuOpen = ref(false);

const goRoute = (route) => {
  router.push({ name: route });
};
</script>

<style lang="scss" scoped></style>
