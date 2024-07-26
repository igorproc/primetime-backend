// Node Deps
import { Injectable } from '@nestjs/common'
// Other Services
import { DbService } from '@/db/db.service'
import { CountryService } from '@/movie/country/country.service'
import { GenresService } from '@/movie/genres/genres.service'
// Utils
import { translateRuSentence } from '@utils/translate'
// Swagger Schemas
import { SuccessGetMovie } from '@/content/balancers/dto/swagger.dto'
// Types & Interfaces
import {
  EMovieVotes,
  IGetMovie
} from '@/content/balancers/balancer.types'
import {
  movie_votes_codes as EMovieVoteCodes
} from '@prisma/client'
import type {
  TMovieModel,
  TMovieNames,
  TMovieRatingModel,
  TMovieYears,
  TMovieContent
} from '@/global.types'

type TFormatMovie = {
  names: TMovieNames[],
  countries: string[],
  genres: string[],
  ratings: TMovieRatingModel[],
  years: TMovieYears,
  content: TMovieContent,
} & TMovieModel

@Injectable()
export class MovieService {
  private readonly NAME_REGEXP = /[+^*_]/gi
  private readonly votesConditionMap: Record<EMovieVotes, EMovieVoteCodes>

  constructor(
    private readonly db: DbService,
    private readonly country: CountryService,
    private readonly genre: GenresService,
  ) {
    this.votesConditionMap = {
      [EMovieVotes.kp]: EMovieVoteCodes.KINOPPOISK,
      [EMovieVotes.imdb]: EMovieVoteCodes.IMDB,
      [EMovieVotes.critics]: EMovieVoteCodes.CRITICS,
      [EMovieVotes.ruCritics]: EMovieVoteCodes.RU_CRITICS,
    }
  }

  // Utils
  private generateSlug(kinopoiskId: number, names: IGetMovie['names']) {
    let name = names.find(item => item.language === 'EN')?.name
    if (!name) {
      const ruName = names.find(item => item.language === 'RU')?.name

      name = translateRuSentence(ruName || 'пока нету ничего')
    }
    name = name.toLowerCase()

    const slicedId = kinopoiskId.toString().slice(0, 4)
    const formatedName = name
      .replaceAll(' ', '-')
      .replaceAll(this.NAME_REGEXP, '-')

    return `${slicedId}-${formatedName}`
  }

  // Cache Actions

  private async cacheMovieCountries(id: number, countries: IGetMovie['countries']) {
    for (const country of countries) {
      const data = await this.country.findOrCreateGenreByName(country)

      await this.db
        .movieCountry
        .create({
          data: { watchId: id, name: data.name }
        })
    }

    return countries
  }

  private async cacheMovieGenres(id: number, genres: IGetMovie['genres']) {
    for (const genre of genres) {
      const data = await this.genre.findOrCreateGenreByName(genre)

      await this.db
        .movieGenre
        .create({
          data: { watchId: id, name: data.name }
        })
    }

    return genres
  }

  private async cacheMovieNames(id: number, names: IGetMovie['names']) {
    const nameList = []

    for (const name of names) {
      const data = await this.db
        .movieName
        .create({
          data: { watchId: id, code: name.language, name: name.name }
        })

      nameList.push(data)
    }
    return nameList
  }

  private async cacheMovieRatings(id: number, rates: IGetMovie['votes']) {
    const votes = []

    for (const [code, rate] of Object.entries(rates)) {
      const data = await this.db
        .movieRating
        .create({
          data: {
            watchId: id,
            code: this.votesConditionMap[code],
            votes: rate.votes,
            rating: rate.rating
          }
        })

      votes.push(data)
    }
    return votes
  }

  private async cacheMovieContents(id: number, payload: Pick<IGetMovie, 'description' | 'slogan'>) {
    if (!payload) {
      return null
    }

    return this.db
      .movieContent
      .create({
        data: {
          id,
          slogan: payload.slogan,
          shortDescription: payload.description.short,
          description: payload.description.default,
        }
      })
  }

  private async cacheMovieYears(
    id: number,
    years: IGetMovie['years'],
  ) {
    return this.db
      .movieYear
      .create({
        data: {
          id,
          year: years.release,
          start: years?.start || null,
          end: years?.end || null,
        }
      })
  }

