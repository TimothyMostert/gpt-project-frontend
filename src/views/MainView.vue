<script setup>
import MainLayout from "@/components/layouts/MainLayout.vue";
import PromptContainer from "@/components/prompt/PromptContainer.vue";
import ItineraryContainer from "@/components/itinerary/ItineraryContainer.vue";
</script>

<template>
  <MainLayout>
    <main class="bg-white mb-auto">
      <div class="p-4 max-w-md flex flex-col gap-4 h-full mx-auto">
        <PromptContainer />
        <ItineraryContainer />
      </div>
    </main>
  </MainLayout>
</template>
