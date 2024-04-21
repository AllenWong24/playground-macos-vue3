<script setup lang="ts">
const route = useRoute()
const mode = route.params.mode
</script>

<template>
  <div class="boot">
    boot
    <div class="boot-mode">
      mode: {{ mode }}
    </div>
  </div>
</template>
