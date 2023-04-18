<template>
  <section>
    <div
      class="rounded-lg shadow-2xl bg-white focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
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
              placeholder="Let your dreams run wild! where do you want to go?"
              @input="promptTextArea.handleInput"
              @focus="promptTextArea.handleFocus"
              @blur="promptTextArea.handleBlur"
              class="mb-4"
            />
            <PromptTagList v-model="promptStore.promptTags" />
          </div>
        </Transition>
        <div
          :class="[
          'w-full p-4 pb-0 flex justify-end items-center',
          promptStore.isOpen ? 'border-t border-gray-200' : 'pt-0',]"
        >
          <PromptRandomizer :disabled="!promptStore.isOpen" />
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
import PromptTagList from "@/components/prompt/PromptTagList.vue";
import PromptRandomizer from "@/components/prompt/PromptRandomizer.vue";
import BaseButton from "@/components/base/BaseButton.vue";

import { usePromptsStore } from "@/stores/prompt";

const promptStore = usePromptsStore();

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
