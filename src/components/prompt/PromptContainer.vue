<template>
  <section>
    <PromptHeader />
    <div
      class="rounded-lg shadow-2xl bg-white focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
    >
      <div class="flex flex-col p-4">
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
        <div class="border-t border-gray-200 w-full p-4 pb-0 flex justify-end items-center">
          <PromptRandomizer />
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
import PromptTagList from "@/components/prompt/PromptTagList.vue";
import PromptRandomizer from "@/components/prompt/PromptRandomizer.vue";
import BaseButton from "@/components/base/BaseButton.vue";

import { usePromptsStore } from "@/stores/prompt";

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

const promptStore = usePromptsStore();

const createItinerary = () => {
  promptStore.createItinerary();
};
</script>

<style scoped></style>
