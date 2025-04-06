// Node Deps
import slugify from 'slugify'
// Utils
import { getCurrentTimestamp } from '@utils/time'
import { translateRuSentence } from '@utils/translate'
// Types
import { IGetMovie } from '@/content/balancers/balancer.types'

interface IPageSizeData {
  skip: number,
  take: number,
}

export function generateId(): string {
  return `${getCurrentTimestamp().toString(32)}-${Math.random().toString(32)}`
}

export function getPageDataSize(page = 0, size = 0, defaultSize = 12): IPageSizeData {
  const [numberPage, numberSize] = [Number(page), Number(size)]
  if (!numberPage || !numberSize) {
    return { skip: 0, take: defaultSize }
  }

  if (!numberPage && !numberSize) {
    return {
      skip: 0,
      take: defaultSize
    }
  }

  if (!numberPage || numberPage === 1) {
    return {
      skip: 0,
      take: numberSize
    }
  }

  if (!numberSize) {
    return {
      skip: numberPage * defaultSize,
      take: defaultSize
    }
  }

  return {
    skip: numberPage * numberSize,
    take: numberSize,
  }
}

export function generateSlug(kinopoiskId: number, names: IGetMovie['names']) {
  let name = names.find(item => item.language === 'EN')?.name
  if (!name) {
    const ruName = names.find(item => item.language === 'RU')?.name

    name = ruName || 'пока ничего нет'
  }
  name = name.toLowerCase()

  const slicedId = kinopoiskId.toString().slice(0, 4)
  const formatedName = slugify(name, { lower: true })

  return `${slicedId}-${formatedName}`
}
