<script setup>
import { computed } from "vue";
import router from "@/router";

const isWhite = computed(() => router.currentRoute.value.name === "home" || router.currentRoute.value.name === "login");

</script>

<template>
  <div :class="isWhite ? '' : 'bg-gradient-to-br from-primaryBlue to-secondaryBlue md:bg-cyan-50 md:from-cyan-50 md:to-cyan-50'">
  <RouterView />
  </div>
</template>