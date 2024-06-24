// Node Deps
import { Injectable } from '@nestjs/common'
// Routes
import { KinopoiskUnnoficialRoutes } from '@/content/balancers/kp/kp.routes'
// Utils
import { createRequestInstance, type TCreateRequestInstance } from '@/content/utils/axios'
import { useSlugBuilder, type TGetSlug } from '@/content/utils/slug'
// Types & Interfaces
import { EMovieTypes, IBalancerService, IGetMovie } from '@/content/balancers/balancer.types'
import { EBalancerMovieType, type TBalancerMovie } from '@/content/balancers/kp/kp.types'

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

  private formatType(type: TBalancerMovie['type']) {
    const conditionMap: Record<EMovieTypes, EBalancerMovieType[]> = {
      [EMovieTypes.movie]: [EBalancerMovieType.movie],
      [EMovieTypes.series]: [
        EBalancerMovieType.video,
        EBalancerMovieType.series,
        EBalancerMovieType.mini_series
      ],
      [EMovieTypes.show]: [EBalancerMovieType.show],
    }

    for (const [key, value] of Object.entries(conditionMap)) {
      if (value.includes(type)) {
        return key as EMovieTypes
      }
    }
    return null
  }

  public async getMovie(token: string, kinopoiskId: number): Promise<IGetMovie> {
    const data = await this.axiosInstance<TBalancerMovie>(
      'GET',
      this.slugBuilder.get('movie', [kinopoiskId]),
      token,
    )

    return {
      kinopoiskId: data?.kinopoiskId,
      imdbId: data?.imdbId,
      type: this.formatType(data?.type),
      names: [
        { name: data.nameRu, language: 'RU' },
        { name: data.nameEn, language: 'EN' },
      ],
      description: {
        short: data?.shortDescription,
        default: data?.description,
      },
      poster: {
        preview: data?.posterUrlPreview,
        display: data?.posterUrl,
      },
      rating: {
        age: Number(data?.ratingAgeLimits.replace('age', '')) || 0,
        mpaa: data?.ratingMpaa,
      },
      countries: data?.countries
        .filter(item => item.country)
        .map(item => item.country),
      genres: data?.genres
        .filter(item => item.genre)
        .map(item => item.genre)
    }
  }
}
