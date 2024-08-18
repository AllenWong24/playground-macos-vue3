export const useSystemStore = defineStore('system', () => {
  const dark = ref(false)
  const brightness = ref(80)
  const wifi = ref(true)
  const bluetooth = ref(true)
  const airdrop = ref(true)
  const fullscreen = ref(false)

  function toggleDark(value: boolean) {
    dark.value = value
    if (value)
      document.documentElement.classList.add('dark')
    else
      document.documentElement.classList.remove('dark')
  }

  function toggleWIFI(value: boolean) {
    wifi.value = value
  }

  function toggleBluetooth(value: boolean) {
    bluetooth.value = value
  }

  function toggleAirdrop(value: boolean) {
    airdrop.value = value
  }

  function toggleFullScreen(value: boolean) {
    value ? enterFullScreen() : exitFullScreen()
    fullscreen.value = value
  }

  return {
    // state
    dark,
    brightness,
    wifi,
    bluetooth,
    airdrop,
    fullscreen,
    // actions
    toggleDark,
    toggleWIFI,
    toggleBluetooth,
    toggleAirdrop,
    toggleFullScreen,
  }
})
