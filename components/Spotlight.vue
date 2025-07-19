<script setup lang="tsx">
import dayjs from 'dayjs'
import type { JSX } from 'vue/jsx-runtime'

interface Emit {
  (e: 'toggleSpotlight'): void
  (e: 'openApp', id: string): void
  (e: 'toggleLaunchpad', target: boolean): void
}

const emit = defineEmits<Emit>()

const allApps = {
  app: GLOBAL_CONFIG_APPS,
  portfolio: GLOBAL_CONFIG_LAUNCHPAD_APPS,
}

function getRandom(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomDate(): string {
  const timeStamp = new Date().getTime()
  const randomStamp = getRandom(0, timeStamp)
  const date = dayjs(randomStamp).format('MM/DD/YYYY')
  return date
}

const spotlightRef = ref<HTMLDivElement | null>(null)

const selectedIndex = ref<number>(0)
const clickedID = ref('')
const doubleClicked = ref<boolean>(false)

const searchText = ref('')
const curDetails = ref<any>(null)

const appIdList = ref<string[]>([])
const appList = ref<JSX.Element | null>(null)

const textWhite = 'text-white dark:text-black'
const textBlack = 'text-black dark:text-white'
const textSelected = 'bg-blue-500 dark:bg-blue-400'

onClickOutside(spotlightRef, () => emit('toggleSpotlight'))

watch(searchText, () => {
  updateAppList()
})

watch(selectedIndex, () => {
  updateCurrentDetails()
})

watch(clickedID, () => {
  if (appIdList.value.length === 0)
    return
  // find app's index given its id
  const newSelectedIndex = appIdList.value.findIndex((item) => {
    return item === clickedID.value
  })
  // update index
  updateHighlight(selectedIndex.value, newSelectedIndex)
  selectedIndex.value = newSelectedIndex
})

const { ignoreUpdates } = watchIgnorable(doubleClicked, (val) => {
  if (val) {
    launchSelectedApp()
    ignoreUpdates(() => {
      doubleClicked.value = false
    })
  }
})

function search(type: string) {
  if (searchText.value === '')
    return []
  const text = searchText.value.toLowerCase()
  const list = allApps[type as keyof typeof allApps].filter((item: LaunchpadData | AppsData) => {
    return (
      item.title.toLowerCase().includes(text)
      || item.id.toLowerCase().includes(text)
    )
  })
  return list
}

function setCurrentDetailsWithType(app: any, type: string): void {
  const details = app
  details.type = type
  curDetails.value = details
}

function updateCurrentDetails(): void {
  if (appIdList.value.length === 0 || searchText.value === '') {
    curDetails.value = null
    return
  }
  const appId = appIdList.value[selectedIndex.value]
  const elem = document.querySelector(`#spotlight-${appId}`) as HTMLElement
  const id = appId
  const type = elem.dataset.appType as string
  const app = allApps[type as keyof typeof allApps].find((item: LaunchpadData | AppsData) => {
    return item.id === id
  })
  setCurrentDetailsWithType(app, type)
}

function onClick(id: string): void {
  clickedID.value = id
}

function onDoubleClick(id: string): void {
  clickedID.value = id
  doubleClicked.value = true
}

function launchSelectedApp(): void {
  if (curDetails.value.type === 'app' && !curDetails.value.link) {
    const id = curDetails.value.id
    if (id === 'launchpad')
      emit('toggleLaunchpad', true)
    else
      emit('openApp', id)

    emit('toggleSpotlight')
  }
  else {
    window.open(curDetails.value.link)
    emit('toggleSpotlight')
  }
}

function getTypeAppList(type: string, startIndex: number) {
  const result = search(type)
  const typeAppList = []
  const typeAppIdList = []

  for (const app of result) {
    const curIndex = startIndex + typeAppList.length
    const bg = curIndex === 0 ? textSelected : 'bg-transparent'
    const text = curIndex === 0 ? textWhite : textBlack

    if (curIndex === 0)
      setCurrentDetailsWithType(app, type)

    typeAppList.push(
      <li
        id={`spotlight-${app.id}`}
        key={`spotlight-${app.id}`}
        class={`pl-4 h-7 w-full pr-1 flex flex-row ${bg} ${text} cursor-default`}
        data-app-type={type}
        onClick={() => onClick(app.id)}
        onDblclick={() => onDoubleClick(app.id)}
      >
        <div class="w-8 flex-center-v flex-none">
          <img
            class="mx-auto w-5"
            src={app.img}
            alt={app.title}
            title={app.title}
          />
        </div>
        <div class="flex-center-v flex-grow overflow-hidden whitespace-nowrap pl-3">
          {app.title}
        </div>
      </li>,
    )
    typeAppIdList.push(app.id)
  }

  return {
    appList: typeAppList,
    appIdList: typeAppIdList,
  }
}

function updateAppList() {
  const app = getTypeAppList('app', 0)
  const portfolio = getTypeAppList('portfolio', app.appIdList.length)

  const newAppIdList = [...app.appIdList, ...portfolio.appIdList]
  // don't show app details when there is no associating app
  if (newAppIdList.length === 0)
    curDetails.value = null

  const newAppList = (
    <div>
      {app.appList.length !== 0 && (
        <div>
          <div class="spotlight-type">Applications</div>
          <ul class="w-full text-xs">{app.appList}</ul>
        </div>
      )}
      {portfolio.appList.length !== 0 && (
        <div>
          <div class="spotlight-type">Portfolio</div>
          <ul class="w-full text-xs">{portfolio.appList}</ul>
        </div>
      )}
    </div>
  )

  appIdList.value = newAppIdList
  appList.value = newAppList
}

function updateHighlight(prevIndex: number, curIndex: number): void {
  if (appIdList.value.length === 0)
    return

  // remove highlight
  const prevAppId = appIdList.value[prevIndex]
  const prev = document.querySelector(
      `#spotlight-${prevAppId}`,
  ) as HTMLElement
  let classes = prev.className
  classes = classes.replace(textWhite, textBlack)
  classes = classes.replace(textSelected, 'bg-transparent')
  prev.className = classes

  // add highlight
  const curAppId = appIdList.value[curIndex]
  const cur = document.querySelector(`#spotlight-${curAppId}`) as HTMLElement
  classes = cur.className
  classes = classes.replace(textBlack, textWhite)
  classes = classes.replace('bg-transparent', textSelected)
  cur.className = classes
}

function onKeyPress(e: KeyboardEvent) {
  const keyCode = e.key
  const numApps = appIdList.value.length

  // ----------- select next app -----------
  if (keyCode === 'ArrowDown' && selectedIndex.value < numApps - 1) {
    updateHighlight(selectedIndex.value, selectedIndex.value + 1)
    selectedIndex.value = selectedIndex.value + 1
  }
  // ----------- select previous app -----------
  else if (keyCode === 'ArrowUp' && selectedIndex.value > 0) {
    updateHighlight(selectedIndex.value, selectedIndex.value - 1)
    selectedIndex.value = selectedIndex.value - 1
  }
  // ----------- launch app -----------
  else if (keyCode === 'Enter') {
    if (!curDetails.value)
      return
    launchSelectedApp()
  }
}

function onInputChange(e: Event) {
  // update highlighted line
  updateHighlight(selectedIndex.value, 0)
  // current selected id go back to 0
  selectedIndex.value = 0
  // update search text and associating app list
  searchText.value = (e.target as HTMLInputElement).value
}

function focusOnInput() {
  const input = document.querySelector('#spotlight-input') as HTMLElement
  input.focus()
}
</script>

<template>
  <div
    ref="spotlightRef"
    class="spotlight"
    @keydown="onKeyPress"
    @click="focusOnInput"
  >
    <div class="w-full grid grid-cols-8 sm:grid-cols-11 h-12 sm:h-14 rounded-md bg-transparent">
      <div class="col-start-1 col-span-1 flex-center">
        <Icon
          name="i-bi-search"
          class="ml-1 text-gray-600 dark:text-gray-300"
          size="28"
        />
      </div>
      <input
        id="spotlight-input"
        class="col-start-2 col-span-7 sm:col-span-10 bg-transparent no-outline px-1"
        text="xl sm:2xl black dark:white"
        placeholder="Spotlight Search"
        :value="searchText"
        autofocus
        @input="onInputChange"
      >
    </div>
    <div v-if="searchText" class="h-spotlight bg-transparent flex flex-row border-t menu-box-border">
      <div class="flex-none w-32 sm:w-72 border-r menu-box-border overflow-y-scroll">
        <component :is="appList" v-if="appList" />
      </div>
      <div class="flex-grow">
        <div v-if="curDetails" class="h-full w-full flex flex-col">
          <div
            class="mx-auto w-4/5 h-56 border-b menu-box-border"
            flex="none center col"
          >
            <img
              class="w-32 mx-auto"
              :src="curDetails.img"
              :alt="curDetails.title"
              :title="curDetails.title"
            >
            <div class="mt-4 text-xl text-black dark:text-white">
              {{ curDetails.title }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ `Version: ${getRandom(0, 99)}.${getRandom(0, 999)}` }}
            </div>
          </div>
          <div class="flex-grow flex text-xs">
            <div
              class="w-1/2 items-end"
              flex="none center-h col"
              text="gray-500 dark:gray-400"
            >
              <div>Kind</div>
              <div>Size</div>
              <div>Created</div>
              <div>Modified</div>
              <div>Last opened</div>
            </div>
            <div
              class="pl-2 text-black dark:text-white"
              flex="grow center-h col"
            >
              <div>
                {{ curDetails.type === "app" ? "Application" : "Portfolio" }}
              </div>
              <div>{{ `${getRandom(0, 999)} G` }}</div>
              <div>{{ getRandomDate() }}</div>
              <div>{{ getRandomDate() }}</div>
              <div>{{ getRandomDate() }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
