<template>
     <div
     class="p-4 isolate after:bg-location-1 after:inset-0 after:absolute after:rounded-t-lg after:-z-10 after:opacity-20"
    >
      <h2 class="font-bold text-gray-700">Edit</h2>
      <p class="text-xs text-gray-600">Dont like this event, lets update it!</p>
    </div>
    <div class="p-4">
        <BaseTextArea 
        v-model="editEventPrompt"
        label="Describe your changes"
        custom-class="ring-2"
        ></BaseTextArea>
    </div>
</template>

<script setup>
import { ref } from "vue";
import BaseTextArea from "@/components/base/BaseTextArea.vue";

const props = defineProps({
  event: Object,
});

const editEventPrompt = ref("");

</script>

<style lang="scss" scoped>

</style>