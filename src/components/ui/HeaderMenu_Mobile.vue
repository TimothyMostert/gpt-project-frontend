<template>
<TransitionRoot as="template" >
        <div class="lg:hidden">
          <TransitionChild as="template" enter="duration-150 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-150 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <PopoverOverlay class="fixed inset-0 z-20 bg-black bg-opacity-25" />
          </TransitionChild>

          <TransitionChild as="template" enter="duration-150 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-150 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <PopoverPanel focus class="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition">
              <div class="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div class="pb-2 pt-3">
                  <div class="flex items-center justify-between px-4">
                    <div>
                      <BaseLogo :has-text="false" />
                    </div>
                    <div class="">
                      <PopoverButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primaryBlue">
                        <span class="sr-only">Close menu</span>
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                      </PopoverButton>
                    </div>
                  </div>
                  <div class="mt-3 space-y-1 px-2">
                    <div v-for="item in navigation" :key="item.name" @click="goRoute(item.action)" class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800 cursor-pointer" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</div>
                  </div>
                </div>
                <div class="pb-2 pt-4">
                  <div class="flex items-center px-5">
                    <UserAvatarWithName :user="userStore.user" />
                  </div>
                  <div class="mt-3 space-y-1 px-2">
                    <div @click="stateStore.userProfileSettingsIsOpen = true" class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">Profile Settings</div>
                    <div @click="userStore.logout()" class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">Logout</div>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </TransitionChild>
        </div>
      </TransitionRoot>
</template>

<script setup>
import {
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import UserAvatarWithName from '@/components/ui/UserAvatarWithName.vue';
import BaseLogo from '@/components/base/BaseLogo.vue';
import { useStateStore } from '@/stores/state';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const stateStore = useStateStore();
const userStore = useUserStore();

const navigation = [
  { name: 'Dashboard', action: 'dashboard', current: true },
  { name: 'Create Trip', action: 'trip-create', current: false },
  { name: 'Explore Trips', action: 'explore', current: false },
];

const goRoute = (route) => {
  router.push({ name: route });
};

</script>

<style lang="scss" scoped>

</style>