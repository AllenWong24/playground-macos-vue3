<script setup lang="ts">
const { level, charging } = useBattery()

const width = computed(() => 0.1 + level.value * 0.96)

const color = computed(() => {
  if (charging.value)
    return 'bg-green-400'
  if (level.value < 0.2)
    return 'bg-red-500'
  else if (level.value < 0.5)
    return 'bg-yellow-500'
  else return 'bg-white'
})
</script>

<template>
  <div class="flex-center">
    <span class="text-xs mr-2">
      {{ (level * 100).toFixed() }}%
    </span>
    <div class="relative border-2 border-white h-3 w-5 rounded-1">
      <div
        class="h-full w-full"
        :class="`${color}`"
        :style="{ width: `${width}rem` }"
      />
      <Icon v-if="charging" name="i-bi-lightning-charge-fill" size="12" class="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2" />
      <div class="w-0.75 h-1 bg-white absolute top-1/2 -translate-y-1/2 -right-1 rounded" />
    </div>
  </div>
</template>
