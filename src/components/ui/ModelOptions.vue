<template>
    <RadioGroup v-model="selected">
    <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
    <div class="space-y-4">
      <RadioGroupOption as="template" v-for="plan in models" :key="plan.name" :value="plan" v-slot="{ checked, active }">
        <div :class="[checked ? 'border-transparent' : 'border-gray-300', active ? 'border-indigo-600 ring-2 ring-indigo-600' : '', 'relative cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none flex justify-between']">
          <div class="flex flex-col w-full">
            <div class="flex items-center justify-between w-full">
                <span class="flex flex-col text-sm">
                  <RadioGroupLabel as="span" class="font-medium text-gray-900">{{ plan.name }}</RadioGroupLabel>
                </span>
              <RadioGroupDescription as="span" class="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right">
                <span class="font-medium text-gray-900">{{ plan.price }}</span>
              </RadioGroupDescription>
            </div>
            <div>
              <RadioGroupDescription as="span" class="text-gray-500">
                    <span class="block sm:inline">{{ plan.title }}</span>
                    {{ ' ' }}
                    <span class="hidden sm:mx-1 sm:inline" aria-hidden="true">&middot;</span>
                  </RadioGroupDescription>
            </div>
          </div>
          <span :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-600' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']" aria-hidden="true" />
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<script setup>
import { ref, watch } from 'vue'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const models = [
  { name: 'Explorer (GPT-3.5 Turbo)', title: 'Personalized travel advice, uncovering hidden gems.', model: 'gpt-3.5-turbo', price: 'Free forever' },
  { name: 'Adventurer (GPT-4+)', title: "Superior travel planning, offering a personalized and anticipative adventure.", model: 'gpt-4', price: '$1 / token' },
]

const selected = ref(models[0])

watch(selected, (value) => {
    userStore.selectedModel = value.model;
})

</script>

<style lang="scss" scoped>

</style>