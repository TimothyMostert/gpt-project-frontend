<template>
  <div
    @click="toggleInterest"
    :class="[
      'relative',
      'flex',
      'items-center justify-center',
      'w-full',
      'whitespace-nowrap',
      'rounded-full',
      'px-2',
      'py-2',
      'cursor-pointer',
      'text-sm',
      'font-medium',
      'sm:px-3',
      isSelected ? props.selectedTextColor : 'text-gray-500',
      isSelected ? props.selectedColor : 'bg-gray-100',
    ]"
    :key="interest"
  >
    {{ interest }}
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useCreateStore } from "@/stores/create";
import { useValidationStore } from "@/stores/validation";

const createStore = useCreateStore();

const props = defineProps({
  interest: String,
  selectedColor: String,
  selectedTextColor: String,
});

const isSelected = ref(false);

watch(
  () => createStore.interests,
  (newVal) => {
    isSelected.value = newVal.includes(props.interest);
  },
  { deep: true, immediate: true }
);

const toggleInterest = () => {
  const validationStore = useValidationStore();
  if (isSelected.value) {
    createStore.interests.splice(createStore.interests.indexOf(props.interest), 1);
  } else {
    createStore.interests.push(props.interest);
  }
  isSelected.value = !isSelected.value;
  validationStore.clearPromptTagError();
};
</script>