  private formatCacheMovieData(payload: TFormatMovie): SuccessGetMovie {
    const formatedVotes = payload.ratings
      .map(item => {
        return {
          code: item.code,
          rating: item.rating,
          votes: item.votes,
        }
      })

    const formatedNames = payload.names
      .map(item => {
        return {
          name: item.name,
          language: item.code
        }
      })

    return {
      kinopoiskId: payload.kinopoiskId,
      imdbId: payload.imdbId,
      type: payload.type,
      duration: payload?.duration,
      slogan: payload.content?.slogan,
      description: {
        short: payload.content?.shortDescription,
        default: payload.content?.description,
      },
      poster: {
        preview: payload.posterPreview,
        display: payload.posterDisplay,
      },
      ageLimits: payload.ageLimits,
      countries: payload.countries,
      genres: payload.genres,
      years: {
        release: payload.years?.year,
        start: payload.years?.start,
        end: payload.years?.end,
      },
      names: formatedNames,
      votes: formatedVotes,
    }
  }

  // Actions
  public async cacheMovie(payload: IGetMovie) {
    const movieData = await this.db
      .watchContent
      .create({
        data: {
          type: payload.type,
          slug: this.generateSlug(payload.kinopoiskId, payload.names),
          duration: payload.duration,
          kinopoiskId: payload.kinopoiskId,
          imdbId: payload.imdbId,
          posterDisplay: payload.poster.display,
          posterPreview: payload.poster.preview,
          ageLimits: payload.rating.age,
        }
      })

    const [
      countries,
      genres,
      names,
      ratings,
      years,
      content,
    ] = await Promise.all([
      this.cacheMovieCountries(movieData.id, payload.countries),
      this.cacheMovieGenres(movieData.id, payload.genres),
      this.cacheMovieNames(movieData.id, payload.names),
      this.cacheMovieRatings(movieData.id, payload.votes),
      this.cacheMovieYears(movieData.id, payload?.years || null),
      this.cacheMovieContents(movieData.id, { slogan: payload.slogan, description: payload.description }),
    ])

    return this.formatCacheMovieData({
      ...movieData,
      countries,
      genres,
      names,
      ratings,
      years,
      content
    })
  }

  // Getters Helpers
  private async getMovieNames(id: number): Promise<TFormatMovie['names']> {
    return this.db
      .movieName
      .findMany({
        where: { watchId: id }
      })
  }

  private async getMovieCountries(id: number): Promise<TFormatMovie['countries']> {
    const data = await this.db
        .movieCountry
        .findMany({
          where: { watchId: id }
        })

    return data.map(item => item.name)
  }

  private async getMovieGenres(id: number): Promise<TFormatMovie['genres']> {
    const data = await this.db
        .movieGenre
        .findMany({
          where: { watchId: id }
        })

    return data.map(genre => genre.name)
  }

  private async getMovieRatings(id: number): Promise<TFormatMovie['ratings']> {
    return this.db
      .movieRating
      .findMany({
        where: { watchId: id },
      })
  }

  private async getMovieYears(id: number): Promise<TFormatMovie['years']> {
    return this.db
      .movieYear
      .findUnique({
        where: { id }
      })
  }

  private async getMovieContent(id: number): Promise<TFormatMovie['content']> {
    return this.db
      .movieContent
      .findUnique({
        where: { id }
      })
  }

  // Getters
  public async findByKinopoiskId(kinopoiskId: number): Promise<SuccessGetMovie> {
    const watchData = await this.db
      .watchContent
      .findUnique({
        where: { kinopoiskId }
      })

    if (!watchData) {
      return null
    }

    const [
      names,
      countries,
      genres,
      ratings,
      years,
      content
    ] = await Promise.all([
      this.getMovieNames(watchData.id),
      this.getMovieCountries(watchData.id),
      this.getMovieGenres(watchData.id),
      this.getMovieRatings(watchData.id),
      this.getMovieYears(watchData.id),
      this.getMovieContent(watchData.id),
    ])

    return this.formatCacheMovieData({
      ...watchData,
      names,
      countries,
      genres,
      ratings,
      years,
      content
    })
  }
}
