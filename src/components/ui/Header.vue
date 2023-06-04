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
          <Menu v-if="!userStore.isLoggedIn" as="div" class="relative ml-4 flex-shrink-0">
            <div>
              <MenuButton class="flex text-left rounded-full text-sm">
                <span class="sr-only">Open user menu</span>
                <Bars3Icon class="h-6 w-6" aria-hidden="true" />
              </MenuButton>
            </div>
            <transition
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem key="logout" v-slot="{ active }">
                  <div
                    @click="goRoute('login')"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                  >
                    Login
                  </div>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>

          <Menu v-else as="div" class="relative ml-4 flex-shrink-0">
            <div>
              <MenuButton
                class="flex text-left rounded-full text-sm"
              >
                <span class="sr-only">Open user menu</span>
                <Bars3Icon class="h-6 w-6" aria-hidden="true" />
              </MenuButton>
            </div>
            <transition
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem key="profile" v-slot="{ active }">
                  <div
                    @click="stateStore.ui.userProfileSettingsIsOpen = true"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                  >
                    Profile Settings
                  </div>
                </MenuItem>
                <MenuItem key="logout" v-slot="{ active }">
                  <div
                    @click="userStore.logout()"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                  >
                    Logout
                  </div>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <!-- end mobile -->

        <!-- desktop -->
        <!-- <NavigationLinks class="hidden lg:flex lg:gap-x-12" /> -->
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            v-if="!userStore.isLoggedIn"
            @click="goRoute('login')"
            class="text-sm font-semibold leading-6 text-gray-900 cursor-pointer hover:text-gray-700"
            >Log in <span aria-hidden="true">&rarr;</span></a
          >
          <a v-else class="group block flex-shrink-0 cursor-pointer">
            <HeaderMenu />
          </a>
        </div>
      </nav>
      <!-- end desktop -->

      <MobileMenu :open="mobileMenuOpen" @update:open="mobileMenuOpen = false" />
      <UserSettings :open="stateStore.ui.userProfileSettingsIsOpen" />
    </header>
  </nav>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import { useStateStore } from "@/stores/state";
import { useUserStore } from "@/stores/user";
import MobileMenu from "@/components/ui/MobileMenu.vue";
import UserSettings from "@/components/ui/UserSettings.vue";
import BaseLogo from "@/components/base/BaseLogo.vue";
import HeaderMenu from "@/components/ui/HeaderMenu.vue";

const userStore = useUserStore();
const stateStore = useStateStore();

const router = useRouter();

import { ref } from "vue";
import NavigationLinks from "./NavigationLinks.vue";

const mobileMenuOpen = ref(false);

const goRoute = (route) => {
  router.push({ name: route });
};
</script>

<style lang="scss" scoped></style>
