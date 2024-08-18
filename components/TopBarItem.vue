<script setup lang="ts">
interface Props {
  hideOnMobile?: boolean
  forceHover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hideOnMobile: false,
  forceHover: false,
})

const emit = defineEmits(['click'])

const hide = computed(() => props.hideOnMobile ? 'hidden sm:inline-flex' : 'inline-flex')

const hover = computed(() => (
  props.forceHover
    ? 'bg-white bg-opacity-30 dark:(bg-black bg-opacity-30)'
    : 'rounded hover:bg-white hover:bg-opacity-30 dark:(hover:bg-black hover:bg-opacity-30)'
))
</script>

<template>
  <div
    :class="`${hide} h-6 cursor-default flex-row space-x-1 ${hover} p-1`"
    @click="emit('click')"
  >
    <slot />
  </div>
</template>
