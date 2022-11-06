<script setup lang="ts">
// TODO import TopBar from "@/components/menus/TopBar";
// TODO import Dock from "@/components/dock/Dock";
// TODO import Launchpad from "@/components/Launchpad";
// TODO import Window from "@/components/Window";
// TODO import Spotlight from "@/components/Spotlight";
import { apps, wallpapers } from "@/configs";
import { reactive, ref } from "vue";
import { useSystemStore } from "@/stores/system";
import { storeToRefs } from "pinia";

interface Emit {
  (e: "setLogin", val: boolean): void;
  (e: "shutMac"): void;
  (e: "restartMac"): void;
  (e: "sleepMac"): void;
}

const emit = defineEmits<Emit>();

interface DesktopState {
  showApps: {
    [key: string]: boolean;
  };
  appsZ: {
    [key: string]: number;
  };
  maxApps: {
    [key: string]: boolean;
  };
  minApps: {
    [key: string]: boolean;
  };
  maxZ: number;
  showLaunchpad: boolean;
  currentTitle: string;
  hideDockAndTopbar: boolean;
  spotlight: boolean;
}

const minMarginY = 24;

const state = reactive<DesktopState>({
  showApps: {},
  appsZ: {},
  maxApps: {},
  minApps: {},
  maxZ: 2,
  showLaunchpad: false,
  currentTitle: "Finder",
  hideDockAndTopbar: false,
  spotlight: false,
});

const spotlightBtnRef = ref<HTMLDivElement | null>(null);

const { dark, brightness } = storeToRefs(useSystemStore());
</script>

<template>Desktop</template>
