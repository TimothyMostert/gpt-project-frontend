<template>
  <article @click="setTrip" class="flex  flex-wrap justify-start gap-x-6 gap-y-2 border rounded-lg h-fit min-h-full cursor-pointer">
    <UnsplashImage
      :image="props.trip.main_photo"
      size="w-full h-40"
      quality="regular"
    ></UnsplashImage>
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
import UnsplashImage from "@/components/ui/UnsplashImage.vue";

const props = defineProps({
  trip: {
    type: Object,
    required: true,
  },
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
