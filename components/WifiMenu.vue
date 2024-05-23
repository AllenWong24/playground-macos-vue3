<script setup lang="ts">
const props = defineProps<{
  visible: boolean
  btnSelector?: string | string[]
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const systemStore = useSystemStore()

const visible = useVModel(props, 'visible', emit)

const wifiMenu = ref<HTMLDivElement>()

function onChange(e: Event) {
  systemStore.toggleWIFI((e.target as HTMLInputElement).checked)
}

onClickOutside(
  wifiMenu,
  () => {
    visible.value = false
  },
  {
    ignore: isArray(props.btnSelector) ? props.btnSelector : [props.btnSelector],
  },
)
</script>

<template>
  <div
    v-if="visible"
    ref="wifiMenu"
    class="menu-box h-11 w-80 max-w-full top-8 right-0 sm:right-2 px-2 py-0.5 flex gap-2 rounded-lg"
  >
    <div class="w-4/5 p-2.5 font-medium">
      Wi-Fi
    </div>
    <div class="w-1/5 py-2 text-center">
      <label class="switch-toggle">
        <input
          type="checkbox"
          :checked="systemStore.wifi"
          @change="onChange"
        >
        <span class="slider-toggle" />
      </label>
    </div>
  </div>
</template>
