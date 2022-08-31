<script setup lang="ts">
import { ref } from "vue";
import Boot from "./pages/Boot.vue";
import Desktop from "./pages/Desktop.vue";
import Login from "./pages/Login.vue";

const login = ref(false);
const booting = ref(false);
const restart = ref(false);
const sleep = ref(false);

const shutMac = (): void => {
  restart.value = false;
  sleep.value = false;
  login.value = false;
  booting.value = true;
};

const restartMac = (): void => {
  restart.value = true;
  sleep.value = false;
  login.value = false;
  booting.value = true;
};

const sleepMac = (): void => {
  restart.value = false;
  sleep.value = true;
  login.value = false;
  booting.value = true;
};
</script>

<template>
  <div>
    <Boot
      v-if="booting"
      :restart="restart"
      :sleep="sleep"
      @changeBooting="
        (val: boolean) => {
          booting = val;
        }
      "
    />
    <Desktop
      v-else-if="login"
      @changeLogin="
        (val: boolean) => {
          login = val;
        }
      "
      @shutMac="shutMac"
      @sleepMac="sleepMac"
      @restartMac="restartMac"
    />
    <Login
      v-else
      @changeLogin="
        (val: boolean) => {
          login = val;
        }
      "
      @shutMac="shutMac"
      @sleepMac="sleepMac"
      @restartMac="restartMac"
    />
  </div>
</template>
