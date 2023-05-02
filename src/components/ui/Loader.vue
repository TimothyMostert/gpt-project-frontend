<script setup>
    import { BounceLoader } from "vue3-spinner";

    const loader = {
    stepCount: 2500,
    backgroundColor: "linear-gradient(to right, lightgray, gray)",
    opacity: 0.8,
    spinnerSize: "100px",
    spinnerColor: "white",
    };
</script>
        
<template>
  <div
    class="
      m-auto
      z-50
      flex flex-col
      justify-center
      items-center
      fixed
      top-0
      left-0
      right-0
      bottom-0
      bg-gray-700 bg-opacity-50
    "
  >
    <BounceLoader
      :loading="true"
      :color="loader.spinnerColor"
      :size="loader.spinnerSize"
    />
  </div>
</template>
  

  