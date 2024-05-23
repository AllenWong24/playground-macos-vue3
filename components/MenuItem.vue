<script setup lang="ts">
const emit = defineEmits(['click'])
</script>

<template>
  <li
    class="px-5 leading-6 cursor-default"
    text="black hover:white dark:(white hover:black)"
    bg="hover:blue-500 dark:hover:blue-400"
    @click="emit('click')"
  >
    <slot />
  </li>
</template>
