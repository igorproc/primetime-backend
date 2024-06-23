// Utils
import { getCurrentTimestamp } from '@utils/time'

interface IPageSizeData {
  skip: number,
  take: number,
}

export function generateId(): string {
  return `${getCurrentTimestamp().toString(32)}-${Math.random().toString(32)}`
}

export function getPageDataSize(page = 0, size = 0, defaultSize: number): IPageSizeData {
  if (!page && !size) {
    return {
      skip: 0,
      take: defaultSize
    }
  }

  if (!page || page === 1) {
    return {
      skip: 0,
      take: size
    }
  }

  if (!size) {
    return {
      skip: page * defaultSize,
      take: defaultSize
    }
  }

  return {
    skip: page * size,
    take: size,
  }
}