<template>
<li class="flex items-center flex-wrap justify-between gap-x-6 py-5">
      <div class="min-w-0 w-full">
        <div class="flex items-start gap-x-3">
          <p class="text-sm font-semibold leading-6 text-gray-900">{{ trip.title }}</p>
        </div>
        <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
          <p class="whitespace-nowrap">
            Due on <time :datetime="trip.user_id">{{ trip.user_id }}</time>
          </p>
          <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
            <circle cx="1" cy="1" r="1" />
          </svg>
          <p class="truncate">Created by {{ trip.user_id }}</p>
        </div>
      <div class="mt-2 flex flex-none items-center gap-x-4">
        <a @click="setTrip" class="rounded-md bg-gradient-to-r from-primaryOrange to-secondaryOrange px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >View trip<span class="sr-only">, {{ trip.title }}</span></a
        >
        <Menu as="div" class="relative flex-none">
          <MenuButton class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span class="sr-only">Open options</span>
            <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
          </MenuButton>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <MenuItem v-slot="{ active }">
                <a @click="deleteTrip" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']"
                  >Delete<span class="sr-only">, {{ trip.title }}</span></a
                >
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
      </div>
    </li>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import { useUserStore } from '@/stores/user';
import { useTripStore } from '@/stores/trip';
import router from "@/router";

const userStore = useUserStore();
const tripStore = useTripStore();

const props = defineProps({
  trip: {
    type: Object,
    required: true,
  },
});

const deleteTrip = () => {
  userStore.delete_trip(props.trip.id);
}

const setTrip = () => {
  tripStore.setTrip(props.trip, 'overview');  
  tripStore.isOpen = true;
  router.push({ name: 'trip-view' });
}

</script>

<style lang="scss" scoped>

</style>