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
  <div class="slider flex-center w-full border border-gray-300 dark:border-gray-600 rounded-full">
    <div class="h-5 w-9 p-r-2 flex-center rounded-l-full bg-gray-100 dark:bg-gray-800">
      <slot />
    </div>
    <Slider
      v-model="value"
      class="flex-1"
      :min="1"
      :max="100"
      :tooltips="false"
      orientation="horizontal"
    />
    <div class="w-3 h-5 rounded-r-full bg-gray-300 dark:bg-gray-600" />
  </div>
</template>
