import { now, unix } from 'moment'

export const getCurrentTime = () => {
  const dateInUnix = unix(now()).toDate().getTime()
  return Number(String(dateInUnix).slice(0, 10))
}
