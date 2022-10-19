<script setup lang="ts">
// import TopBar from "@/components/menus/TopBar";
// import Dock from "@/components/dock/Dock";
// import Launchpad from "@/components/Launchpad";
// import Window from "@/components/Window";
// import Spotlight from "@/components/Spotlight";
import { apps, wallpapers } from "@/configs";

interface Emit {
  (e: "setLogin", val: boolean): void;
  (e: "shutMac"): void;
  (e: "restartMac"): void;
  (e: "sleepMac"): void;
}

const emit = defineEmits<Emit>();

const minMarginY = 24;
</script>

<template>Desktop</template>
