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
import { type MovieDtoV14 } from '@/content/balancers/kp-pay/kp-pay.types'

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

  private formatType(type: MovieDtoV14['type']) {
    const conditionMap: Record<EMovieTypes, MovieDtoV14['type'][]> = {
      [EMovieTypes.movie]: ['movie', 'cartoon', 'anime'],
      [EMovieTypes.series]: ['animated-series', 'series'],
      [EMovieTypes.show]: ['tv-show'],
    }

    for (const [key, value] of Object.entries(conditionMap)) {
      if (value.includes(type)) {
        return key as EMovieTypes
      }
    }
    return null
  }

  private formatMovieNames(names: MovieDtoV14['names']) {
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
    const data = await this.axiosInstance<MovieDtoV14>(
      'GET',
      this.slugBuilder.get('movie', [kinopoiskId]),
      token
    )

    const formatData: IGetMovie = {
      kinopoiskId: data?.id,
      type: this.formatType(data?.type),
      names: this.formatMovieNames(data?.names),
      duration: data?.movieLength,
      years: {
        release: data?.year,
      },
      slogan: data?.slogan,
      description: {
        short: data?.shortDescription,
        default: data?.description,
      },
      votes: {
        kp: { rating: data?.rating?.kp, votes: Number(data?.votes?.kp) },
        imdb: { rating: data?.rating?.imdb, votes: data?.votes?.imdb },
        critics: { rating: data?.rating?.filmCritics, votes: data?.votes?.filmCritics },
        ruCritics: { rating: data?.rating?.russianFilmCritics, votes: data?.votes?.russianFilmCritics }
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
        .map(item => item.name.toLowerCase()),
      genres: data?.genres
        .filter(item => item?.name)
        .map(item => item.name.toLowerCase()),
    }

    if ([EMovieTypes.series, EMovieTypes.show].includes(formatData.type) && data?.releaseYears[0]) {
      formatData.years.start = data.releaseYears[0].start
      formatData.years.end = data.releaseYears[0].end
    }

    if (data.externalId?.imdb) {
      formatData.imdbId = data.externalId.imdb
    }

    return formatData
  }
}
