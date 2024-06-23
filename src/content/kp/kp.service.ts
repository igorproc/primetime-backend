// Node Deps
import { Injectable } from '@nestjs/common'
// Routes
import { KinopoiskUnnoficialRoutes } from '@/content/kp/kp.routes'
// Utils
import { createRequestInstance, type TCreateRequestInstance } from '@/content/utils/axios'
import { useSlugBuilder, type TGetSlug } from '@/content/utils/slug'
// Types & Interfaces
import type { IBalancerService } from '@/content/content.types'

@Injectable()
export class KpService implements IBalancerService {
  private readonly axiosInstance: TCreateRequestInstance
  private readonly slugBuilder: TGetSlug<keyof typeof KinopoiskUnnoficialRoutes>

  constructor() {
    this.axiosInstance = createRequestInstance({
      apiUrl: 'https://kinopoiskapiunofficial.tech/api',
      secure: { header: 'X-API-KEY' },
    })
    this.slugBuilder = useSlugBuilder(KinopoiskUnnoficialRoutes)
  }

  public async getMovie(token: string, kinopoiskId: number) {
    return await this.axiosInstance<unknown>(
      'GET',
      this.slugBuilder.get('movie', [kinopoiskId]),
      token,
    )
  }
}
