<script setup>
import { storeToRefs } from "pinia";
import { useLoaderStore } from "./stores/loader";
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import Loader from "@/components/ui/Loader.vue";

const { loaderIsActive } = storeToRefs(useLoaderStore());
</script>

<template>
  <Loader v-if="loaderIsActive"> </Loader>
  <div class="min-h-screen flex flex-col justify-between">
    <AppHeader />
    <RouterView class="mb-auto" />
    <AppFooter />
  </div>
</template>

<style scoped>
</style>
