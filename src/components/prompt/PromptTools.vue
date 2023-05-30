<template>
    <div class="w-100 flex justify-end gap-2">
        <div v-if="!used" @click="usePlaceholder" class="text-xs text-gray-500 rounded font-semibold cursor-pointer whitespace-nowrap text-right -">
          Use Example
        </div>
        <!-- clear prompt -->
        <div class="text-xs text-gray-500 rounded font-semibold cursor-pointer" v-if="promptStore.promptText" @click="promptStore.promptText = ''">
            Clear
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { usePromptsStore } from "@/stores/prompt";

const promptStore = usePromptsStore();

const used = ref(false);

watch(() => promptStore.promptText, (newVal) => {
    if (newVal === '' || newVal === undefined) {
        used.value = false;
    } else {
        used.value = true;
    }
});

const usePlaceholder = () => {
    promptStore.promptText = promptStore.placeholder;
    promptStore.interests = promptStore.placeholderTags;
    promptStore.usedExample = true;
};

</script>

<style lang="scss" scoped>

</style>