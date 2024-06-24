// Node Deps
import { Injectable } from '@nestjs/common'
// Routes
import { KiniopoiskTgRoutes } from '@/content/balancers/kp-pay/kp-pay.routes'
// Utils
import { createRequestInstance, type TCreateRequestInstance } from '@/content/utils/axios'
import { useSlugBuilder, type TGetSlug } from '@/content/utils/slug'
// Types & Interfaces
import {
  EMovieTypes,
  type IBalancerService,
  type IGetMovie
} from '@/content/balancers/balancer.types'
import { EBalancerMovieType, TBalancerMovie } from '@/content/balancers/kp-pay/kp-pay.types'

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

  private formatType(type: TBalancerMovie['type']) {
    const conditionMap: Record<EMovieTypes, EBalancerMovieType[]> = {
      [EMovieTypes.movie]: [EBalancerMovieType.movie, EBalancerMovieType.cartoon, EBalancerMovieType.anime],
      [EMovieTypes.series]: [EBalancerMovieType.series, EBalancerMovieType.animatedSeries],
      [EMovieTypes.show]: [EBalancerMovieType.show],
    }

    for (const [key, value] of Object.entries(conditionMap)) {
      if (value.includes(type)) {
        return key as EMovieTypes
      }
    }
    return null
  }

  private formatMovieNames(names: TBalancerMovie['names']) {
    return names.map(item => {
      if (item.language) {
        return {
          name: item.name,
          language: item.language.toUpperCase()
        }
      }

      return { name: item.name, language: 'EN' }
    })
  }

  public async getMovie(token: string, kinopoiskId: number): Promise<IGetMovie> {
    const data = await this.axiosInstance<TBalancerMovie>(
      'GET',
      this.slugBuilder.get('movie', [kinopoiskId]),
      token
    )

    const formatData: IGetMovie = {
      kinopoiskId: data?.id,
      type: this.formatType(data?.type),
      names: this.formatMovieNames(data?.names),
      description: {
        short: data?.shortDescription,
        default: data?.description,
      },
      rates: {
        kinopoisk: data?.rating?.kp,
        imdb: data?.rating?.kp,
      },
      poster: {
        preview: data?.poster?.previewUrl,
        display: data?.poster?.url,
      },
      rating: {
        age: data?.ageRating,
        mpaa: data?.ratingMpaa,
      },
      countries: data?.countries
        .filter(item => item?.name)
        .map(item => item.name),
      genres: data?.genres
        .filter(item => item?.name)
        .map(item => item.name),
    }

    if (data.externalId?.imdb) {
      formatData.imdbId = data.externalId.imdb
    }

    return formatData
  }
}
