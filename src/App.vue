<script setup>
import { storeToRefs } from "pinia";
import { useLoaderStore } from "./stores/loader";
import Loader from "@/components/ui/Loader.vue";
import router from "@/router";

console.log(router.currentRoute.value.name);
const isHome = router.currentRoute.value.name === "home";

const { isOpen } = storeToRefs(useLoaderStore());

</script>

<template>
  <div :class="isHome ? '' : 'bg-gradient-to-br from-primaryBlue to-secondaryBlue md:bg-white md:from-white md:to-white'">
  <Loader v-if="isOpen"> </Loader>
  <RouterView />
  </div>
</template>