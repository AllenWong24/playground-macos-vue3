<script setup lang="ts">
interface Props {
  show: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggleLaunchpad', value: boolean): void
}>()

const { dark } = storeToRefs(useSystemStore())

const placeholderText = 'Search'

const searchText = ref('')

const searchedApps = computed(() => {
  if (searchText.value === '')
    return GLOBAL_CONFIG_LAUNCHPAD_APPS
  const text = searchText.value.toLowerCase()
  const list = GLOBAL_CONFIG_LAUNCHPAD_APPS.filter((item) => {
    return (
      item.title.toLowerCase().includes(text)
      || item.id.toLowerCase().includes(text)
    )
  })
  return list
})

const close = computed(() => props.show
  ? ''
  : 'opacity-0 invisible transition-opacity duration-200')
</script>

<template>
  <div
    id="launchpad"
    :class="`${close} z-30 transform scale-110 w-full h-full fixed overflow-hidden bg-center bg-cover`"
    :style="{
      backgroundImage: `url(${dark ? GLOBAL_CONFIG_WALLPAPERS.night : GLOBAL_CONFIG_WALLPAPERS.day})`,
    }"
    @click="emit('toggleLaunchpad', false)"
  >
    <div class="w-full h-full absolute bg-gray-900 bg-opacity-20 backdrop-blur-2xl">
      <div
        class="mx-auto grid grid-cols-11 h-7 w-64 mt-5"
        bg="gray-200 opacity-10"
        border="1 rounded-md gray-200 opacity-30"
        @click.stop
      >
        <div class="col-start-1 col-span-1 flex-center">
          <Icon class="ml-1" color="white" name="i-bi-search" />
        </div>
        <input
          v-model="searchText"
          class="col-start-2 col-span-10 no-outline bg-transparent px-1 text-sm text-white"
          :placeholder="placeholderText"
        >
      </div>

      <div
        class="max-w-launchpad mx-auto mt-8 w-full px-4 sm:px-10 grid flow-row cols-4 sm:cols-7"
      >
        <div
          v-for="app in searchedApps"
          :key="`launchpad-${app.id}`"
          class="h-32 sm:h-36 w-full flex-center"
        >
          <div class="h-full w-full flex flex-col">
            <a
              class="h-max"
              :href="app.link"
              target="_blank"
              rel="noreferrer"
              @click.stop
            >
              <img
                class="w-14 sm:w-20 mx-auto"
                :src="app.img"
                :alt="app.title"
                :title="app.title"
              >
            </a>
            <span class="mt-2 mx-auto text-white text-xs sm:text-sm">
              {{ app.title }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
