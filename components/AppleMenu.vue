<script setup lang="ts">
const props = defineProps<{
  visible: boolean
  btnSelector?: string | string[]
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const { logout } = useAuthStore()

const visible = useVModel(props, 'visible', emit)

const appleMenu = ref<HTMLDivElement>()

onClickOutside(
  appleMenu,
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
    ref="appleMenu"
    class="menu-box top-6 left-4 w-56"
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
      <MenuItem @click="navigateTo('/boot/sleep')">
        Sleep
      </MenuItem>
      <MenuItem @click="navigateTo('/boot/restart')">
        Restart...
      </MenuItem>
      <MenuItem @click="navigateTo('/boot/shutdown')">
        Shut Down...
      </MenuItem>
    </MenuItemGroup>
    <MenuItemGroup :border="false">
      <MenuItem @click="logout">
        Lock Screen
      </MenuItem>
      <MenuItem @click="logout">
        Log Out {{ GLOBAL_CONFIG_USER.name }}...
      </MenuItem>
    </MenuItemGroup>
  </div>
</template>
