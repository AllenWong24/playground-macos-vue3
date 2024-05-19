<script setup lang="ts">
useHead({
  title: 'Desktop',
})

interface DesktopState {
  showApps: {
    [key: string]: boolean
  }
  appsZ: {
    [key: string]: number
  }
  maxApps: {
    [key: string]: boolean
  }
  minApps: {
    [key: string]: boolean
  }
  maxZ: number
  showLaunchpad: boolean
  currentTitle: string
  hideDockAndTopbar: boolean
  spotlight: boolean
}

const minMarginY = 24

const state = reactive<DesktopState>({
  showApps: {},
  appsZ: {},
  maxApps: {},
  minApps: {},
  maxZ: 2,
  showLaunchpad: false,
  currentTitle: 'Finder',
  hideDockAndTopbar: false,
  spotlight: false,
})

const spotlightBtnRef = ref<HTMLDivElement | null>(null)

const { dark, brightness } = storeToRefs(useSystemStore())

function getAppsData(): void {
  let showApps = {}
  let appsZ = {}
  let maxApps = {}
  let minApps = {}

  GLOBAL_CONFIG_APPS.forEach((app) => {
    showApps = {
      ...showApps,
      [app.id]: app.show,
    }
    appsZ = {
      ...appsZ,
      [app.id]: 2,
    }
    maxApps = {
      ...maxApps,
      [app.id]: false,
    }
    minApps = {
      ...minApps,
      [app.id]: false,
    }
  })

  state.showApps = showApps
  state.appsZ = appsZ
  state.maxApps = maxApps
  state.minApps = minApps
}

watchEffect(() => {
  getAppsData()
})

function toggleLaunchpad(target: boolean): void {
  const r = document.querySelector(`#launchpad`) as HTMLElement
  if (target) {
    r.style.transform = 'scale(1)'
    r.style.transition = 'ease-in 0.2s'
  }
  else {
    r.style.transform = 'scale(1.1)'
    r.style.transition = 'ease-out 0.2s'
  }

  state.showLaunchpad = target
}

function toggleSpotlight(): void {
  state.spotlight = !state.spotlight
}

function setWindowsPosition(id: string): void {
  const r = document.querySelector(`#window-${id}`) as HTMLElement
  const rect = r.getBoundingClientRect()
  r.style.setProperty(
    '--window-transform-x',
    // "+ window.innerWidth" because of the boundary for windows
    `${(window.innerWidth + rect.x).toFixed(1).toString()}px`,
  )
  r.style.setProperty(
    '--window-transform-y',
    // "- minMarginY" because of the boundary for windows
    `${(rect.y - minMarginY).toFixed(1).toString()}px`,
  )
}

function setAppMax(id: string, target?: boolean): void {
  const maxApps = state.maxApps
  if (target === undefined)
    target = !maxApps[id]

  maxApps[id] = target
  state.maxApps = maxApps
  state.hideDockAndTopbar = target
}

function setAppMin(id: string, target?: boolean): void {
  const minApps = state.minApps
  if (target === undefined)
    target = !minApps[id]

  minApps[id] = target
  state.minApps = minApps
}

function minimizeApp(id: string): void {
  setWindowsPosition(id)

  // get the corrosponding dock icon's position
  let r = document.querySelector(`#dock-${id}`) as HTMLElement
  const dockAppRect = r.getBoundingClientRect()

  r = document.querySelector(`#window-${id}`) as HTMLElement
  // const appRect = r.getBoundingClientRect();
  const posY = window.innerHeight - r.offsetHeight / 2 - minMarginY
  // "+ window.innerWidth" because of the boundary for windows
  const posX = window.innerWidth + dockAppRect.x - r.offsetWidth / 2 + 25

  // translate the window to that position
  r.style.transform = `translate(${posX}px, ${posY}px) scale(0.2)`
  r.style.transition = 'ease-out 0.3s'

  // add it to the minimized app list
  setAppMin(id, true)
}

function closeApp(id: string): void {
  setAppMax(id, false)
  const showApps = state.showApps
  showApps[id] = false
  state.showApps = showApps
  state.hideDockAndTopbar = false
}

function openApp(id: string): void {
  // add it to the shown app list
  const showApps = state.showApps
  showApps[id] = true

  // move to the top (use a maximum z-index)
  const appsZ = state.appsZ
  const maxZ = state.maxZ + 1
  appsZ[id] = maxZ

  // get the title of the currently opened app
  const currentApp = GLOBAL_CONFIG_APPS.find((app) => {
    return app.id === id
  })
  if (currentApp === undefined)
    throw new TypeError(`App ${id} is undefined.`)

  state.showApps = showApps
  state.appsZ = appsZ
  state.maxZ = maxZ
  state.currentTitle = currentApp.title

  const minApps = state.minApps
  // if the app has already been shown but minimized
  if (minApps[id]) {
    // move to window's last position
    const r = document.querySelector(`#window-${id}`) as HTMLElement
    r.style.transform = `translate(${r.style.getPropertyValue(
      '--window-transform-x',
    )}, ${r.style.getPropertyValue('--window-transform-y')}) scale(1)`
    r.style.transition = 'ease-in 0.3s'
    // remove it from the minimized app list
    minApps[id] = false
    state.minApps = minApps
  }
}
</script>

<template>
  <div
    class="h-full w-full overflow-hidden bg-cover bg-center"
    :style="{
      backgroundImage: `url(${dark ? GLOBAL_CONFIG_WALLPAPERS.night : GLOBAL_CONFIG_WALLPAPERS.day})`,
      filter: `brightness( ${brightness * 0.7 + 50}% )`,
    }"
  >
    <!-- Top Menu Bar -->
    <TopBar
      :title="state.currentTitle"
      :hide="state.hideDockAndTopbar"
      @toggle-spotlight="toggleSpotlight"
    />

    <!-- Desktop Apps -->
    <div class="window-bound absolute z-10" :style="{ top: minMarginY }">
      <template v-for="app in GLOBAL_CONFIG_APPS" :key="`desktop-app-${app.id}`">
        <Window
          v-if="app.desktop && state.showApps[app.id]"
          :id="app.id"
          :title="app.title"
          :width="app.width"
          :height="app.height"
          :min-width="app.minWidth"
          :min-height="app.minHeight"
          :z="state.appsZ[app.id]"
          :max="state.maxApps[app.id]"
          :min="state.minApps[app.id]"
          @close="closeApp"
          @set-max="setAppMax"
          @set-min="minimizeApp"
          @focus="openApp"
        >
          {{ app.content }}
        </Window>
        <div v-else />
      </template>
    </div>

    <!-- Spotlight -->
    <Spotlight
      v-if="state.spotlight"
      :btn-ref="spotlightBtnRef"
      @open-app="openApp"
      @toggle-launchpad="toggleLaunchpad"
      @toggle-spotlight="toggleSpotlight"
    />

    <!-- Launchpad -->
    <Launchpad :show="state.showLaunchpad" @toggle-launchpad="toggleLaunchpad" />

    <!-- Dock -->
    <Dock
      :show-apps="state.showApps"
      :show-launchpad="state.showLaunchpad"
      :hide="state.hideDockAndTopbar"
      @open="openApp"
      @toggle-launchpad="toggleLaunchpad"
    />
  </div>
</template>
