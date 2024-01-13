<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { useIntervalFn } from '@vueuse/core'

interface Props {
  restart: boolean
  sleep: boolean
}

interface Emit {
  (e: 'setBooting', val: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  restart: false,
  sleep: false,
})

const emit = defineEmits<Emit>()

const loadingInterval = 1
const bootingInterval = 500

const loading = ref(false)
const percent = ref(0)

watchEffect(() => {
  if (props.restart && !props.sleep)
    loading.value = true
})

const { pause, resume } = useIntervalFn(() => {
  const newPercent = percent.value + 0.15
  if (newPercent >= 100) {
    setTimeout(() => {
      emit('setBooting', false)
      loading.value = false
    }, bootingInterval)
  }
  else {
    percent.value = newPercent
  }
}, loadingInterval)

watch(
  loading,
  (loading) => {
    loading ? resume() : pause()
  },
  { immediate: true },
)

function handleClick() {
  if (props.sleep)
    emit('setBooting', false)
  else if (props.restart || loading.value)
    return
  else
    loading.value = true
}
</script>

<template>
  <div class="h-full w-full flex-center flex-col bg-black" @click="handleClick">
    <div class="i-fa-apple h-20 w-20 text-white -mt-4 sm:h-24 sm:w-24" />
    <div
      v-if="loading"
      class="absolute left-0 right-0 top-1/2 h-1 w-56 overflow-hidden rounded bg-gray-500 sm:h-1.5"
      m="t-16 sm:t-24 x-auto"
    >
      <span
        class="absolute top-0 h-full rounded-sm bg-white"
        :style="{
          width: `${percent.toString()}%`,
        }"
      />
    </div>
    <div
      v-else-if="!restart && !loading"
      class="absolute left-0 right-0 top-1/2"
      m="t-16 sm:t-20 x-auto"
      text="sm gray-200 center"
    >
      Click to {{ sleep ? "wake up" : "boot" }}
    </div>
  </div>
</template>
