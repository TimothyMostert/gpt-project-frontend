<script setup>
import { storeToRefs } from "pinia";
import { useLoaderStore } from "./stores/loader";
import Loader from "@/components/ui/Loader.vue";

const { isOpen } = storeToRefs(useLoaderStore());

</script>

<template>
  <Loader v-if="isOpen"> </Loader>
  <RouterView />
</template>