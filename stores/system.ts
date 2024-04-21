export const useSystemStore = defineStore('system', () => {
  const state = reactive({
    dark: false,
    volume: 100,
    brightness: 80,
    wifi: true,
    bluetooth: true,
    airdrop: true,
    fullscreen: false,
  })

  function toggleDark(value: boolean) {
    state.dark = value
    if (value)
      document.documentElement.classList.add('dark')
    else
      document.documentElement.classList.remove('dark')
  }

  function setVolume(value: number) {
    state.volume = value
  }

  function setBrightness(value: number) {
    state.brightness = value
  }

  function toggleWIFI(value: boolean) {
    state.wifi = value
  }

  function toggleBluetooth(value: boolean) {
    state.bluetooth = value
  }

  function toggleAirdrop(value: boolean) {
    state.airdrop = value
  }

  function toggleFullScreen(value: boolean) {
    value ? enterFullScreen() : exitFullScreen()
    state.fullscreen = value
  }

  return {
    state: readonly(state),
    toggleDark,
    setVolume,
    setBrightness,
    toggleWIFI,
    toggleBluetooth,
    toggleAirdrop,
    toggleFullScreen,
  }
})
