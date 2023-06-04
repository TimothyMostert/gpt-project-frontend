<template>
                <Menu as="div" class="relative ml-4 flex-shrink-0">
              <div>
                <MenuButton class="flex text-left rounded-full text-sm">
                  <span class="sr-only">Open user menu</span>
                  <UserAvatarWithName :user="userStore.user" />
                </MenuButton>
              </div>
              <transition leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem key="profile" v-slot="{ active }">
                    <div @click="stateStore.ui.userProfileSettingsIsOpen = true" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Profile Settings</div>
                  </MenuItem>
                  <MenuItem key="logout" v-slot="{ active }">
                    <div @click="userStore.logout()" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Logout</div>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
</template>

<script setup>
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import UserAvatarWithName from '@/components/ui/UserAvatarWithName.vue';
import { useStateStore } from '@/stores/state';
import { useUserStore } from '@/stores/user';

const stateStore = useStateStore();
const userStore = useUserStore();

</script>

<style lang="scss" scoped>

</style>