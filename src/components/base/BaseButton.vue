<!-- BaseButton.vue -->
<template>
  <button
    :type="type"
    :disabled="disabled"
    v-bind="$attrs"
    @click="onClick"
    class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    :class="customClasses"
  >
    <slot></slot>
  </button>
</template>

<script setup>

const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  customClasses: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["click"]);

const onClick = (event) => {
  if (!props.disabled) {
    emit("click", event);
  }
};
</script>