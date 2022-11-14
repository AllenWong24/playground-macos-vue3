<script setup lang="ts">
interface Emit {
  (e: "click"): void;
}

const emit = defineEmits<Emit>();
</script>

<template>
  <li
    @click="emit('click')"
    class="px-5 leading-6 cursor-default"
    text="black hover:white dark:(white hover:black)"
    bg="hover:blue-500 dark:hover:blue-400"
  >
    <slot></slot>
  </li>
</template>
