<script setup lang="ts">
const props = defineProps<{
  visible: boolean
  btnSelector?: string | string[]
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const visible = useVModel(props, 'visible', emit)

const controlCenterRef = ref<HTMLDivElement>()

onClickOutside(
  controlCenterRef,
  () => {
    visible.value = false
  },
  {
    ignore: isArray(props.btnSelector) ? props.btnSelector : [props.btnSelector],
  },
)

const systemStore = useSystemStore()

const audio = ref<HTMLAudioElement>()
const { playing, volume } = useMediaControls(audio, {
  src: GLOBAL_CONFIG_MUSIC.audio,
})
const sliderVolume = computed({
  get() {
    return volume.value * 100
  },
  set(value: number) {
    volume.value = value / 100
  },
})
</script>

<template>
  <div
    v-if="visible"
    ref="controlCenterRef"
    class="fixed shadow-base w-80 h-96 max-w-full top-8 right-0 sm:right-2 p-2.5 grid cols-4 rows-5 gap-2"
    text="black dark:white"
    bg="gray-100 opacity-70 dark:(gray-800 opacity-70)"
    border="1 rounded-2xl gray-400 opacity-50 dark:(gray-500 opacity-50)"
  >
    <div class="cc-grid row-span-2 col-span-2 p-2 flex flex-col justify-around">
      <div class="flex-center-v space-x-2">
        <Icon
          name="i-mdi-wifi"
          :class="`${systemStore.wifi ? 'cc-btn' : 'cc-btn-active'}`"
          size="32"
          @click="systemStore.toggleWIFI(!systemStore.wifi)"
        />
        <div class="flex flex-col pt-0.5">
          <span class="font-medium leading-4">Wi-Fi</span>
          <span class="cc-text">{{ systemStore.wifi ? "Home" : "Off" }}</span>
        </div>
      </div>
      <div class="flex-center-v space-x-2">
        <Icon
          name="i-bi-bluetooth"
          :class="`${systemStore.bluetooth ? 'cc-btn' : 'cc-btn-active'}`"
          size="32"
          @click="systemStore.toggleBluetooth(!systemStore.bluetooth)"
        />
        <div class="flex flex-col pt-0.5">
          <span class="font-medium leading-4">Bluetooth</span>
          <span class="cc-text">{{ systemStore.bluetooth ? "On" : "Off" }}</span>
        </div>
      </div>
      <div class="flex-center-v space-x-2">
        <Icon
          name="i-mingcute-airdrop-line"
          :class="`${systemStore.airdrop ? 'cc-btn' : 'cc-btn-active'}`"
          size="32"
          @click="systemStore.toggleAirdrop(!systemStore.airdrop)"
        />
        <div class="flex flex-col pt-0.5">
          <span class="font-medium leading-4">AirDrop</span>
          <span class="cc-text">{{ systemStore.airdrop ? "Contacts Only" : "Off" }}</span>
        </div>
      </div>
    </div>
    <div class="cc-grid col-span-2 p-2 flex-center-v space-x-2">
      <Icon
        v-if="systemStore.dark"
        name="i-material-symbols-dark-mode-outline"
        class="cc-mode"
        size="32"
        @click="systemStore.toggleDark(false)"
      />
      <Icon
        v-else
        name="i-material-symbols-sunny"
        class="cc-mode"
        size="32"
        @click="systemStore.toggleDark(true)"
      />
      <div class="flex flex-col">
        <span class="font-medium ml-1">
          {{ systemStore.dark ? "Dark Mode" : "Light Mode" }}
        </span>
      </div>
    </div>
    <div class="cc-grid p-2 flex-center flex-col text-center">
      <Icon name="i-bi-brightness-alt-high" size="20" />
      <span class="text-xs leading-cc">Keyboard Brightness</span>
    </div>
    <div
      class="cc-grid p-2 flex-center flex-col text-center cursor-default"
      @click="systemStore.toggleFullScreen(!systemStore.fullscreen)"
    >
      <Icon v-if="systemStore.fullscreen" name="i-material-symbols-fullscreen-exit" size="16" />
      <Icon v-else name="i-material-symbols-fullscreen" size="16" />
      <span class="text-xs leading-cc mt-1.5">
        {{ systemStore.fullscreen ? "Exit Fullscreen" : "Enter Fullscreen" }}
      </span>
    </div>
    <div class="cc-grid col-span-4 px-2.5 py-2 space-y-1 flex flex-col justify-around">
      <span class="font-medium ml-0.5">Display</span>
      <SliderComponent v-model="systemStore.brightness">
        <Icon
          name="i-material-symbols-sunny"
          class="text-gray-500 dark:text-gray-400"
          size="12"
        />
      </SliderComponent>
    </div>
    <div class="cc-grid col-span-4 px-2.5 py-2 space-y-1 flex flex-col justify-around">
      <span class="font-medium ml-0.5">Sound</span>
      <SliderComponent v-model="sliderVolume">
        <Icon
          name="i-material-symbols-volume-up"
          class="text-gray-500 dark:text-gray-400"
          size="12"
        />
      </SliderComponent>
    </div>
    <div class="cc-grid col-span-4 p-2 pr-4 flex-center-v flex-row justify-between space-x-2.5">
      <img :src="GLOBAL_CONFIG_MUSIC.cover" alt="cover art" class="w-12 rounded-lg">
      <div class="flex flex-col flex-grow justify-start">
        <span class="font-medium">{{ GLOBAL_CONFIG_MUSIC.title }}</span>
        <span class="cc-text">{{ GLOBAL_CONFIG_MUSIC.artist }}</span>
      </div>
      <Icon
        v-if="playing"
        name="i-material-symbols-pause"
        size="24"
        @click="playing = false"
      />
      <Icon
        v-else
        name="i-material-symbols-play-arrow"
        size="24"
        @click="playing = true"
      />
    </div>
  </div>
  <audio ref="audio" class="h-0" />
</template>
