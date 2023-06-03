<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useLoaderStore } from "./stores/loader";
import Loader from "@/components/ui/Loader.vue";
import router from "@/router";

const isWhite = computed(() => router.currentRoute.value.name === "home" || router.currentRoute.value.name === "login");

const { isOpen } = storeToRefs(useLoaderStore());

</script>

<template>
  <div :class="isWhite ? '' : 'bg-gradient-to-br from-primaryBlue to-secondaryBlue md:bg-white md:from-white md:to-white'">
  <Loader v-if="isOpen"> </Loader>
  <RouterView />
  </div>
</template>