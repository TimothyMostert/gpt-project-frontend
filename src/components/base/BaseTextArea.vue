<!-- BaseTextArea.vue -->
<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <textarea
      :id="id"
      v-bind="$attrs"
      v-model="localValue"
      :placeholder="placeholder"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
      :class="[
        'mt-1 h-24 block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6',
        customClass,
      ]"
    ></textarea>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  customClass: {
    type: String,
    default: "",
  },
});

const localValue = ref(props.modelValue);

console.log(props.customClass);

watch(
  () => props.modelValue,
  (newValue) => (localValue.value = newValue)
);

const emit = defineEmits(["update:modelValue", "input", "focus", "blur"]);

const onInput = () => {
  emit("update:modelValue", localValue.value);
  emit("input", localValue.value);
};

const onFocus = (event) => {
  emit("focus", event);
};

const onBlur = (event) => {
  emit("blur", event);
};
</script>
