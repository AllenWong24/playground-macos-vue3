<script setup lang="ts">
interface Emit {
  (e: "changeLogin", val: boolean): void;
  (e: "shutMac"): void;
  (e: "sleepMac"): void;
  (e: "restartMac"): void;
}

const emit = defineEmits<Emit>();
</script>

<template>
  <div>
    Login
    <div class="i-gg:sleep"></div>
    <div class="i-twemoji:sleepy-face"></div>
    <div class="i-carbon:asleep-filled"></div>
  </div>
</template>
