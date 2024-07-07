// Node Deps
import { Injectable } from '@nestjs/common'
// Routes
import { KinopoiskUnnoficialRoutes } from '@/content/balancers/kp/kp.routes'
// Utils
import { createRequestInstance, type TCreateRequestInstance } from '@/content/utils/axios'
import { useSlugBuilder, type TGetSlug } from '@/content/utils/slug'
// Types & Interfaces
import { EMovieTypes, IBalancerService, IGetMovie } from '@/content/balancers/balancer.types'
import { type Film } from '@@/.types/content-balancer/kp'

@Injectable()
export class KpService implements IBalancerService {
  private readonly axiosInstance: TCreateRequestInstance
  private readonly slugBuilder: TGetSlug<keyof typeof KinopoiskUnnoficialRoutes>

  private readonly movieTypeConditionMap: Record<EMovieTypes, Film['type'][]>

  constructor() {
    this.axiosInstance = createRequestInstance({
      apiUrl: 'https://kinopoiskapiunofficial.tech/api',
      secure: { header: 'X-API-KEY' },
    })
    this.slugBuilder = useSlugBuilder(KinopoiskUnnoficialRoutes)

    this.movieTypeConditionMap = {
      [EMovieTypes.movie]: ['FILM'],
      [EMovieTypes.series]: ['VIDEO', 'MINI_SERIES', 'TV_SERIES'],
      [EMovieTypes.show]: ['TV_SHOW'],
    }
  }

  private formatType(type: Film['type']) {
    for (const [key, value] of Object.entries(this.movieTypeConditionMap)) {
      if (value.includes(type)) {
        return key as EMovieTypes
      }
    }
    return null
  }

  private formatNames(data: Pick<Film, 'nameRu' | 'nameEn'>) {
    const localesConditionMap = { 'RU': 'nameRu', 'EN': 'nameEn' }
    const names = []

    for (const [key, value] of Object.entries(localesConditionMap)) {
      if (!data[value]) {
        continue
      }

      names.push({ name: data[value], language: key })
    }
    return names
  }

  public async getMovie(token: string, kinopoiskId: number): Promise<IGetMovie> {
    try {
      const data = await this.axiosInstance<Film>(
        'GET',
        this.slugBuilder.get('movie', [kinopoiskId]),
        token,
      )

      const formatData: IGetMovie = {
        kinopoiskId: data?.kinopoiskId,
        imdbId: data?.imdbId,
        type: this.formatType(data?.type),
        duration: data?.filmLength,
        years: {
          release: data?.year,
        },
        names: this.formatNames({ nameRu: data?.nameRu, nameEn: data?.nameEn }),
        slogan: data?.slogan,
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
        votes: {
          kp: {
            rating: data?.ratingKinopoisk,
            votes: data?.ratingKinopoiskVoteCount,
          },
          imdb: {
            rating: data?.ratingImdb,
            votes: data?.ratingImdbVoteCount,
          },
          critics: {
            rating: data?.ratingFilmCritics,
            votes: data?.ratingFilmCriticsVoteCount,
          },
          ruCritics: {
            rating: data?.ratingRfCritics,
            votes: data?.ratingRfCriticsVoteCount,
          },
        },
        countries: data?.countries
          .filter(item => item.country)
          .map(item => item.country.toLowerCase()),
        genres: data?.genres
          .filter(item => item.genre)
          .map(item => item.genre.toLowerCase())
      }

      if ([EMovieTypes.series, EMovieTypes.show].includes(formatData.type)) {
        formatData.years.start = data?.startYear
        formatData.years.end = data?.endYear
      }

      return formatData
    } catch (error) {
      throw error
    }
  }
}
