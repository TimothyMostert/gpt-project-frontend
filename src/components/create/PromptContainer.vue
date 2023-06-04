<template>
  <section>
    <div class="rounded-lg shadow-2xl bg-white">
      <!-- <Breadcrumbs /> -->
      <div class="p-4">
        <Transition name="slide">
          <div :key="'prompt-'+stateStore.prompt.isOpen" class="mb-4">
          <div v-if="stateStore.prompt.step == 'prompt'">
            <PromptHeader :heading="promptHeading" :subheading="promptSubHeading" />
            <BaseTextArea
              v-model="createStore.promptText"
              id="main-prompt-textarea"
              :placeholder="'eg: ' + createStore.placeholder"
              @input="promptTextArea.handleInput"
              @focus="promptTextArea.handleFocus"
              @blur="promptTextArea.handleBlur"
              class="my-4"
              type="main-prommpt"
            />
            <PromptTools class="-mt-12 mr-2" />
            <div class="w-full mt-4 pt-4 pb-0 flex justify-end items-center">
              <BaseButton
                @click="stateStore.prompt.step = 'tag'"
                customClasses="bg-gradient-to-br from-primaryBlue to-secondaryBlue w-fit ml-auto"
              >
                Continue
              </BaseButton>
            </div>
          </div>
          <div v-if="stateStore.prompt.step == 'tag'">
            <PromptHeader :heading="tagHeading" :subheading="tagSubHeading" />
            <PromptInterestList v-model="createStore.interests" class="my-4" />
            <div class="w-full mt-4 pt-4 pb-0 flex justify-between items-center">
              <BaseButton
                @click="stateStore.prompt.step = 'prompt'"
                customClasses="bg-gradient-to-br from-primaryOrange to-secondaryOrange w-fit"
              >
                Back
              </BaseButton>
              <BaseButton
                @click="createTrip"
                customClasses="bg-gradient-to-br from-primaryBlue to-secondaryBlue w-fit ml-auto"
              >
                Create Trip
              </BaseButton>
            </div>
          </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import PromptHeader from "@/components/create/PromptHeader.vue";
import BaseTextArea from "@/components/base/BaseTextArea.vue";
import PromptInterestList from "@/components/create/PromptInterestList.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import PromptTools from "@/components/create/PromptTools.vue";
// import Breadcrumbs from "@/components/ui/Breadcrumbs.vue";

import { useCreateStore } from "@/stores/create";
import { useStateStore } from "@/stores/state";
import { ref } from "vue";

import examplePrompts from "@/assets/json/examplePrompts.json";

const createStore = useCreateStore();
const stateStore = useStateStore();

const used = ref(false);

const promptHeading = "Create Your Dream Journey";
const promptSubHeading = "Locations, activities, themes. Write as much or as little as you want, or try our example prompts";
const tagHeading = "Tag your trip";
const tagSubHeading = "Select up to 6 from the categories below";

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
    createStore.placeholder = result.prompt;
    createStore.placeholderTags = result.tags;
  }
};

setInterval(async () => {
  getRandomPrompt();
}, 6000);

const createTrip = () => {
  createStore.createTrip();
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
