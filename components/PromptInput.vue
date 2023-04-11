<template>
  <div class="flex flex-col space-y-4 w-full">
    <textarea
      class="block w-full px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      v-model="prompt"
      placeholder="Enter your GPT prompt here"
    ></textarea>
    <button
      class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      @click="generate()"
    >
      Generate
    </button>
    <div v-if="generatedText" class="px-4 py-2 border rounded-md">
      {{ generatedText }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Configuration, OpenAIApi } from "openai";

const runtimeConfig = useRuntimeConfig();

const configuration = new Configuration({
  apiKey: runtimeConfig.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const prompt = ref("");
const generatedText = ref(null);

async function generate() {
  const result = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt.value,
  });
  generatedText.value = result.data.choices[0].text;
}
</script>

<style lang="scss" scoped></style>
