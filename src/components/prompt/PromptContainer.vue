<template>
  <section>
    <div
      class="rounded-lg shadow-2xl bg-white"
    >
      <div class="p-4">
        <Transition name="slide">
          <div
            v-if="promptStore.isOpen"
            :key="promptStore.isOpen"
            :class="['overflow-hidden', promptStore.isOpen ? 'max-h-96' : 'max-h-0']"
          >
            <PromptHeader />
            <BaseTextArea
              v-model="promptStore.promptText"
              id="main-prompt-textarea"
              :placeholder="'eg: ' + promptStore.placeholder"
              @input="promptTextArea.handleInput"
              @focus="promptTextArea.handleFocus"
              @blur="promptTextArea.handleBlur"
              class="mb-4"
              type="main-prommpt"
            />
            <div v-if="!used" @click="usePlaceholder" class="text-xs border-1 border-gray-700 text-gray-900 rounded font-semibold cursor-pointer whitespace-nowrap text-right -mt-10 mr-2">
            Use
        </div>
            <PromptInterestList v-model="promptStore.interests" />
          </div>
        </Transition>
        <div
          :class="[
            'w-full p-4 pb-0 flex justify-end items-center',
            promptStore.isOpen ? 'border-t border-gray-200' : 'pt-0',
          ]"
        >
          <BaseButton
            v-if="promptStore.isOpen"
            @click="createItinerary"
            customClasses="bg-gradient-to-br from-primaryBlue to-secondaryBlue w-fit ml-auto"
          >
            Create Itinerary
          </BaseButton>
          <BaseButton
            v-else
            @click="promptStore.isOpen = true"
            customClasses="bg-gradient-to-br from-primaryBlue to-secondaryBlue w-fit ml-auto"
          >
            New Prompt
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

import { usePromptsStore } from "@/stores/prompt";
import Api from "@/services/Api.service.js";
import { ref } from "vue";

const promptStore = usePromptsStore();

const used = ref(false);

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

let count = 0;
setInterval(async () => {
  if (promptStore.promptText !== '' || count >= 5) {
    clearInterval();
    return;
  }

  const result = await Api.getRandomPrompt();
  
  if (result && result.data.success) {
        promptStore.placeholder = result.data.prompt;
        promptStore.placeholderTags = result.data.tags;
    }
    count++;
}, 5000);

const createItinerary = () => {
  promptStore.createItinerary();
};

const usePlaceholder = () => {
    promptStore.promptText = promptStore.placeholder;
    promptStore.interests = promptStore.placeholderTags;
    used.value = true;
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
