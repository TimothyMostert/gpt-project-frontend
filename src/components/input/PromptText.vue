<template>
  <div class="flex flex-col space-y-4 w-full">
    <textarea
      class="block w-full px-4 py-2 border rounded-md h-36 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      v-model="promptStore.promptText"
      placeholder="Please describe your dream trip, including destination, travel dates, budget, travel style, and any specific interests or activities."
    ></textarea>
  </div>
</template>

<script setup>

import { usePromptsStore } from "@/stores/prompt";

const promptStore = usePromptsStore();

</script>

<style lang="scss" scoped></style>
