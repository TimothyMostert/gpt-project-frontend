<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from "@/components/ui/Header.vue";
import AppFooter from "@/components/ui/Footer.vue";

</script>

<style lang="scss" scoped></style>
