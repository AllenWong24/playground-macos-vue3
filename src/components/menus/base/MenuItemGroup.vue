<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  border?: boolean
}

const props = defineProps<Props>()

const _border = computed(() =>
  props.border === false
    ? ''
    : 'border-b-2 border-gray-400 dark:border-gray-500',
)
</script>

<template>
  <ul :class="`py-1 ${_border}`">
    <slot />
  </ul>
</template>
