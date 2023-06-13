<template>
  <article class="flex items-center flex-wrap justify-between gap-x-6 py-5">
    <div class="grid grid-cols-5 gap-4 h-24 w-full">
      <div class="col-span-2 bg-gray-300 rounded-lg">
        <UnsplashImage
          @click="setTrip"
          :image="props.trip.main_photo"
          size="w-full h-28 cursor-pointer"
        ></UnsplashImage>
      </div>
      <div class="col-span-3 flex flex-col gap-2">
        <div class="flex items-start gap-x-3">
          <p
            class="text-sm font-semibold leading-6 text-gray-900 line-clamp-2 cursor-pointer"
            @click="setTrip"
          >
            {{ trip.title }}
          </p>
        </div>
        <!-- <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
        <p class="whitespace-nowrap">
          Due on <time :datetime="trip.user_id">{{ trip.user_id }}</time>
        </p>
        <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
          <circle cx="1" cy="1" r="1" />
        </svg>
        <p class="truncate">Created by {{ trip.user_id }}</p>
      </div> -->
        <div class="w-full h-[0.5px] bg-gray-200"></div>
        <div class="flex flex-none items-center gap-x-4">
          <a
            @click="setTrip"
            class="rounded-md bg-gradient-to-r from-primaryOrange to-secondaryOrange px-2.5 py-1.5 text-sm font-semibold text-white cursor-pointer shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >View trip<span class="sr-only">, {{ trip.title }}</span></a
          >
          <svg
            v-if="!loading"
            @click="deleteTrip"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          <svg
            v-else
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
      </div>
    </div>
  </article>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { useTripStore } from "@/stores/trip";
import { useStateStore } from "@/stores/state";
import router from "@/router";
import { computed, ref } from "vue";
import UnsplashImage from "@/components/ui/UnsplashImage.vue";

const props = defineProps({
  trip: {
    type: Object,
    required: true,
  },
});

const image = computed(() => {
  if (props.trip.main_photo) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=${
      props.trip.main_photo
    }&key=${import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}`;
  } else {
    return "https://picsum.photos/seed/" + props.trip.id + "/130/100";
  }
});

const loading = ref(false);

const deleteTrip = async () => {
  const tripStore = useTripStore();
  const userStore = useUserStore();
  loading.value = true;
  const result = await tripStore.delete_trip(props.trip.id);
  userStore.user_trips();
  loading.value = false;
};

const setTrip = () => {
  const stateStore = useStateStore();
  stateStore.trip.isOpen = true;
  router.push({
    name: "trip",
    params: {
      id: props.trip.id,
    },
  });
};
</script>

<style lang="scss" scoped></style>
