import { ref } from 'vue'
import {
  getDay,
  setDay,
  add,
  set,
  intervalToDuration,
  isWithinInterval,
  formatDuration,
  subHours
} from 'date-fns/fp'
import { timer } from 'rxjs'

const now = () => new Date()
const setGameHours = set({ hours: 18, minutes: 0, seconds: 0, milliseconds: 0 })
const addGameTime = add({ hours: 5 })
const nextWeek = add({ weeks: 1 })
const anHourBefore = subHours(1)
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

const getIsGameClose = (nextGameDay: Date) => isWithinInterval({
  start: anHourBefore(nextGameDay),
  end: nextGameDay
}, now())

const formatTimeToNextGame = (nextGameDay: Date): string => {
  const interval: Interval = {
    start: now(),
    end: nextGameDay
  }
  const duration = intervalToDuration(interval)

  return formatDuration(duration)
}
const everySecond = timer(0, 1000)
export const useCountdown = () => {
  const timeToNextGame = ref()
  const isGameClose = ref()
  const isGameOn = ref()

  everySecond.subscribe(() => {
    const nextGameDay = getNextGameDate()

    timeToNextGame.value = formatTimeToNextGame(nextGameDay)
    isGameClose.value = getIsGameClose(nextGameDay)
    isGameOn.value = getIsGameOn(nextGameDay)
  })

  return { timeToNextGame, isGameOn, isGameClose }
}
