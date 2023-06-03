<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <div class="flex justify-center items-start space-x-4 w-full">
    <div class="min-w-0 flex-1">
      <div class="flex justify-end items-center pt-2">
        <div class="flex items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
          <button
            type="button"
            class="inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
          >
            <ShareIcon class="h-6 w-6" aria-hidden="true" />
            <span class="sr-only">Share trip</span>
          </button>
        </div>
        <div class="flex items-center justify-center rounded-full text-gray-400 hover:text-gray-500 ml-2">
          <button
            type="button"
            class="inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            <span class="sr-only">Save trip to google</span>
          </button>
        </div>
        <div class="mt-1.5 ml-2">
          <Listbox as="div" v-model="selected">
            <ListboxLabel class="sr-only">Your mood</ListboxLabel>
            <div class="relative items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
              <ListboxButton
                class="relative inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
              >
                <span class="flex items-center justify-center">
                  <span v-if="selected.value === null">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                      />
                    </svg>

                    <span class="sr-only">Add your mood</span>
                  </span>
                  <span v-if="!(selected.value === null)">
                    <span
                      :class="[
                        selected.bgColor,
                        'flex h-8 w-8 items-center justify-center rounded-full',
                      ]"
                    >
                      <component
                        :is="selected.icon"
                        class="h-5 w-5 flex-shrink-0 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span class="sr-only">{{ selected.name }}</span>
                  </span>
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm"
                >
                  <ListboxOption
                    as="template"
                    v-for="mood in moods"
                    :key="mood.value"
                    :value="mood"
                    v-slot="{ active }"
                  >
                    <li
                      :class="[
                        active ? 'bg-gray-100' : 'bg-white',
                        'relative cursor-default select-none px-3 py-2',
                      ]"
                    >
                      <div class="flex items-center">
                        <div
                          :class="[
                            mood.bgColor,
                            'flex h-8 w-8 items-center justify-center rounded-full',
                          ]"
                        >
                          <component
                            :is="mood.icon"
                            :class="[mood.iconColor, 'h-5 w-5 flex-shrink-0']"
                            aria-hidden="true"
                          />
                        </div>
                        <span class="ml-3 block truncate font-medium">{{
                          mood.name
                        }}</span>
                      </div>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  FaceSmileIcon as FaceSmileIconOutline,
  ShareIcon,
} from "@heroicons/vue/24/outline";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import {
  FaceFrownIcon,
  FaceSmileIcon as FaceSmileIconMini,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/vue/20/solid";

const moods = [
  {
    name: "Excited",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: FaceSmileIconMini,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    icon: HandThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XMarkIcon,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

const selected = ref(moods[5]);
</script>
