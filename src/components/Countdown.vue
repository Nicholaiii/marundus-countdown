<template lang="pug">
.countdown(v-if="!isGameOn")
  h2 Next marundus game is
  h2 {{ timeToNextGame }}
.currently-playing(v-else)
  h2 You are currently playing!
</template>

<script>
import { defineComponent } from 'vue'
import { useCountdown } from '../composables/countdown'

export default defineComponent({
  name: 'Countdown',
  setup () {
    return useCountdown()
  }
})
</script>

<style>

</style>
