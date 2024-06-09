import * as moment from 'moment'
import { now, unix } from 'moment'

type TAddTimeVariants = 'days' | 'months' | 'year'

export const getCurrentTimestamp = () => {
  const dateInUnix = unix(now()).toDate().getTime()
  return Number(String(dateInUnix).slice(0, 10))
}

export const getCurrentDate = () => {
  const currentDate = now()
  return new Date(currentDate)
}

export const addTimeToCurrentDate = (count: number, type: TAddTimeVariants) => {
  const currentDate = moment().add(count, type)
  return currentDate.toDate()
}
