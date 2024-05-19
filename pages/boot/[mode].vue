<script setup lang="ts">
useHead({
  title: 'Boot',
})

const route = useRoute()
const isRestart = computed(() => route.params.mode === 'restart')
const isSleep = computed(() => route.params.mode === 'sleep')

const loadingInterval = 1
const bootingInterval = 500

const loading = ref(false)
const percent = ref(0)

watchEffect(() => {
  if (isRestart.value && !isSleep.value)
    loading.value = true
})

const { pause, resume } = useIntervalFn(() => {
  const newPercent = percent.value + 0.15
  if (newPercent >= 100) {
    setTimeout(() => {
      loading.value = false
      navigateTo('/login')
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

function onClick() {
  if (isSleep.value)
    navigateTo('/login')
  else if (!isRestart.value && !loading.value)
    loading.value = true
}
</script>

<template>
  <div class="h-full w-full flex-center flex-col bg-black" @click="onClick">
    <Icon name="i-fa-apple" class=" h-20 w-20 text-white -mt-4 sm:h-24 sm:w-24" />
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
      v-else-if="!isRestart && !loading"
      class="absolute left-0 right-0 top-1/2"
      m="t-16 sm:t-20 x-auto"
      text="sm gray-200 center"
    >
      Click to {{ isSleep ? "wake up" : "boot" }}
    </div>
  </div>
</template>
