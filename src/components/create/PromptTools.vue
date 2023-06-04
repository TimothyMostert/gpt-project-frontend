<template>
    <div class="w-100 flex justify-end gap-2">
        <div v-if="!used" @click="usePlaceholder" class="text-xs text-gray-500 rounded font-semibold cursor-pointer whitespace-nowrap text-right -">
          Use Example
        </div>
        <!-- clear prompt -->
        <div class="text-xs text-gray-500 rounded font-semibold cursor-pointer" v-if="createStore.promptText" @click="createStore.promptText = ''">
            Clear
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useCreateStore } from "@/stores/create";

const createStore = useCreateStore();

const used = ref(false);

watch(() => createStore.promptText, (newVal) => {
    if (newVal === '' || newVal === undefined) {
        used.value = false;
    } else {
        used.value = true;
    }
});

const usePlaceholder = () => {
    createStore.promptText = createStore.placeholder;
    createStore.interests = createStore.placeholderTags;
    createStore.usedExample = true;
};

</script>

<style lang="scss" scoped>

</style>