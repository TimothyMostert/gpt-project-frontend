<template>
    <img class="h-4" @click="createRandomPrompt" src="@/assets/images/dice.png">
</template>

<script setup>
import Api from '@/services/Api.service.js';
import { usePromptsStore } from '@/stores/prompt.js';

const promptStore = usePromptsStore();

const createRandomPrompt = async () => {
    const result = await Api.getRandomPrompt();
    if (result && result.data.success) {
        promptStore.promptText = result.data.prompt;
    }
}
</script>