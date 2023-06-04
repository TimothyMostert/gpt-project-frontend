<template>
    <section aria-labelledby="section-1-title">
        <h2 class="sr-only" id="section-1-title">Dashboard Main</h2>
        <div class="overflow-hidden rounded-lg bg-white shadow">
          <div class="p-6 flex flex-wrap md:flex-nowrap w-full gap-6">
            <NewContentButton
              class="w-full"
              text="Create a new trip"
              route="create"
              image="rocket"
            />
            <NewContentButton
              class="w-full"
              text="Explore trips"
              route="explore"
              image="search"
            />
          </div>
          <PopularTrips />
        </div>
      </section>
</template>

<script setup>
import NewContentButton from "@/components/ui/NewContentButton.vue";
import PopularTrips from "@/components/dashboard/PopularTrips.vue";

</script>

<style lang="scss" scoped>

</style>