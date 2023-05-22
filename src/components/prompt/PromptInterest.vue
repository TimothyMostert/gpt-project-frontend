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
        'text-sm md:text-xs',
        'font-medium',
        'sm:px-3',
        isSelected ? props.selectedTextColor : 'text-gray-500',
        isSelected ? props.selectedColor : 'bg-gray-100'
      ]"
      :key="interest"
    >
      {{ interest }}
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  
  const props = defineProps({
    interest: String,
    selectedInterests: Array,
    selectedColor: String,
    selectedTextColor: String
  });

  const key = ref(props.interest);
  
  const isSelected = ref(false);

  watch(() => props.selectedInterests, (newVal) => {
    isSelected.value = newVal.includes(props.interest);
  }, { deep: true, immediate: true });
  
  const toggleInterest = () => {
    if (isSelected.value) {
      props.selectedInterests.splice(props.selectedInterests.indexOf(props.interest), 1);
    } else {
      props.selectedInterests.push(props.interest);
    }
    isSelected.value = !isSelected.value;
    key.value = props.interest + 1;
  };
  </script>