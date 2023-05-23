<template>
  <div>Logging in</div>
</template>

<script setup>
import Api from "@/services/Api.service.js";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const props = defineProps({
  urlParams: {
    type: Object,
    required: true,
  },
});

const loginWithCallback = async () => {
  if (this.urlParams.code) {
    await userStore.google_callback(props.urlParams);
  }
};

loginWithCallback();
</script>

<style lang="scss" scoped></style>
