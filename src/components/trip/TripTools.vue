<template>
  <div>
    <div class="relative inline-block text-left w-full mt-4">
      <div class="flex gap-2 z-10 w-full divide-x divide-gray-300 rounded-md">
        <!-- <div class=" w-fit">
              <a
                
                :class="[
                  'text-gray-700 group flex items-center px-4 md:px-2 lg:px-4 lg:pl-0 py-2 text-sm md:text-xs lg:text-sm',
                ]"
              >
                <PencilSquareIcon
                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Edit
              </a>
          </div> -->
        <!-- <div class="w-fit">
          <a
            @click="getMap"
            v-if="!mapsLoading"
            :class="[
              'text-gray-700 group flex items-center px-4 md:px-2 lg:px-4 lg:pl-1 py-2 text-sm md:text-xs lg:text-sm whitespace-nowrap',
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
        </div> -->
        <div class="">
          <ShareButton />
        </div>
        <div class="">
          <a
            @click="toggleFavorite"
            :class="[
              'text-gray-700 group flex items-center px-4 md:px-2 lg:px-4 py-2 text-sm md:text-xs lg:text-sm whitespace-nowrap',
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
        </div>
        <div class="">
          <a
            @click="deleteTrip"
            :class="[
              'text-gray-700 group flex items-center px-4 md:px-2 lg:px-4 py-2 text-sm md:text-xs lg:text-sm whitespace-nowrap',
            ]"
          >
            <TrashIcon
              class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            Delete
          </a>
        </div>
        <div class="">
          <a
            :class="[
              'text-gray-700 group flex items-center px-4 md:px-2 lg:px-4 py-2 text-sm md:text-xs lg:text-sm whitespace-nowrap',
            ]"
          >
            <RatingDropdown
              class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowRightCircleIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/vue/20/solid";
import { useTripStore } from "@/stores/trip";
import { useUserStore } from "@/stores/user";
import RatingDropdown from "@/components/ui/RatingDropdown.vue";
import Api from "@/services/Api.service.js";
import { ref, watch } from "vue";
import ShareButton from "@/components/ui/ShareButton.vue";

const tripStore = useTripStore();

const userStore = useUserStore();

const mapsLoading = ref(false);

const getMap = async () => {
  mapsLoading.value = true;
  const result = await Api.getMap(tripStore.trip.id);
  if (result.status === 200 && result.data.success) {
    // load data.map in new tab
    window.open(result.data.map);
  } else {
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
