<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";
import { useIntervalFn } from "@vueuse/core";

interface Props {
  restart: boolean;
  sleep: boolean;
}

interface Emit {
  (e: "setBooting", val: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  restart: false,
  sleep: false,
});

const emit = defineEmits<Emit>();

const loadingInterval = 1;
const bootingInterval = 500;

const loading = ref(false);
const percent = ref(0);

watchEffect(() => {
  if (props.restart && !props.sleep) {
    loading.value = true;
  }
});

const { pause, resume } = useIntervalFn(() => {
  const newPercent = percent.value + 0.15;
  if (newPercent >= 100) {
    setTimeout(() => {
      emit("setBooting", false);
      loading.value = false;
    }, bootingInterval);
  } else {
    percent.value = newPercent;
  }
}, loadingInterval);

watch(
  loading,
  (loading) => {
    loading ? resume() : pause();
  },
  { immediate: true }
);

const handleClick = () => {
  if (props.sleep) {
    emit("setBooting", false);
  } else if (props.restart || loading.value) {
    return;
  } else {
    loading.value = true;
  }
};
</script>

<template>
  <div class="w-full h-full bg-black flex-center flex-col" @click="handleClick">
    <div class="text-white -mt-4 w-20 h-20 sm:w-24 sm:h-24 i-fa-apple" />
    <div
      v-if="loading"
      class="absolute top-1/2 left-0 right-0 w-56 h-1 sm:h-1.5 bg-gray-500 rounded overflow-hidden"
      m="t-16 sm:t-24 x-auto"
    >
      <span
        class="absolute top-0 bg-white h-full rounded-sm"
        :style="{
          width: `${percent.toString()}%`,
        }"
      />
    </div>
    <div
      v-else-if="!restart && !loading"
      class="absolute top-1/2 left-0 right-0"
      m="t-16 sm:t-20 x-auto"
      text="sm gray-200 center"
    >
      Click to {{ sleep ? "wake up" : "boot" }}
    </div>
  </div>
</template>
