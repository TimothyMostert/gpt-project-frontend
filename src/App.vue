<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    <AppHeader />
    <RouterView class="mb-auto" />
    <AppFooter />
  </div>
</template>

<style scoped>
</style>
