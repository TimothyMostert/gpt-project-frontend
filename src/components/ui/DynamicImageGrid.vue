<template>
    <div class="grid-container" :style="{ gridTemplateAreas: gridArrangement }">
      <div
        v-for="(image, index) in shuffledImages.slice(0, 6)"
        :key="'image-grid-' + eventId + '-' + index"
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
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import UnsplashImage from "@/components/ui/UnsplashImage.vue";

const props = defineProps({
  images: Array,
  eventId: Number,
});

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let gridTemplates = [
  '"a a a b b b" "a a a b b b" "a a a d d d" "e e c c c c" "e e c c c c" "e e f f f f"',
  '"b b a a a a" "b b a a a a" "b b d d d d" "c c e e e e" "c c e e e e" "f f e e e e"',
  '"a a a a b b" "a a a a b b" "a a a a b b" "c c d d d d" "c c d e f f" "c c d e f f"',
  '"a a b b c c" "a a b b c c" "a a d d c c" "f f d d e e" "f f d d e e" "f f d d e e"',
  '"a a b b c c" "a a b b c c" "d d d d f f" "d d d d f f" "d d d d e e" "d d d d e e"',
  '"a a b b c c" "a a d d e e" "a a d d e e" "b b f f c c" "b b f f c c" "d d e e f f"',
  '"a a b b e e" "a a b b e e" "d d b b f f" "d d b b f f" "c c c c c c" "c c c c c c"',
  '"e e e f f f" "e e e f f f" "d d d d d d" "d d d d d d" "a a b b c c" "a a b b c c"',
]

onMounted(() => {
  selectedTemplate.value = getRandomInt(0, gridTemplates.length - 1);
});

let selectedTemplate = ref(0);
let gridArrangement = computed(() => gridTemplates[selectedTemplate.value]);

let shuffledImages = computed(() => {
  let arr = [...props.images];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
});

</script>

<style lang="scss" scoped>
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