<template>
    <div
      @click="toggleTag"
      :class="[
        'relative',
        'flex',
        'items-center justify-center',
        'w-fit md:w-full',
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
      :key="tag"
    >
      {{ tag }}
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  
  const props = defineProps({
    tag: String,
    selectedTags: Array,
    selectedColor: String,
    selectedTextColor: String
  });

  const key = ref(props.tag);
  
  const isSelected = ref(false);

  watch(() => props.selectedTags, (newVal) => {
    isSelected.value = newVal.includes(props.tag);
  }, { deep: true });
  
  const toggleTag = () => {
    if (isSelected.value) {
      props.selectedTags.splice(props.selectedTags.indexOf(props.tag), 1);
    } else {
      props.selectedTags.push(props.tag);
    }
    isSelected.value = !isSelected.value;
    key.value = props.tag + 1;
  };
  </script>