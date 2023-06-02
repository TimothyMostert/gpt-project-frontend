<template>
  <div class="min-h-screen flex flex-col">
    <DashboardHeader />
    <slot />
    <DashboardFooter />
  </div>
</template>

<script setup>
import DashboardHeader from "@/components/ui/DashboardHeader.vue";
import DashboardFooter from "@/components/ui/DashboardFooter.vue";
</script>

<style lang="scss" scoped></style>
