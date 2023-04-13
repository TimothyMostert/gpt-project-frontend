<template>
    <div class="flex flex-col gap-2 p-4 rounded border">
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

<style lang="scss" scoped>

</style>