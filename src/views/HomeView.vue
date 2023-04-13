<script setup>
import PromptCreator from "@/components/layout/PromptCreator.vue";
import ItineraryFlow from "@/components/layout/ItineraryFlow.vue";
</script>

<template>
  <main class="bg-white">
    <div class="p-4 max-w-md flex flex-col h-full justify-center mx-auto">
      <PromptCreator />
      <ItineraryFlow />
    </div>
  </main>
</template>
