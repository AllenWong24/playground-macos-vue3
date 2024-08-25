<script setup lang="ts">
const { level, charging } = useBattery()

const width = computed(() => 0.1 + level.value * 0.96)

function color(): string {
  if (charging.value)
    return 'bg-green-400'
  if (level.value < 0.2)
    return 'bg-red-500'
  else if (level.value < 0.5)
    return 'bg-yellow-500'
  else return 'bg-white'
}
</script>

<template>
  <div class="flex-center">
    <span class="text-xs mr-2">
      {{ (level * 100).toFixed() }}%
    </span>
    <div class="relative">
      <Icon name="i-material-symbols-battery-very-low" size="24" />
      <div
        :class="`battery-level ${color()}`"
        :style="{ width: `${width}rem` }"
      />
      <Icon v-if="charging" name="i-bi-lightning-charge" size="12" class="absolute top-1/2 -mt-1.5 right-0 mr-1.5" />
    </div>
  </div>
</template>
