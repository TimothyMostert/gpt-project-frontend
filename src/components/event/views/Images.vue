<template>
  <div class="overflow-y-hidden flex flex-col rounded-lg bg-black">
    <div
      class="overflow-y-auto no-scrollbar flex-grow max-h-[500px] rounded-lg m-1"
      v-if="images.length > 0"
    >
      <div
        v-for="(image, index) in images"
        :key="'image-' + event.id + '-' + index"
        class="rounded-lg mt-1"
      >
        <UnsplashImage
          :image="image"
          size="w-full h-auto"
          quality="regular"
        ></UnsplashImage>
      </div>
    </div>
    <div class="p-4" v-else>
      <h3 class="text-lg font-bold font-mono mb-4">No images found for this location!</h3>
      <p>We are working hard to add more content sources, stay tuned</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import UnsplashImage from "@/components/ui/UnsplashImage.vue";

const props = defineProps({
  event: Object,
});

const images = computed(() => {
  if (!props.event.location.photo_references) return [];
  return props.event.location.photo_references;
  // return props.event.location.photo_references.map((photo, index) => {
  //   return {
  //     url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${
  //       import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
  //     }`,
  //   };
  // }); for google places images
});
</script>

<style scoped>
</style>
