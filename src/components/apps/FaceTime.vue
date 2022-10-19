<script setup lang="ts">
import { ref } from "vue";
// TODO: find a webcamjs
const click = ref(false);
const img = ref("");
</script>

<template>
  <div id="container" class="bg-gray-800 h-full flex-center flex-col space-y-6">
    <img
      v-if="img"
      className="border-8 border-white max-h-60 md:max-h-96"
      src="{img}"
      alt="yourimage"
    />
    <button
      class="text-black mx-auto no-outline bg-white h-6 w-20"
      border="1 black opacity-50 rounded-full"
      @click="click = false"
    >
      <b>Retake</b>
    </button>
  </div>
</template>
