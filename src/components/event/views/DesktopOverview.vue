<template>
  <div class="outer-grid-container gap-4">
    <div class="grid-container" :style="gridStyleFirst">
      <div
        v-for="(image, index) in images.slice(0, 6)"
        :key="'image-' + event.id + '-' + index"
        :class="'grid-item grid-item-' + index"
      >
        <UnsplashImage
          :image="image"
          size="w-full h-full absolute"
          quality="regular"
          style="object-fit: cover"
        ></UnsplashImage>
      </div>
    </div>
    <div class="flex flex-col" :style="gridStyleSecond">
      <div class="p-4">
        <div class="pr-6">
          <h2 class="font-bold text-lg text-gray-700">{{ props.event.title }}</h2>
          <p class="text-sm text-gray-600">{{ props.event.location.name }}</p>
          <div class="py-4 px-2 flex items-center">
            <p class="text-base text-gray-600 italic font-serif">
              "{{ props.event.description }}"
            </p>
          </div>
        </div>
      </div>
      <div
        class="p-4 flex flex-col gap-4 text-left no-scrollbars overflow-y-auto flex-grow"
      >
        <div
          class="text-gray-700 flex flex-col gap-2"
          v-for="(activity, index) in props.event.activities"
          :key="'activity-' + props.event.id + '-' + index"
        >
          <div class="flex w-full justify-between items-center gap-4">
            <div class="font-bold text-base text-gray-600">{{ activity.title }}</div>
            <div class="rounded-lg w-fit text-sm text-primaryOrange font-bold px-2 py-1">
              {{ activity.activityType }}
            </div>
          </div>
          <p class="text-sm text-gray-600 text-left">
            {{ activity.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import UnsplashImage from "@/components/ui/UnsplashImage.vue";

const props = defineProps({
  event: Object,
});

const gridStyleFirst = computed(() => {
  return props.event.order % 2 === 0 ? "grid-area: a;" : "grid-area: b;";
});

const gridStyleSecond = computed(() => {
  return props.event.order % 2 === 0 ? "grid-area: b;" : "grid-area: a;";
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

<style>
.outer-grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "a b";
  grid-gap: 4px;
}

.grid-container {
  display: grid;
  grid-template-areas:
    "a a a b b b"
    "a a a b b b"
    "a a a d d d"
    "e e c c c c"
    "e e c c c c"
    "e e f f f f";
  grid-gap: 4px;
}

.grid-item {
  border-radius: 8px;
  overflow: hidden;
}

/* use CSS classes to assign grid areas to items */

.grid-item-0 {
  grid-area: a;
}
.grid-item-1 {
  grid-area: b;
}
.grid-item-2 {
  grid-area: c;
}
.grid-item-3 {
  grid-area: d;
}
.grid-item-4 {
  grid-area: e;
}
.grid-item-5 {
  grid-area: f;
}
.grid-item-6 {
  grid-area: g;
}
.grid-item-7 {
  grid-area: h;
}
.grid-item-8 {
  grid-area: i;
}
.grid-item-9 {
  grid-area: j;
}
</style>
