<script setup lang="ts">
interface Emit {
  (e: "changeLogin", val: boolean): void;
  (e: "shutMac"): void;
  (e: "sleepMac"): void;
  (e: "restartMac"): void;
}

const emit = defineEmits<Emit>();
</script>

<template>Login</template>
