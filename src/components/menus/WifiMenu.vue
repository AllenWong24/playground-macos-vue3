<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import { useSystemStore } from '@/stores/system'

interface Props {
  toggleAppleMenu: () => void
}

const props = defineProps<Props>()

const store = useSystemStore()

const target = ref(null)
onClickOutside(target.value, props.toggleAppleMenu)
</script>

<template>
  <div
    ref="target"
    class="right-0 top-8 h-11 max-w-full w-80 flex gap-2 border rounded-lg px-2 py-0.5 menu-box sm:right-2"
  >
    <div class="w-4/5 p-2.5 font-medium">
      Wi-Fi
    </div>
    <div class="w-1/5 py-2 text-center">
      <label class="switch-toggle">
        <input
          type="checkbox"
          :checked="store.wifi"
          @change="store.toggleWIFI(!store.wifi)"
        >
        <span class="slider-toggle" />
      </label>
    </div>
  </div>
</template>
