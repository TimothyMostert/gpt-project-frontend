<template>
  <div class="rounded-lg" :class="size">
    <!-- <img class="object-cover rounded-t-lg" :class="size" :src="imageUrl" alt=""> -->
    <div class="grid" :class="size">
      <img
        class="transition duration-500 object-cover rounded-t-lg"
        :src="lowQualitySrc"
        v-if="!highQualityImageLoaded"
        :class="size"
        alt="Low Quality"
      />
      <img
        class="transition duration-500 object-cover rounded-t-lg"
        :src="highQualitySrc"
        v-else
        :class="size"
        @load="highQualityImageLoaded = true"
        alt="High Quality"
      />
    </div>
    <!-- unsplash credit -->
    <div class="absolute bottom-0 right-0 p-2 text-[8px] text-white">
      <a :href="portfolioLink">{{ image.name }}</a> on
      <a href="https://unsplash.com/?utm_source=dreamtrip&utm_medium=referral"
        >Unsplash</a
      >
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";

const highQualityImageLoaded = ref(false);

const preloadHighQualityImage = () => {
  const img = new Image();
  img.src = props.highQualitySrc;
  img.onload = () => {
    highQualityImageLoaded.value = true;
  };
};

onMounted(preloadHighQualityImage);

const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
  width: {
    type: Number,
    required: false,
    default: 300,
  },
  height: {
    type: Number,
    required: false,
    default: 150,
  },
  size: {
    type: String,
    default: "h-40 w-full",
  },
  quality: {
    type: String,
    default: "small",
  },
});

const portfolioLink = computed(() => {
  return props.image.portfolio_url + "?utm_source=dreamtrip&utm_medium=referral";
});

const ImageSrc = computed(() => {
  if (props.image != undefined) {
    switch (props.quality) {
      case "small":
        return props.image.small_url;
        break;
      case "regular":
        return props.image.regular_url;
        break;
      case "full":
        return props.image.full_url;
        break;
      default:
        return props.image.small_url;
        break;
    }
  } else {
    return (
      "https://picsum.photos/seed/" +
      props.trip.id +
      "/" +
      props.width +
      "/" +
      props.height
    );
  }
});

const lowQualitySrc = computed(() => {
  if (props.image != undefined) {
    return props.image.small_url;
  } else {
    return (
      "https://picsum.photos/seed/" +
      props.trip.id +
      "/" +
      props.width +
      "/" +
      props.height
    );
  }
});
</script>

<style lang="scss" scoped></style>
