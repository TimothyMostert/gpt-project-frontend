<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 backdrop-blur bg-primaryBlue bg-opacity-20 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden border-2 border-primaryBlue rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <img
                src="@/assets/images/logo_gif.gif"
                alt="animated dream trip logo sleek"
                class=""
              />
              <div class="text-base font-semibold text-gray-700 text-center">
                {{ currentStep }}
              </div>
              <div class="text-xs text-gray-400 mt-2 text-center">
                (please be patient this may take a few minutes)
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";

const open = ref(true);

const step = ref(1);
const currentStep = computed(() => {
  switch (step.value) {
    case 1:
      return "Gathering personalized preferences...";
    case 2:
      return "Researching and selecting activities...";
    case 3:
      return "Optimizing the trip schedule...";
    case 4:
      return "Cross-checking availability and restrictions...";
    case 5:
      return "Finalizing your tailored trip...";
  }
});

const updateLoadingStep = async () => {
  for (let i = 1; i <= 4; i++) {
    step.value = i;
    await new Promise((resolve) => setTimeout(resolve, 6000));
  }
};

watchEffect(() => {
  updateLoadingStep();
});
</script>
