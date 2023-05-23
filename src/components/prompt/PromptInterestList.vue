<template>
  <div>
    <div v-for="category in Object.keys(tags)" :key="category" class="my-4">
      <h1 class="w-100 flex justify-between items-center">
        <span class="" :class="showDetails[category] ? 'text-[#ac6411]' : 'text-gray-700'">
          {{ category }}
        </span>
        <img
          v-if="!showDetails[category]"
          @click="showDetails[category] = !showDetails[category]"
          src="@/assets/images/icons/Circle.png"
          alt="circle icon"
        />
        <img
          v-else
          @click="showDetails[category] = !showDetails[category]"
          src="@/assets/images/icons/Close.png"
          alt="circle icon"
        />
      </h1>
      <div v-show="showDetails[category]" class="py-4 grid grid-cols-3 md:grid-cols-4 gap-2">
        <PromptInterest
          v-for="interest in tags[category]"
          :key="interest.name"
          :interest="interest.name"
          :selectedInterests="selectedInterests"
          :selectedColor="interest.selectedColor"
          :selectedTextColor="interest.selectedTextColor"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from "vue";
import PromptInterest from "@/components/prompt/PromptInterest.vue";
import { usePromptsStore } from "@/stores/prompt";
import travelTags from "@/assets/json/travelTags.json";

const promptStore = usePromptsStore();

const selectedInterests = ref([]);

let ignoreUpdates = false;

watch(selectedInterests, (newVal) => {
  if (ignoreUpdates) return;
  ignoreUpdates = true;
  promptStore.interests = newVal;
  watchEffect(onCleanup => {
    ignoreUpdates = false;
  });
}, { deep: true });

watch(() => promptStore.interests, (newVal) => {
  if (ignoreUpdates) return;
  ignoreUpdates = true;
  selectedInterests.value = newVal;
  watchEffect(onCleanup => {
    ignoreUpdates = false;
  });
}, { deep: true });

const tags = travelTags;

const showDetails = ref({});
for (let category of Object.keys(tags)) {
  showDetails[category] = false;
}

    // "AccommodationType": [
    //   { "name": "Hotel", "selectedColor": "bg-indigo-500", "selectedTextColor": "text-indigo-900" },
    //   { "name": "Hostel", "selectedColor": "bg-green-500", "selectedTextColor": "text-green-900" },
    //   { "name": "B&B", "selectedColor": "bg-orange-500", "selectedTextColor": "text-orange-900" },
    //   { "name": "Camping", "selectedColor": "bg-blue-500", "selectedTextColor": "text-blue-900" },
    //   { "name": "Luxury Resort", "selectedColor": "bg-amber-500", "selectedTextColor": "text-amber-900" },
    //   { "name": "Vacation Rental", "selectedColor": "bg-cyan-500", "selectedTextColor": "text-cyan-900" }
    // ],

</script>
