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
  <div class="slider flex w-full position-relative">
    <div
      class="h-7 p-2 flex-center-v flex-col"
      border="t l b rounded-l-full gray-300 dark:gray-600"
      bg="gray-100 dark:gray-800"
    >
      <slot />
    </div>
    <Slider
      v-model="value"
      :min="1"
      :max="100"
      :tooltips="false"
      orientation="horizontal"
    />
  </div>
</template>
