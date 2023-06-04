<template>
  <!-- Main 3 column grid -->
  <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
    <!-- Left column -->
    <div class="grid grid-cols-1 gap-4 lg:col-span-2">
      <DashboardMain />
    </div>
    <!-- Right column -->
    <div class="grid grid-cols-1 gap-4">
      <UserTrips />
    </div>
  </div>
</template>

<script setup>
import DashboardMain from "@/components/dashboard/DashboardMain.vue";
import UserTrips from "@/components/dashboard/UserTrips.vue";

</script>

<style lang="scss" scoped></style>
