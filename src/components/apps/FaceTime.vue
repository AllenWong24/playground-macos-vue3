<script setup lang="ts">
// TODO find a webcamjs
const click = ref(false)
const img = ref('')
</script>

<template>
  <div id="container" class="h-full flex-center flex-col bg-gray-800 space-y-6">
    <img
      v-if="img"
      className="border-8 border-white max-h-60 md:max-h-96"
      :src="img"
      alt="yourimage"
    >
    <button
      class="mx-auto h-6 w-20 bg-white text-black no-outline"
      border="1 black opacity-50 rounded-full"
      @click="click = false"
    >
      <b>Retake</b>
    </button>
  </div>
</template>
