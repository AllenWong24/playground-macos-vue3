<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import MenuItem from './base/MenuItem.vue'
import MenuItemGroup from './base/MenuItemGroup.vue'

interface Props {
  toggleAppleMenu: () => void
}

interface Emit {
  (e: 'logout'): void
  (e: 'shut'): void
  (e: 'restart'): void
  (e: 'sleep'): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const target = ref(null)
onClickOutside(target.value, props.toggleAppleMenu)
</script>

<template>
  <div
    ref="target"
    class="left-4 top-6 w-56 menu-box"
    border="b l r rounded-b-lg"
  >
    <MenuItemGroup>
      <MenuItem>About This Mac</MenuItem>
    </MenuItemGroup>
    <MenuItemGroup>
      <MenuItem>System Preferences...</MenuItem>
      <MenuItem>App Store...</MenuItem>
    </MenuItemGroup>
    <MenuItemGroup>
      <MenuItem>Recent Items</MenuItem>
    </MenuItemGroup>
    <MenuItemGroup>
      <MenuItem>Force Quit...</MenuItem>
    </MenuItemGroup>
    <MenuItemGroup>
      <MenuItem @click="emit('sleep')">
        Sleep
      </MenuItem>
      <MenuItem @click="emit('restart')">
        Restart...
      </MenuItem>
      <MenuItem @click="emit('shut')">
        Shut Down...
      </MenuItem>
    </MenuItemGroup>
    <MenuItemGroup :border="false">
      <MenuItem @click="emit('logout')">
        Lock Screen
      </MenuItem>
      <MenuItem @click="emit('logout')">
        Log Out Xiaohan Zou...
      </MenuItem>
    </MenuItemGroup>
  </div>
</template>
