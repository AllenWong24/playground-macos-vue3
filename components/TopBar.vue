<script setup lang="ts">
const props = defineProps<{
  hide: boolean
  title: string
}>()

const emit = defineEmits<{
  (e: 'toggle-bar-item-type', type: string): void
}>()

const systemStore = useSystemStore()

const state = reactive({
  showControlCenter: false,
  showWifiMenu: false,
  showAppleMenu: false,
})

const date = useDateFormat(useNow(), 'ddd MMM D HH:mm')

function toggleAppleMenu() {
  state.showAppleMenu = !state.showAppleMenu
}

function toggleWifiMenu() {
  state.showWifiMenu = !state.showWifiMenu
}
</script>

<template>
  <div
    :class="props.hide ? 'z-0' : 'z-20'"
    class="w-full h-6 px-4 fixed top-0 flex-center-v justify-between text-sm text-white bg-gray-500 bg-opacity-10 backdrop-blur-2xl shadow transition"
  >
    <div class="flex-center-v space-x-4">
      <TopBarItem
        :force-hover="state.showAppleMenu"
        @click="toggleAppleMenu"
      >
        <Icon name="i-ri-apple-fill" size="16" />
      </TopBarItem>
      <span class="cursor-default font-semibold">{{ props.title }}</span>
    </div>
    <div class="flex-center-v flex-row justify-end space-x-2">
      <TopBarItem hide-on-mobile>
        <!-- <Battery /> -->
      </TopBarItem>
      <TopBarItem
        id="wifiBtn"
        hide-on-mobile
        @click="toggleWifiMenu"
      >
        <Icon v-if="systemStore.wifi" name="i-mdi-wifi" size="18" />
        <Icon v-else name="i-mdi-wifi-off" size="18" />
      </TopBarItem>
      <TopBarItem @click="emit('toggle-bar-item-type', 'spotlight')">
        <Icon name="i-bi-search" size="17" />
      </TopBarItem>
      <TopBarItem @click="emit('toggle-bar-item-type', 'control-center')">
        <CCMIcon :size="16" />
      </TopBarItem>
      <span class="shrink-0">{{ date }}</span>
    </div>
  </div>

  <!-- Open this when clicking on Apple logo -->
  <!-- <AppleMenu
      v-if="state.showAppleMenu"
      @logout="logout"
      @toggle-apple-menu="toggleAppleMenu"
    /> -->

  <!-- Open this when clicking on Control Center button -->
  <!-- <ControlCenterMenu
        v-if="state.showControlCenter"
        :playing="audioState.playing"
        toggle-audio="{controls.toggle}"
        set-volume="{setAudioVolume}"
        set-brightness="{setSiteBrightness}"
        @toggle-control-center="toggleControlCenter"
      /> -->

  <!-- Open this when clicking on Wifi button -->
  <WifiMenu v-model:visible="state.showWifiMenu" btn-selector="#wifiBtn" />
</template>
