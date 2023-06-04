<template>
  <article @click="setTrip" class="flex  flex-wrap justify-start gap-x-6 gap-y-2 border rounded-lg h-fit min-h-full">
    <div class="w-full h-40 bg-gray-300 rounded-lg">
      <img class="object-cover h-40 w-full rounded-t-lg" :src="image" alt="">
    </div>
    <div class="min-w-0 w-full h-full p-4 mb-auto">
      <div class="">
        <p class="text-sm font-semibold leading-6 text-gray-900 line-clamp-2">{{ trip.title }}</p>
      </div>
      <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500 mb-auto">
        <p class="truncate">Created by {{ trip.user.name }}</p>
      </div>
    </div>
  </article>
</template>

<script setup>
import { useStateStore } from "@/stores/state";
import router from "@/router";
import { computed } from "vue";

const props = defineProps({
  trip: {
    type: Object,
    required: true,
  },
});

const image = computed(() => {
  if (props.trip.main_photo) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${props.trip.main_photo}&key=${import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}`;
  } else {
    return 'https://picsum.photos/seed/' + props.trip.id + '/300/150';
  }
});

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
