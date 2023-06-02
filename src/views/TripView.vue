<script setup>
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import TripContainer from "@/components/trip/TripContainer.vue";
// import Breadcrumbs from "@/components/ui/Breadcrumbs.vue";
import ErrorDisplay from "@/components/ui/Error.vue";

import { useErrorStore } from "@/stores/error";
import { useTripStore } from "@/stores/trip";

const errorStore = useErrorStore();
const tripStore = useTripStore();

</script>

<template>
  <DashboardLayout>
    <main class="-mt-20 md:-mt-24 pb-8">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="max-w-md">
        <!-- <Breadcrumbs /> -->
        <ErrorDisplay v-if="errorStore.isError" class="mt-8" />
        <TripContainer v-if="tripStore.isOpen && !errorStore.isError" />
        </div>
      </div>
    </main>
  </DashboardLayout>
</template>
