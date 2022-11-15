<script setup lang="ts">
import type { Component } from "vue";
import AppleMenu from "./AppleMenu.vue";
import WifiMenu from "./WifiMenu.vue";

interface TopBarItemProps {
  hideOnMobile?: boolean;
  forceHover?: boolean;
  onClick?: () => void;
  children: Component;
}
</script>
