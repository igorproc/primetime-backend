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
  type IBalancerService, IExpiredToken,
  type IGetMovie
} from '@/content/balancers/balancer.types'
import { type MovieDtoV14 } from '@@/.types/content-balancer/kp-pay'

@Injectable()
export class KpPayService implements IBalancerService {
  private readonly axiosInstance: TCreateRequestInstance
  private readonly slugBuilder: TGetSlug<keyof typeof KiniopoiskTgRoutes>

  private readonly movieTypeMap: Record<EMovieTypes, MovieDtoV14['type'][]>

  constructor() {
    this.axiosInstance = createRequestInstance({
      apiUrl: 'https://api.kinopoisk.dev/',
      secure: { header: 'X-API-KEY' },
    })
    this.slugBuilder = useSlugBuilder(KiniopoiskTgRoutes)

    this.movieTypeMap = {
      [EMovieTypes.movie]: ['movie', 'cartoon', 'anime'],
      [EMovieTypes.series]: ['tv-series', 'animated-series', 'series'],
      [EMovieTypes.show]: ['tv-show'],
    }
  }

  private formatType(type: MovieDtoV14['type']) {
    for (const [key, value] of Object.entries(this.movieTypeMap)) {
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

  private formatVotes(data: MovieDtoV14) {
    const map = {
      kp: 'kp',
      imdb: 'imdb',
      critics: 'filmCritics',
      ruCritics: 'russianFilmCritics',
    }
    const votes = {}
    for (const [key, value] of Object.entries(map)) {
      if (!data?.rating[value]) {
        continue
      }

      votes[key] = { rating: data?.rating[value], votes: Number(data?.votes[value]) || null }
    }

    return votes
  }

  public async getMovie(token: string, kinopoiskId: number): Promise<IGetMovie | IExpiredToken> {
    const data = await this.axiosInstance<MovieDtoV14>(
      'GET',
      this.slugBuilder.get('movie', [kinopoiskId]),
      token
    )
    if ('error' in data) {
      return { status: 'error', withDelete: false }
    }

    const formatData: IGetMovie = {
      kinopoiskId: data?.id,
      type: this.formatType(data?.type),
      names: this.formatMovieNames(data?.names),
      duration: data?.movieLength || data?.seriesLength,
      years: {
        release: data?.year,
      },
      slogan: data?.slogan,
      description: {
        short: data?.shortDescription,
        default: data?.description,
      },
      votes: this.formatVotes(data),
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
