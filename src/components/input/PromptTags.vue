<template>
    <div class="grid grid-cols-3">
    <div v-for="(option, index) in tagOptions" :key="index">
      <input
        type="checkbox"
        :value="option"
        :id="option"
        v-model="promptStore.promptTags"
        class="mr-2"
      />
      <label :for="option" class="text-xs">{{ option }}</label>
    </div>
    </div>
</template>

<script setup>
import { usePromptsStore } from "@/stores/prompt";

const promptStore = usePromptsStore();

const tagOptions = [
  "Adventure",
  "Beach",
  "City",
  "Culture",
  "Family",
  "Food",
  "Hiking",
  "History",
  "Nature",
  "Nightlife",
  "Relaxation",
  "Romance",
  "Shopping",
  "Sightseeing",
  "Spa",
  "Sports",
  "Theme Park",
  "Wildlife",
];

</script>

<style lang="scss" scoped>

</style>