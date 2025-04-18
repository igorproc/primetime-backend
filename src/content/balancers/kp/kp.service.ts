// Node Deps
import { Injectable } from '@nestjs/common'
// Routes
import { KinopoiskUnnoficialRoutes } from '@/content/balancers/kp/kp.routes'
// Utils
import { createRequestInstance, type TCreateRequestInstance } from '@/content/utils/axios'
import { useSlugBuilder, type TGetSlug } from '@/content/utils/slug'
// Types & Interfaces
import {
  EMovieTypes,
  IBalancerService,
  IExpiredToken,
  IGetMovie, IGetMovieStaffList,
  IGetStaffInfo
} from '@/content/balancers/balancer.types'
import { type Film, PersonResponse, StaffResponse } from '@@/.types/content-balancer/kp'
import * as moment from 'moment'
import { staff_profession_key } from '@prisma/client'

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

  public async getMovie(token: string, kinopoiskId: number): Promise<IGetMovie | IExpiredToken> {
    try {
      const data = await this.axiosInstance<Film>(
        'GET',
        this.slugBuilder.get('movie', [kinopoiskId]),
        token,
      )
      if ('error' in data) {
        return { status: 'error', withDelete: false }
      }

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
          age: Number(data?.ratingAgeLimits?.replace('age', '')) || 0,
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

  public async getStaffInfo(token: string, staffKinopoiskId: number) {
    const data = await this.axiosInstance<PersonResponse>(
      'GET',
      this.slugBuilder.get('staffInfo', [staffKinopoiskId]),
      token,
    )

    if ('error' in data) {
      return { status: 'error', withDelete: false } as IExpiredToken
    }

    const allowProfessionKey: string[] = [
      'WRITER', 'OPERATOR', 'EDITOR',
      'COMPOSER', 'PRODUCER_USSR', 'HIMSELF',
      'HERSELF', 'HRONO_TITR_MALE', 'HRONO_TITR_FEMALE',
      'TRANSLATOR', 'DIRECTOR', 'DESIGN',
      'PRODUCER', 'ACTOR', 'VOICE_DIRECTOR',
    ]

    function getProfessionKey(professionKey: string) {
      const keys: { [key: string]: staff_profession_key } = {
        WRITER: 'WRITER',
        OPERATOR: 'OPERATOR',
        EDITOR: 'EDITOR',
        COMPOSER: 'COMPOSER',
        PRODUCER_USSR: 'PRODUCER',
        HIMSELF: 'ACTOR',
        HERSELF: 'ACTOR',
        HRONO_TITR_MALE: 'ACTOR',
        HRONO_TITR_FEMALE: 'ACTOR',
        TRANSLATOR: 'TRANSLATOR',
        DIRECTOR: 'DIRECTOR',
        DESIGN: 'DESIGN',
        PRODUCER: 'PRODUCER',
        ACTOR: 'ACTOR',
        VOICE_DIRECTOR: 'VOICE_DIRECTOR',
      }

      return keys[professionKey]
    }

    function getRole(
      description: string,
      professionKey: string,
      { name, nameAlt }: { name: string, nameAlt: string }
    ) {
      switch (professionKey) {
        case 'HIMSELF':
        case 'HERSELF':
          return name || nameAlt
        default:
          return description
      }
    }

    const formatData: IGetStaffInfo = {
      staffKinopoiskId: data.personId,
      name: data.nameRu,
      nameAlt: data.nameEn,
      sex: ['MALE', 'FEMALE'].includes(data.sex) ? data.sex : null,
      growth: Number(data.growth) || null,
      birthday: data?.birthday ? moment(data.birthday).toDate() : null,
      birthplace: data.birthplace,
      deathplace: data.deathplace,
      avatarUrl: data.posterUrl,
      linkMovies: data.films
        ?.filter(movie => allowProfessionKey.includes(movie.professionKey))
        .map(movie => ({
          kinopoiskId: movie.filmId,
          professionKey: getProfessionKey(movie.professionKey),
          role: getRole(movie.description, movie.professionKey, {
            name: data.nameRu,
            nameAlt: data.nameEn,
          }),
        })) || [],
      linkFacts: data.facts?.length ? data.facts : [],
    }

    return formatData
  }

  public async getMovieStaff(token: string, kinopoiskId: number) {
    const data = await this.axiosInstance<StaffResponse[]>(
      'GET',
      this.slugBuilder.get('movieStaff', [kinopoiskId]),
      token,
    )

    if ('error' in data) {
      return { status: 'error', withDelete: false } as IExpiredToken
    }

    const formatData: IGetMovieStaffList = {
      staffKinopoiskId: data
        ?.filter(staff => staff.staffId)
        .map(staff => staff.staffId) || []
    }

    return formatData
  }
}
