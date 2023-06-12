<template>
  <section>
    <div class="rounded-lg shadow-2xl bg-white">
      <div class="md:hidden p-4">
        <Transition name="slide">
          <div :key="'prompt-' + stateStore.prompt.isOpen" class="mb-4">
            <div v-if="stateStore.prompt.step == 'prompt'">
              <PromptHeader :heading="promptHeading" :subheading="promptSubHeading" />
              <p class=" text-sm text-red-600 dark:text-red-500" v-if="validationStore.promptTextError">
                {{ validationStore.promptTextErrorText }}
              </p>
              <BaseTextArea
                v-model="createStore.promptText"
                id="main-prompt-textarea"
                :placeholder="currentPlaceholder"
                @input="promptTextArea.handleInput"
                @focus="promptTextArea.handleFocus"
                @blur="promptTextArea.handleBlur"
                class="my-4"
                :customClass="{'border border-red-500 ring-red-500 focus:ring-red-500': validationStore.promptTextError}"
                type="main-prommpt"
              />
              <PromptTools class="-mt-14 mr-2 z-10" />
              <!-- if promtTextError -->
              <div class="w-full mt-8 pt-4 pb-0 flex justify-end items-center">
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
              <p class="absolute -mt-2 ml-2 text-sm text-red-600 dark:text-red-500" v-if="validationStore.promptTagError">
                {{ validationStore.promptTagErrorText }}
              </p>
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
      <div class="hidden md:block w-full">
        <Transition name="slide">
          <div :key="'prompt-' + stateStore.prompt.isOpen" class="mb-4 gap-2 w-full">
            <div class="p-6">
              <PromptHeader :heading="promptHeading" :subheading="promptSubHeading" />
              <BaseTextArea
                v-model="createStore.promptText"
                id="main-prompt-textarea"
                :placeholder="currentPlaceholder"
                @input="promptTextArea.handleInput"
                @focus="promptTextArea.handleFocus"
                @blur="promptTextArea.handleBlur"
                class="my-4"
                :customClass="{'border border-red-500 ring-red-500 focus:ring-red-500': validationStore.promptTextError}"
                type="main-prommpt"
              />
              <PromptTools class="-mt-14 mr-2" />
              <p class="absolute mt-6 text-sm text-red-600 dark:text-red-500" v-if="validationStore.promptTextError">
                {{ validationStore.promptTextErrorText }}
              </p>
            </div>
            <div class="p-6">
              <PromptHeader :heading="tagHeading" :subheading="tagSubHeading" />
              <p class="absolute -mt-2 ml-2 text-sm text-red-600 dark:text-red-500" v-if="validationStore.promptTagError">
                {{ validationStore.promptTagErrorText }}
              </p>
              <PromptInterestList v-model="createStore.interests" class="m-4" />
              <div class="w-full mt-4 pt-4 pb-0 flex justify-between items-center">
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

import { computed } from "vue";

import { useCreateStore } from "@/stores/create";
import { useStateStore } from "@/stores/state";
import { useValidationStore } from "@/stores/validation";

const createStore = useCreateStore();
const stateStore = useStateStore();
const validationStore = useValidationStore();

const promptHeading = "Create Your Dream Journey";
const promptSubHeading =
  "Locations, activities, themes. Write as much or as little as you want, or try our example prompts";
const tagHeading = "Tag your trip";
const tagSubHeading = "Select up to 6 from the categories below";

const currentPlaceholder = computed(() => {
  return 'Eg: ' + createStore.getCurrentPlaceholderPrompt;
});

const promptTextArea = {
  Label: "Let your dreams run wild!",
  handleInput: (event) => {
    validationStore.clearPromptTextError();
  },
  handleFocus: (event) => {},
  handleBlur: (event) => {},
};

const updatePlaceholderIndex = async () => {
  if (createStore.usedExample) return;
  if (createStore.placeholderIndex == createStore.placeholderArray.length - 1) {
    createStore.placeholderIndex = 0;
    return;
  }
  createStore.placeholderIndex = createStore.placeholderIndex + 1;
};

setInterval(async () => {
  updatePlaceholderIndex();
}, 6000);

const createTrip = () => {
  if (!validationStore.validatePrompt()) return;
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
