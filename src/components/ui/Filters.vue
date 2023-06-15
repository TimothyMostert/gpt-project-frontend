<template>
  <div class="bg-white">
    <!-- Filters -->
    <Disclosure
      as="filters"
      aria-labelledby="filter-heading"
      class="grid items-center border-b border-gray-200"
    >
      <h2 id="filter-heading" class="sr-only">Filters</h2>
      <div class="relative col-start-1 row-start-1 py-4">
        <div
          class="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8"
        >
          <div>
            <DisclosureButton class="group flex items-center font-medium text-gray-700">
              <FunnelIcon
                class="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              {{ exploreStore.numberOfTotalTagsSelected }} Filters
            </DisclosureButton>
          </div>
          <div class="pl-6">
            <button @click="exploreStore.clearFilters()" type="button" class="text-gray-500">Clear all</button>
          </div>
        </div>
      </div>
      <DisclosurePanel class="border-t border-gray-200 pt-4 pb-10">
        <div
          class="w-full  gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8 mb-6 lg:pr-12"
        >
          <div class="relative">
            <input
              :value="localSearch"
              @input="updateValue"
              type="text"
              name="name"
              id="name"
              class="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Title or location"
            />
            <div
              class="absolute inset-x-0 bottom-0 border-gray-300 peer-focus:border-t-2 peer-focus:border-primaryBlue"
              aria-hidden="true"
            />
          </div>
        </div>
        <div
          class="mx-auto grid max-w-7xl md:grid-cols-2 gap-10 px-4 text-sm sm:px-6 md:gap-6 lg:px-8"
        >
          <div class="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
            <fieldset>
              <legend class="block font-medium">Active tags</legend>
              <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                <div
                  v-for="(option, optionIdx) in exploreStore.filters.tags.activeList"
                  :key="option.value"
                  class="flex items-center text-base sm:text-sm"
                >
                  <input
                    :id="`activeList-${optionIdx}`"
                    name="activeList[]"
                    v-model="exploreStore.filters.tags.activeList[optionIdx].checked"
                    type="checkbox"
                    class="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-primaryBlue focus:ring-primaryBlue"
                    :checked="option.checked"
                  />
                  <label
                    :for="`activeList-${optionIdx}`"
                    class="ml-3 min-w-0 flex-1 text-gray-600"
                    >{{ option.label }}</label
                  >
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend class="block font-medium">Leisure tags</legend>
              <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                <div
                  v-for="(option, optionIdx) in exploreStore.filters.tags.leisureList"
                  :key="option.value"
                  class="flex items-center text-base sm:text-sm"
                >
                  <input
                    :id="`leisureList-${optionIdx}`"
                    name="leisureList[]"
                    v-model="exploreStore.filters.tags.leisureList[optionIdx].checked"
                    type="checkbox"
                    class="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-primaryBlue focus:ring-primaryBlue"
                    :checked="option.checked"
                  />
                  <label
                    :for="`leisureList-${optionIdx}`"
                    class="ml-3 min-w-0 flex-1 text-gray-600"
                    >{{ option.label }}</label
                  >
                </div>
              </div>
            </fieldset>
          </div>
          <div class="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
            <fieldset>
              <legend class="block font-medium">Travel style</legend>
              <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                <div
                  v-for="(option, optionIdx) in exploreStore.filters.tags.travelStyle"
                  :key="option.value"
                  class="flex items-center text-base sm:text-sm"
                >
                  <input
                    :id="`travelStyle-${optionIdx}`"
                    name="travelStyle[]"
                    v-model="exploreStore.filters.tags.travelStyle[optionIdx].checked"
                    type="checkbox"
                    class="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-primaryBlue focus:ring-primaryBlue"
                    :checked="option.checked"
                  />
                  <label
                    :for="`travelStyle-${optionIdx}`"
                    class="ml-3 min-w-0 flex-1 text-gray-600"
                    >{{ option.label }}</label
                  >
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend class="block font-medium">Budget</legend>
              <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                <div
                  v-for="(option, optionIdx) in exploreStore.filters.tags.budget"
                  :key="option.value"
                  class="flex items-center text-base sm:text-sm"
                >
                  <input
                    :id="`budget-${optionIdx}`"
                    name="budget[]"
                    v-model="exploreStore.filters.tags.budget[optionIdx].checked"
                    type="checkbox"
                    class="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-primaryBlue focus:ring-primaryBlue"
                    :checked="option.checked"
                  />
                  <label
                    :for="`budget-${optionIdx}`"
                    class="ml-3 min-w-0 flex-1 text-gray-600"
                    >{{ option.label }}</label
                  >
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { FunnelIcon } from "@heroicons/vue/20/solid";
import { useExploreStore } from "@/stores/explore";
import { watch, ref } from "vue";
import _debounce from "lodash/debounce"

const exploreStore = useExploreStore();

const localSearch = ref("");

const updateValue = _debounce((event) => {
  exploreStore.filters.search = event.target.value;
} ,600)

watch(
        () => exploreStore.filters,
        () => {
          exploreStore.applyFilter();
        },
        { deep: true } // Deep watch because `filters` is a nested object
      );


</script>
