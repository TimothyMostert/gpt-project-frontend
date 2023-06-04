<script setup>
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import TripContainer from "@/components/trip/TripContainer.vue";
// import Breadcrumbs from "@/components/ui/Breadcrumbs.vue";
import ErrorDisplay from "@/components/ui/Error.vue";
import Loader from "@/components/ui/Loader.vue";
import ModalLoader from "@/components/ui/ModalLoader.vue";

import { useErrorStore } from "@/stores/error";
import { useStateStore } from "@/stores/state";
import { useTripStore } from "@/stores/trip";
import { useRoute } from 'vue-router'

const route = useRoute();
const errorStore = useErrorStore();
const stateStore = useStateStore();
const tripStore = useTripStore();

stateStore.isLoading = false;

if (!tripStore.trip || tripStore.trip.id !== route.params.id) {
  tripStore.setTripFromId(route.params.id);
}

</script>

<template>
  <DashboardLayout>
    <main class="-mt-20 md:-mt-24 pb-8">
      <div class="mx-auto max-w-3xl px-2 md:px-6 lg:max-w-7xl lg:px-8">
        <div class="max-w-md">
        <!-- <Breadcrumbs /> -->
        <TripContainer v-if="stateStore.trip.isOpen && !errorStore.isError" />
        <Loader class="md:hidden" v-if="stateStore.isLoading && !errorStore.isError" />
        <ModalLoader class="hidden md:block" v-if="stateStore.isLoading && !errorStore.isError" />
        <ErrorDisplay v-if="errorStore.isError" class="mt-8" />
        </div>
      </div>
    </main>
  </DashboardLayout>
</template>
