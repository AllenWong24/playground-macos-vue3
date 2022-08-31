<script setup lang="ts">
interface Props {
  restart: boolean;
  sleep: boolean;
}

interface Emit {
  (e: "changeBooting", val: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  restart: false,
  sleep: false,
});

const emit = defineEmits<Emit>();
</script>

<template>Boot</template>
