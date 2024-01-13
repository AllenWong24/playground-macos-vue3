<script setup lang="ts">
interface Emit {
  (e: 'click'): void
}

const emit = defineEmits<Emit>()
</script>

<template>
  <li
    class="cursor-default px-5 leading-6"
    text="black hover:white dark:(white hover:black)"
    bg="hover:blue-500 dark:hover:blue-400"
    @click="emit('click')"
  >
    <slot />
  </li>
</template>
