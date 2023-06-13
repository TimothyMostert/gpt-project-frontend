<template>
  <Menu as="div" class="relative ml-4 flex-shrink-0">
    <div>
      <MenuButton class="flex text-left rounded-full text-sm">
        <span class="sr-only">Open user menu</span>
        <Bars3Icon class="h-6 w-6" :class="props.color" aria-hidden="true" />
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
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const props = defineProps({
  color: {
    type: String,
    default: "text-black",
  },
});

const router = useRouter();

const goRoute = (route) => {
  router.push({ name: route });
};
</script>

<style lang="scss" scoped></style>
