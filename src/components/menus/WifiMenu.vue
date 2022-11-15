<script setup lang="ts">
import { useSystemStore } from "@/stores/system";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

interface Props {
  toggleAppleMenu: () => void;
}

const props = defineProps<Props>();

const store = useSystemStore();

const target = ref(null);
onClickOutside(target.value, props.toggleAppleMenu);
</script>

<template>
  <div
    class="menu-box border h-11 w-80 max-w-full top-8 right-0 sm:right-2 px-2 py-0.5 flex gap-2 rounded-lg"
    ref="target"
  >
    <div class="w-4/5 p-2.5 font-medium">Wi-Fi</div>
    <div class="w-1/5 py-2 text-center">
      <label class="switch-toggle">
        <input
          type="checkbox"
          :checked="store.wifi"
          @change="store.toggleWIFI(!store.wifi)"
        />
        <span class="slider-toggle" />
      </label>
    </div>
  </div>
</template>
