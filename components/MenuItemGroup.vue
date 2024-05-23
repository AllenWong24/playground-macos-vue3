<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    border?: boolean
  }>(),
  {
    border: true,
  },
)

const border = computed(
  () => (
    props.border
      ? 'border-b-2 border-gray-400 dark:border-gray-500'
      : ''
  ),
)
</script>

<template>
  <ul :class="`py-1 ${border}`">
    <slot />
  </ul>
</template>
