<script setup lang="ts">
import { wallpapers, user } from "@/configs";
import { ref } from "vue";
import { useSystemStore } from "@/stores/system";
import { storeToRefs } from "pinia";

interface Emit {
  (e: "changeLogin", val: boolean): void;
  (e: "shutMac"): void;
  (e: "sleepMac"): void;
  (e: "restartMac"): void;
}
const emit = defineEmits<Emit>();

const password = ref("");
const sign = ref("Click to enter");
const { dark } = storeToRefs(useSystemStore());
</script>

<template>
  <div>Login</div>
</template>
