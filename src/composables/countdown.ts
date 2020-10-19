import { ref } from 'vue'
import {
  getDay,
  setDay,
  add,
  set,
  intervalToDuration,
  isWithinInterval,
  formatDuration
} from 'date-fns/fp'

const now = () => new Date()
const setGameHours = set({ hours: 18, minutes: 0, seconds: 0, milliseconds: 0 })
const addGameTime = add({ hours: 5 })
const nextWeek = add({ weeks: 1 })
const setTuesday = setDay(2)
const isPastTuesday = () => getDay(now()) > 2

const getNextGameDate = () => {
  const thisTuesday = setTuesday(now())
  const nextGameDay = isPastTuesday() ? nextWeek(thisTuesday) : thisTuesday

  return setGameHours(nextGameDay)
}

const getIsGameOn = (nextGameDay: Date) => isWithinInterval({
  start: nextGameDay,
  end: addGameTime(nextGameDay)
}, now())

const formatTimeToNextGame = (nextGameDay: Date): string => {
  const interval: Interval = {
    start: now(),
    end: nextGameDay
  }
  const duration = intervalToDuration(interval)

  return formatDuration(duration)
}

export const useCountdown = () => {
  const nextGameDay = getNextGameDate()

  const isGameOn = ref(getIsGameOn(nextGameDay))
  const timeToNextGame = ref(formatTimeToNextGame(nextGameDay))

  setInterval(() => {
    isGameOn.value = getIsGameOn(nextGameDay)
    timeToNextGame.value = formatTimeToNextGame(nextGameDay)
  }, 1000)

  return { timeToNextGame, isGameOn }
}
