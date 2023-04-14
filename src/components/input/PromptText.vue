<template>
  <div class="flex flex-col space-y-4 w-full">
    <label class="block font-medium text-primaryBlue" for="prompt-text"
      >Describe your dream trip</label
    >
    <textarea
      class="block w-full px-4 py-2 border rounded-md h-36 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondaryBlue focus:border-secondaryBlue"
      v-model="promptStore.promptText"
      placeholder="Let your imagination run wild!"
    ></textarea>
  </div>
</template>

<script setup>
import { usePromptsStore } from "@/stores/prompt";

const promptStore = usePromptsStore();
</script>

<style lang="scss" scoped></style>
