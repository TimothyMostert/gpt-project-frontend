<template>
    <div class="w-100 flex justify-end gap-2">
        <!-- forward and back chevron -->
        <div v-if="!createStore.promptText" class="flex justify-center items-center rounded-full w-8 h-8 bg-gray-200 cursor-pointer" @click="moveIndexBack">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.707 3.293a1 1 0 010 1.414L6.414 9H15a1 1 0 110 2H6.414l4.293 4.293a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
        </div>
        <div v-if="!createStore.promptText" class="flex justify-center items-center rounded-full w-8 h-8 bg-gray-200 cursor-pointer" @click="moveIndexForward">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.293 16.707a1 1 0 010-1.414L13.586 11H5a1 1 0 010-2h8.586l-4.293-4.293a1 1 0 111.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
        </div>
        <!-- use example prompt -->
        <div v-if="!createStore.promptText" @click="usePlaceholder" class="flex justify-center items-center text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full font-semibold cursor-pointer whitespace-nowrap text-right">
          Use Example
        </div>
        <!-- clear prompt -->
        <div v-if="createStore.promptText" class="flex justify-center items-center text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full font-semibold cursor-pointer whitespace-nowrap text-right"  @click="clear">
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
        createStore.usedExample = false;
    } else {
        createStore.usedExample = true;
    }
});

const usePlaceholder = () => {
    createStore.promptText = createStore.placeholderArray[createStore.placeholderIndex].prompt;
    createStore.interests = createStore.placeholderArray[createStore.placeholderIndex].tags;
    createStore.usedExample = true;
};

const moveIndexBack = () => {
    createStore.usedExample = true;
    if (createStore.placeholderIndex === 0) {
        createStore.placeholderIndex = createStore.placeholderArray.length - 1;
        return;
    }
    createStore.placeholderIndex = createStore.placeholderIndex - 1;
};

const moveIndexForward = () => {
    createStore.usedExample = true;
    if (createStore.placeholderIndex === createStore.placeholderArray.length - 1) {
        createStore.placeholderIndex = 0;
        return;
    }
    createStore.placeholderIndex = createStore.placeholderIndex + 1;
};

const clear = () => {
    createStore.promptText = '';
    createStore.interests = [];
    createStore.usedExample = false;
};

</script>

<style lang="scss" scoped>

</style>