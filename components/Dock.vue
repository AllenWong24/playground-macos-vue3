<script setup lang="ts">
interface Props {
  open: (id: string) => void
  showApps: {
    [key: string]: boolean
  }
  showLaunchpad: boolean
  toggleLaunchpad: (target: boolean) => void
  hide: boolean
}

const props = defineProps<Props>()

const { size: dockSize, mag: dockMag } = storeToRefs(useDockStore())

function openApp(id: string) {
  if (id === 'launchpad') {
    props.toggleLaunchpad(!props.showLaunchpad)
  }
  else {
    props.toggleLaunchpad(false)
    props.open(id)
  }
}

const mouseX = useMotionValue<number | null>(null)
</script>

<template>
  <div
    class="dock w-full sm:w-max fixed left-0 right-0 mx-auto bottom-0 overflow-x-scroll sm:overflow-x-visible"
    :class="hide ? 'z-0' : 'z-50'"
  >
    <ul
      class="mx-auto w-max px-2 space-x-2 flex backdrop-blur-2xl"
      bg="white opacity-20 dark:(black opacity-20)"
      border="t l r rounded-none sm:rounded-t-lg gray-400 opacity-30 dark:(gray-500 opacity-30)"
      :style="{
        height: `${(dockSize as number) + 15}px`,
      }"
      @mouse-move="(e: MouseEvent) => mouseX.set(e.x)"
    >
      <template v-for="app in GLOBAL_CONFIG_APPS" :key="app.id">
        <DockItem
          :id="app.id"
          :app-key="`dock-${app.id}`"
          :title="app.title"
          :img="app.img"
          :mouse-x="mouseX"
          :desktop="app.desktop"
          :open-app="openApp"
          :is-open="app.desktop && showApps[app.id]"
          :link="app.link"
          :dock-size="dockSize"
          :dock-mag="dockMag"
        />
      </template>
    </ul>
  </div>
</template>
