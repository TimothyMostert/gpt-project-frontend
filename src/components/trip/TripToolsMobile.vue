<template>
  <div class="">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="inline-flex w-full justify-center">
          <div class="py-1 px-2 bg-white text-sm rounded flex gap-2 text-primaryBlue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#0D518C"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
              />
            </svg>
            <span class="whitespace-nowrap"> Trip tools </span>
          </div>
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <!-- <div class="py-1">
            <MenuItem v-slot="{ active }">
              <a
                
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
              >
                <PencilSquareIcon
                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Edit
              </a>
            </MenuItem>
          </div> -->
          <!-- <div class="py-1">
            <MenuItem v-slot="{ active }">
              <a
                @click="getMap"
                v-if="!mapsLoading"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
              >
                <ArrowRightCircleIcon
                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Open in maps
              </a>
              <div
                v-else
                class="text-gray-700 group flex items-center px-4 md:px-2 lg:px-4 lg:pl-1 py-2 text-sm md:text-xs lg:text-sm whitespace-nowrap"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
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
              </div>
            </MenuItem>
          </div> -->
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <ShareButton />
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                @click="toggleFavorite"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
              >
                <HeartIcon
                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  :class="{
                    'text-red-500 group-hover:text-red-800': isFavorite,
                  }"
                  aria-hidden="true"
                />
                Add to favorites
              </a>
            </MenuItem>
          </div>
          <div v-if="tripStore.isUserTrip"  class="py-1">
            <MenuItem v-slot="{ active }">
              <a
                @click="deleteTrip"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
              >
                <TrashIcon
                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Delete
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/vue/20/solid";
import { useTripStore } from "@/stores/trip";
import ShareButton from "@/components/ui/ShareButton.vue";
import Api from "@/services/Api.service.js";
import { ref, watch } from "vue";

const tripStore = useTripStore();


const mapsLoading = ref(false);

const getMap = async () => {
  mapsLoading.value = true;
  const result = await Api.getMap(tripStore.trip.id);
  if (result.status === 200 && result.data.success) {
    // load data.map in new tab
    window.open(result.data.map);
  } else {
    // show error
    alert("Something went wrong with map loading.");
  }
  mapsLoading.value = false;
};

const deleteTrip = () => {
  const tripStore = useTripStore();
  tripStore.delete_trip(tripStore.trip.id, "explore");
};

const isFavorite = ref(false);

watch(
  () => tripStore.trip.favorited_by_users,
  (newVal) => {
    if (!newVal || newVal.length === 0) {
      isFavorite.value = false;
      return;
    }
    let userFavorited = newVal.find((x) => x.pivot.user_id === userStore.user.id);
    isFavorite.value = userFavorited ? true : false;
  },
  { immediate: true }
);

const toggleFavorite = () => {
  if (isFavorite.value) {
    removeFavorite();
  } else {
    addFavorite();
  }
};

const addFavorite = () => {
  Api.add_favorite(tripStore.trip.id).then((res) => {
    if (res.status === 200) {
      isFavorite.value = true;
    }
  });
};

const removeFavorite = () => {
  Api.remove_favorite(tripStore.trip.id).then((res) => {
    if (res.status === 200) {
      isFavorite.value = false;
    }
  });
};
</script>
