<template>
  <div class="p-4 space-x-2 flex overflow-x-scroll md:overflow-auto md:space-x-0 md:grid md:grid-cols-4 md:gap-2">
    <PromptTag
      v-for="tag in tags"
      :key="tag.name"
      :tag="tag.name"
      :selectedTags="selectedTags"
      :selectedColor="tag.selectedColor"
      :selectedTextColor="tag.selectedTextColor"
    />
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from "vue";
import PromptTag from "@/components/prompt/PromptTag.vue";
import { usePromptsStore } from "@/stores/prompt";

const promptStore = usePromptsStore();

const selectedTags = ref([]);

let ignoreUpdates = false;

watch(selectedTags, (newVal) => {
  if (ignoreUpdates) return;
  ignoreUpdates = true;
  promptStore.promptTags = newVal;
  watchEffect(onCleanup => {
    ignoreUpdates = false;
  });
}, { deep: true });

watch(() => promptStore.promptTags, (newVal) => {
  if (ignoreUpdates) return;
  ignoreUpdates = true;
  selectedTags.value = newVal;
  watchEffect(onCleanup => {
    ignoreUpdates = false;
  });
}, { deep: true });

const tags = [
  { name: "Adventure", selectedColor: "bg-red-300", selectedTextColor: "text-red-900" },
  { name: "Beach", selectedColor: "bg-blue-300", selectedTextColor: "text-blue-900" },
  { name: "City", selectedColor: "bg-gray-300", selectedTextColor: "text-gray-900" },
  { name: "Culture", selectedColor: "bg-yellow-300", selectedTextColor: "text-yellow-900" },
  { name: "Family", selectedColor: "bg-green-300", selectedTextColor: "text-green-900" },
  { name: "Food", selectedColor: "bg-orange-300", selectedTextColor: "text-orange-900" },
  { name: "Hiking", selectedColor: "bg-green-400", selectedTextColor: "text-green-900" },
  { name: "History", selectedColor: "bg-indigo-300", selectedTextColor: "text-indigo-900" },
  { name: "Nature", selectedColor: "bg-teal-300", selectedTextColor: "text-teal-900" },
  { name: "Nightlife", selectedColor: "bg-purple-300", selectedTextColor: "text-purple-900" },
  { name: "Relaxation", selectedColor: "bg-pink-300", selectedTextColor: "text-pink-900" },
  { name: "Romance", selectedColor: "bg-rose-300", selectedTextColor: "text-rose-900" },
  { name: "Shopping", selectedColor: "bg-fuchsia-300", selectedTextColor: "text-fuchsia-900" },
  { name: "Sightseeing", selectedColor: "bg-amber-300", selectedTextColor: "text-amber-900" },
  { name: "Spa", selectedColor: "bg-lime-300", selectedTextColor: "text-lime-900" },
  { name: "Sports", selectedColor: "bg-emerald-300", selectedTextColor: "text-emerald-900" },
  { name: "Theme Park", selectedColor: "bg-cyan-300", selectedTextColor: "text-cyan-900" },
  { name: "Wildlife", selectedColor: "bg-blue-400", selectedTextColor: "text-blue-900" },
];

</script>