<template>
  <Countdown/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Countdown from './components/Countdown.vue'

export default defineComponent({
  name: 'App',
  components: {
    Countdown
  }
})

console.log('test sw')
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color rgb(255, 255, 255, 1)
  margin-top 60px
  text-shadow 1px 1px 5px #000, 1px 1px 5px #000

body
  background linear-gradient(to right, #EC6EAD, #3494E6)

</style>
