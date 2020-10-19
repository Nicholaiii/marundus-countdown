<template lang="pug">
.countdown(v-if="!isGameOn")
  h2 Next marundus game is in
  h2 {{ timeToNextGame }}
  img(v-show="isGameClose" src="@/assets/rana_on_drugs.gif").flip.med
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

<style lang="stylus">
.flip
  transform scaleX(-1)
.med
  max-width 60%
</style>
