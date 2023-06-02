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
        'block w-full h-44 resize-none rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 text-sm md:text-base placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6',
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
  type: {
    type: String,
    default: "text",
  },
});

const localValue = ref(props.modelValue);

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
