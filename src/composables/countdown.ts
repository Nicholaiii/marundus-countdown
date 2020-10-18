import { ref } from 'vue'
import day from '../plugins/day'

const makeMarundusTime = (date?: day.Dayjs) => day(date)
  .day(2)
  .hour(18)
  .minute(0)
  .second(0)

const getIsGameOn = (countdownTime: day.Dayjs) => day().isBetween(countdownTime, countdownTime.add(5, 'hour'))
const timeToFromNow = (countdownTime: day.Dayjs) => day().to(countdownTime)

export const useCountdown = () => {
  const thisWeekTime = makeMarundusTime()
  const countdownTime = day().isAfter(thisWeekTime) ? thisWeekTime.add(1, 'week') : thisWeekTime

  const isGameOn = ref(getIsGameOn(countdownTime))
  const timeToNextGame = ref(timeToFromNow(countdownTime))

  setTimeout(() => {
    isGameOn.value = getIsGameOn(countdownTime)
    timeToNextGame.value = timeToFromNow(countdownTime)
  }, 250)

  return { timeToNextGame, isGameOn }
}
