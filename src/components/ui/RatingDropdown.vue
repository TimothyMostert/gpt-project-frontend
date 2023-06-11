<template>
  <Listbox
    as="div"
    v-model="tripRating"
    class="mt-1 text-sm rounded flex gap-2 items-center"
  >
    <ListboxLabel class="sr-only">Your rating</ListboxLabel>
    <div
      class="relative items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
    >
      <ListboxButton
        class="relative inline-flex h-5 items-center justify-center rounded-full text-gray-900 hover:text-gray-500"
      >
        <span class="flex items-center justify-center">
          <span v-if="tripRating.value === null" class="flex gap-2 items-center Smt-1">
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
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
            <span class="whitespace-nowrap text-primaryBlue"> Rate trip </span>
            <span class="sr-only">Add your rating</span>
          </span>
          <span v-if="!(tripRating.value === null)">
            <span
              :class="[
                tripRating.bgColor,
                'flex h-6 w-6 items-center justify-center rounded-full',
              ]"
            >
              <component
                :is="tripRating.icon"
                class="h-5 w-5 flex-shrink-0 text-white"
                aria-hidden="true"
              />
            </span>
            <span class="sr-only">{{ tripRating.name }}</span>
          </span>
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 -ml-6 w-40 rounded-lg bg-white py-3 text-sm shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="rating in ratings"
            :key="rating.value"
            :value="rating"
            v-slot="{ active }"
          >
            <li
              :class="[
                active ? 'bg-gray-100' : 'bg-white',
                'relative cursor-default select-none px-3 py-2',
              ]"
            >
              <div class="flex items-center">
                <div
                  :class="[
                    rating.bgColor,
                    'flex h-6 w-6 items-center justify-center rounded-full',
                  ]"
                >
                  <component
                    :is="rating.icon"
                    :class="[rating.iconColor, 'h-5 w-5 flex-shrink-0']"
                    aria-hidden="true"
                  />
                </div>
                <span class="ml-3 block truncate font-medium">{{ rating.name }}</span>
              </div>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { ref, watch } from "vue";
import {
  FaceFrownIcon,
  FaceSmileIcon as FaceSmileIconMini,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/vue/20/solid";
import Api from "@/services/Api.service.js";
import { useTripStore } from "@/stores/trip";
import { useUserStore } from "@/stores/user";

const tripStore = useTripStore();
const userStore = useUserStore();

const ratings = [
  {
    name: "Can't wait",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Love it",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Seems good",
    value: "happy",
    icon: FaceSmileIconMini,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Disappointing",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XMarkIcon,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

const tripRating = ref(ratings[4]);

// if current user has rated the trip, set the rating
watch(
  () => tripStore.trip.ratings,
  (newVal) => {
    // find the rating of the current user
    if (!newVal || newVal.length == 0) {
      tripRating.value = ratings[4];
      return;
    }
    let userRating = newVal.find((x) => x.user_id === userStore.user.id);
    if (userRating) {
      tripRating.value =  ratings.find((x) => x.value === userRating.value);
    } else {
      tripRating.value = ratings[4];
    }
  },
  { immediate: true }
);

watch(tripRating, async (newVal, oldVal) => {
  if (oldVal.value === null) {
    await Api.rateTrip({ trip_id: tripStore.trip.id, value: newVal.value });
  } else {
    await Api.updateRating({ trip_id: tripStore.trip.id, value: newVal.value });
  }
});
</script>

<style lang="scss" scoped></style>
