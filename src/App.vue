<script setup>
import { storeToRefs } from "pinia";
import { useLoaderStore } from "./stores/loader";
import Loader from "@/components/ui/Loader.vue";

const { loaderIsActive } = storeToRefs(useLoaderStore());
</script>

<template>
  <Loader v-if="loaderIsActive"> </Loader>
  <RouterView />
</template>