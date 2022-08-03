<script setup lang="ts">
import { ref } from "vue";

const login = ref(false);
const booting = ref(false);
const restart = ref(false);
const sleep = ref(false);

const shutMac = () => {
  login.value = false;
};
</script>

<template>
  <div>App.vue</div>
  <span class="logo">Hello</span>
</template>
