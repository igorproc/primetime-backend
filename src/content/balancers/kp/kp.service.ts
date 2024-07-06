// Node Deps
import { Injectable } from '@nestjs/common'
// Routes
import { KinopoiskUnnoficialRoutes } from '@/content/balancers/kp/kp.routes'
// Utils
import { createRequestInstance, type TCreateRequestInstance } from '@/content/utils/axios'
import { useSlugBuilder, type TGetSlug } from '@/content/utils/slug'
// Types & Interfaces
import { EMovieTypes, IBalancerService, IGetMovie } from '@/content/balancers/balancer.types'
import { type Film } from '@/content/balancers/kp/kp.types'

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

  private formatType(type: Film['type']) {
    const conditionMap: Record<EMovieTypes, Film['type'][]> = {
      [EMovieTypes.movie]: ['FILM'],
      [EMovieTypes.series]: ['VIDEO', 'MINI_SERIES', 'TV_SERIES'],
      [EMovieTypes.show]: ['TV_SHOW'],
    }

    for (const [key, value] of Object.entries(conditionMap)) {
      if (value.includes(type)) {
        return key as EMovieTypes
      }
    }
    return null
  }

  public async getMovie(token: string, kinopoiskId: number): Promise<IGetMovie> {
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
      names: [
        { name: data?.nameRu, language: 'RU' },
        { name: data?.nameEn, language: 'EN' },
      ],
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
  }
}
