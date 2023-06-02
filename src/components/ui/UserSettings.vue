<template>
  <TransitionRoot as="template" :show="props.open">
    <Dialog as="div" class="relative z-50" @close="closeMenu">
      <div class="fixed inset-0" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <h2
                        id="slide-over-heading"
                        class="text-base font-semibold leading-6 text-gray-900"
                      >
                        Profile
                      </h2>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-primaryBlue"
                          @click="closeMenu"
                        >
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- Main -->
                  <div class="h-full flex flex-col">
                    <div class="pb-1 sm:pb-6">
                      <div>
                        <div class="relative h-40 sm:h-56">
                          <img
                            class="absolute h-full w-full object-cover"
                            src="@/assets/images/profile-bg.png"
                            alt="magical travel experience, man walks with suitcases into the unknown"
                          />
                        </div>
                        <div class="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                          <div class="sm:flex-1">
                            <div>
                              <div class="flex items-center">
                                <h3 class="text-xl font-bold text-gray-900 sm:text-2xl">
                                  {{ userStore.user.name }}
                                </h3>
                                <span
                                  class="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400"
                                >
                                  <span class="sr-only">Online</span>
                                </span>
                              </div>
                              <p class="text-sm text-gray-500">
                                {{ userStore.user.email }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="px-4 pb-5 pt-5">
                      <TokensDisplay />
                    </div>
                    <div class="px-4 pb-5 pt-5">
                      <ModelOptions />
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useUserStore } from "@/stores/user";
import { useStateStore } from "@/stores/state";
import ModelOptions from "@/components/ui/ModelOptions.vue";
import TokensDisplay from "@/components/ui/TokensDisplay.vue";

const userStore = useUserStore();
const stateStore = useStateStore();

// // Get the 'modelValue' prop (which is used for v-model)
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const closeMenu = () => {
  stateStore.userProfileSettingsIsOpen = false;
};
  
</script>

<style lang="scss" scoped></style>
