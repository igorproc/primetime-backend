// Node Deps
import { HttpException, HttpStatus } from '@nestjs/common'
// Errors
import { ContentErrors } from '@/content/content.errors'

export type TGetSlug<T> = {
  get: (slug: T, args: unknown[]) => string
}

export function useSlugBuilder(slugs: { movie: (id: number) => string }) {
  const slugList = slugs

  function get(slug: keyof typeof slugs, ...args: any[]) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return slugList[slug](args)
    } catch {
          throw new HttpException(
            ContentErrors.INTERNAL_ERROR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          )
    }
  }

  return {
    get
  }
}
