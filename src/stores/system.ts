import { defineStore } from "pinia";
import { enterFullScreen, exitFullScreen } from "@/utils";

export const useSystemStore = defineStore({
  id: "system",

  state: () => ({
    dark: false,
    volume: 100,
    brightness: 80,
    wifi: true,
    bluetooth: true,
    airdrop: true,
    fullscreen: false,
  }),

  actions: {
    toggleDark(value: boolean) {
      this.dark = value;
      if (value) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },

    setVolume(value: number) {
      this.volume = value;
    },

    setBrightness(value: number) {
      this.brightness = value;
    },

    toggleWIFI(value: boolean) {
      this.wifi = value;
    },

    toggleBleutooth(value: boolean) {
      this.bluetooth = value;
    },

    toggleAirdrop(value: boolean) {
      this.airdrop = value;
    },

    toggleFullScreen(value: boolean) {
      value ? enterFullScreen() : exitFullScreen();
      this.fullscreen = value;
    },
  },
});
