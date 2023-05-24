<template>
  <section>
    <div class="rounded-lg shadow-2xl bg-white">
      <div class="p-4">
        <Transition name="slide">
          <div :key="promptStore.isOpen" class="mb-4">
            <PromptHeader :heading="promptHeading" :subheading="promptSubHeading" />
            <BaseTextArea
              v-model="promptStore.promptText"
              id="main-prompt-textarea"
              :placeholder="'eg: ' + promptStore.placeholder"
              @input="promptTextArea.handleInput"
              @focus="promptTextArea.handleFocus"
              @blur="promptTextArea.handleBlur"
              class="my-4"
              type="main-prommpt"
            />
            <PromptTools class="-mt-12 mr-2" />
            <PromptHeader class="my-4" :heading="tagHeading" :subheading="tagSubHeading" />
            <PromptInterestList v-model="promptStore.interests" />
          </div>
        </Transition>
        <div
          :class="[
            'w-full mt-4 pt-4 pb-0 flex justify-end items-center',
            promptStore.isOpen ? 'border-t border-gray-200' : 'pt-0',
          ]"
        >
          <BaseButton
            @click="createItinerary"
            customClasses="bg-gradient-to-br from-primaryBlue to-secondaryBlue w-fit ml-auto"
          >
            Create Itinerary
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import PromptHeader from "@/components/prompt/PromptHeader.vue";
import BaseTextArea from "@/components/base/BaseTextArea.vue";
import PromptInterestList from "@/components/prompt/PromptInterestList.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import PromptTools from "@/components/prompt/PromptTools.vue";

import { usePromptsStore } from "@/stores/prompt";
import { ref } from "vue";

import examplePrompts from "@/assets/json/examplePrompts.json";

const promptStore = usePromptsStore();

const used = ref(false);

const promptHeading = "Create Your Dream Journey";
const promptSubHeading = "Locations, activities, themes. Write as much or as little as you want, or try our example prompts";
const tagHeading = "Tag your trip";
const tagSubHeading = "Select as many as you like from the categories below";

const promptTextArea = {
  Label: "Let your dreams run wild!",
  handleInput: (event) => {
    console.log(event);
  },
  handleFocus: (event) => {
    console.log(event);
  },
  handleBlur: (event) => {
    console.log(event);
  },
};

const getRandomPrompt = async () => {
  if (used.value) return;
  // random prompt
  const result = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
  if (result) {
    promptStore.placeholder = result.prompt;
    promptStore.placeholderTags = result.tags;
  }
};

setInterval(async () => {
  getRandomPrompt();
}, 6000);

const createItinerary = () => {
  promptStore.createItinerary();
};
</script>

<style scoped>
.slide-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1) reverse;
}

.slide-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave-from {
  max-height: 24rem;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  overflow: hidden;
  max-height: 0px;
}
</style>
