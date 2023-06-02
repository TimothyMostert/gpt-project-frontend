<template>
    <div class="flex lg:flex-1">
          <a @click="goRoute('home')" class="-m-1.5 p-1.5 flex gap-4 items-center">
            <span class="sr-only">Dreamtrip</span>
            <img
              class="h-16 w-auto"
              src="@/assets/images/dreamtrip_logo_clear_tight.png"
              alt="dream trip logo, a plane flies through the sunrise, orange and blue"
            />
            <div
              class="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primaryOrange to-secondaryOrange"
              v-if="hasText"
            >
              Dream trip
            </div>
          </a>
        </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  hasText: {
    type: Boolean,
    default: true,
  }
});

const router = useRouter();

const goRoute = (route) => {
  router.push({ name: route });
};

</script>

<style lang="scss" scoped>

</style>