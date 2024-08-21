<script setup lang="ts">
const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const value = useVModel(props, 'modelValue', emit)
</script>

<template>
  <div class="slider flex-center w-full relative border border-gray-300 dark:border-gray-600 rounded-full">
    <div class="h-6 p-1 flex-center absolute left-0 rounded-full z-100">
      <slot />
    </div>
    <div class="w-3 h-6 rounded-l-full bg-gray-100 dark:bg-gray-800" />
    <Slider
      v-model="value"
      class="w-full"
      :min="1"
      :max="100"
      :tooltips="false"
      orientation="horizontal"
    />
    <div class="w-3 h-6 rounded-r-full bg-gray-300 dark:bg-gray-600" />
  </div>
</template>
