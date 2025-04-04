<script setup lang="ts">
import type { MotionValue } from 'motion-v'

interface Props {
  id: string
  title: string
  img: string
  mouseX: MotionValue
  desktop: boolean
  openApp: (id: string) => void
  isOpen: boolean
  link?: string
  dockSize: number
  dockMag: number
}

const props = defineProps<Props>()

const imgRef = ref<HTMLImageElement | null>(null)
const { width } = useDockHoverAnimation(props.mouseX, imgRef, props.dockSize, props.dockMag)
const { width: winWidth } = useWindowSize()
</script>

<template>
  <li
    :id="`dock-${id}`"
    class="flex-center-v flex-col justify-end mb-1 transition duration-150 ease-in origin-bottom"
    @click="desktop || id === 'launchpad' ? () => openApp(id) : () => {}"
  >
    <p
      class="tooltip absolute px-3 py-1 rounded-md text-sm"
      bg="gray-300 opacity-80 dark:(gray-600 opacity-80)"
    >
      {{ title }}
    </p>
    <template v-if="link">
      <a :href="link" target="_blank" rel="noreferrer">
        <Motion
          ref="imgRef"
          as="img"
          class="w-12"
          :src="img"
          :alt="title"
          :title="title"
          :drag="false"
          :style="winWidth < 640 ? {} : { width, willChange: 'width' }"
        />
      </a>
    </template>
    <template v-else>
      <Motion
        ref="imgRef"
        as="img"
        class="w-12"
        :src="img"
        :alt="title"
        :title="title"
        :drag="false"
        :style="winWidth < 640 ? {} : { width, willChange: 'width' }"
      />
    </template>
    <div
      class="`h-1 w-1 m-0 rounded-full bg-gray-800 dark:bg-gray-100 "
      :class="isOpen ? '' : 'invisible'"
    />
  </li>
</template>
