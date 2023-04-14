<template>
    <div class="flex flex-col gap-4 px-4 py-8 rounded-lg shadow-2xl isolate after:bg-palm-tree after:inset-0 after:absolute after:rounded-lg after:-z-10 after:opacity-40">
        <PromptText />
        <PromptTags />
        <PrimaryButton @click="generateItinerary">Generate Itinerary</PrimaryButton>
    </div>
</template>

<script setup>
import PromptText from "@/components/input/PromptText.vue";
import PromptTags from "@/components/input/PromptTags.vue";
import PrimaryButton from "@/components/input/PrimaryButton.vue";

import { usePromptsStore } from "@/stores/prompt";

const promptStore = usePromptsStore();

const generateItinerary = () => {
  promptStore.generateItinerary();
};


</script>

<style scoped>
</style>