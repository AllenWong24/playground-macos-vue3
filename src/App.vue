<script setup lang="ts">
const login = ref(false)
const booting = ref(false)
const restart = ref(false)
const sleep = ref(false)

function setLogin(val: boolean) {
  login.value = val
}

function setBooting(val: boolean) {
  booting.value = val
}

function shutMac(): void {
  restart.value = false
  sleep.value = false
  login.value = false
  booting.value = true
}

function restartMac(): void {
  restart.value = true
  sleep.value = false
  login.value = false
  booting.value = true
}

function sleepMac(): void {
  restart.value = false
  sleep.value = true
  login.value = false
  booting.value = true
}
</script>

<template>
  <Boot
    v-if="booting"
    :restart="restart"
    :sleep="sleep"
    @set-booting="setBooting"
  />
  <Desktop
    v-else-if="login"
    @set-login="setLogin"
    @shut-mac="shutMac"
    @sleep-mac="sleepMac"
    @restart-mac="restartMac"
  />
  <Login
    v-else
    @set-login="setLogin"
    @shut-mac="shutMac"
    @sleep-mac="sleepMac"
    @restart-mac="restartMac"
  />
</template>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
