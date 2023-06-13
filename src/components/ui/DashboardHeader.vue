<template>
  <Popover
    as="header"
    class="md:bg-gradient-to-br md:from-primaryBlue md:to-secondaryBlue pb-24"
    v-slot="{ open }"
  >
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <!-- top bar -->
      <div class="h-20 relative flex items-center justify-center py-5 lg:justify-between">
        <div class="absolute left-0 flex-shrink-0 lg:static">
          <BaseLogo />
        </div>

        <!-- desktop -->
        <div class="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
          <HeaderMenu v-if="userStore.isLoggedIn" />
          <LoginMenu v-else color="text-white" />
        </div>
        <!-- end desktop -->

        <!-- mobile -->
        <div class="absolute right-0 flex-shrink-0 lg:hidden">
          <PopoverButton
            v-if="userStore.isLoggedIn"
            class="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </PopoverButton>
          <LoginMenu v-else color="text-white" />
        </div>
        <!-- end mobile -->
      </div>
      <!-- end top bar -->

      <!-- bottom bar -->
      <NavigationLinks />
      <!-- end bottom bar -->
    </div>

    <HeaderMenuMobile />
    <UserSettings :open="stateStore.ui.userProfileSettingsIsOpen" />
  </Popover>
</template>

<script setup>
import { Popover, PopoverButton } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import BaseLogo from "@/components/base/BaseLogo.vue";
import { useStateStore } from "@/stores/state";
import { useUserStore } from "@/stores/user";
import UserSettings from "@/components/ui/UserSettings.vue";
import HeaderMenu from "@/components/ui/HeaderMenu.vue";
import LoginMenu from "@/components/ui/LoginMenu.vue";
import HeaderMenuMobile from "@/components/ui/HeaderMenu_Mobile.vue";
import NavigationLinks from "@/components/ui/NavigationLinks.vue";

const stateStore = useStateStore();
const userStore = useUserStore();
</script>

<style lang="scss" scoped></style>
