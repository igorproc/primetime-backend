// Node Deps
import { Injectable } from '@nestjs/common'
// Routes
import { KiniopoiskTgRoutes } from '@/content/kp-pay/kp-pay.routes'
// Utils
import { createRequestInstance, type TCreateRequestInstance } from '@/content/utils/axios'
import { useSlugBuilder, type TGetSlug } from '@/content/utils/slug'
import { IBalancerService } from '@/content/content.types'

@Injectable()
export class KpPayService implements IBalancerService {
  private readonly axiosInstance: TCreateRequestInstance
  private readonly slugBuilder: TGetSlug<keyof typeof KiniopoiskTgRoutes>

  constructor() {
    this.axiosInstance = createRequestInstance({
      apiUrl: 'https://api.kinopoisk.dev/',
      secure: { header: 'X-API-KEY' },
    })
    this.slugBuilder = useSlugBuilder(KiniopoiskTgRoutes)
  }

  async getMovie(token: string, kinopoiskId: number) {
    return await this.axiosInstance<{ id: number }>(
      'GET',
      this.slugBuilder.get('movie', [kinopoiskId]),
      token
    )
  }
}
