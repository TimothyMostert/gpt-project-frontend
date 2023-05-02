<template>
    <div v-if="promptStore.isOpen" @click="createRandomPrompt" class="cursor-pointer h-8 flex justify-center items-center">
        <img class="h-4" src="@/assets/images/dice-removebg.png">
        <span class="ml-2 text-xs whitespace-nowrap">Surprise Me!</span>
    </div>
</template>

<script setup>
import Api from '@/services/Api.service.js';
import { usePromptsStore } from '@/stores/prompt.js';

const promptStore = usePromptsStore();

const createRandomPrompt = async () => {
    const result = await Api.getRandomPrompt();
    if (result && result.data.success) {
        promptStore.promptText = result.data.prompt;
        promptStore.interests = result.data.tags;
    }
}
</script>