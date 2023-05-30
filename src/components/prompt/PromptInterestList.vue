<template>
  <div>
    <div v-for="category in Object.keys(tags)" :key="category" class="my-4">
      <h1 class="w-100 flex justify-between items-center">
        <span class="" :class="showDetails === category ? 'text-[#ac6411]' : 'text-gray-700'">
          {{ formatTitle(category) }}
        </span>
        <img
          v-if="showDetails !== category"
          @click="showDetails = category"
          src="@/assets/images/icons/Circle.png"
          alt="circle icon"
        />
        <img
          v-else
          @click="showDetails = ''"
          src="@/assets/images/icons/Close.png"
          alt="circle icon"
        />
      </h1>
      <div v-show="showDetails === category" class="py-4 grid grid-cols-3 md:grid-cols-4 gap-2">
        <PromptInterest
          v-for="interest in tags[category]"
          :key="interest.name"
          :interest="interest.name"
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

const tags = travelTags;

const showDetails = ref(null);

if (promptStore.usedExample) {
  showDetails.value = "ActivityType";
}

const formatTitle = (title) => {
  // break camel case and capitalize first letter lowercase rest
  return title.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

</script>