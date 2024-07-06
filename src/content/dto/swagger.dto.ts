// Node Deps
import { ApiProperty } from '@nestjs/swagger'
// Types & Interfaces
import {
  balancer_code as EBalancerCodes,
  balancer_status as EBalancerStatus,
  movie_votes_codes as EMovieVoteCodes,
  movie_types as EMovieTypes,
} from '@prisma/client'

export class SuccessChangeContentBalancer {
  @ApiProperty({
    name: 'success',
    type: Boolean,
    required: true,
    example: true,
  })
  success: boolean
}

export class BalancerItemSchema {
  @ApiProperty({
    name: 'id',
    type: Number,
    required: true,
    example: 1,
  })
  id: number

  @ApiProperty({
    name: 'code',
    type: String,
    required: true,
    enum: EBalancerCodes,
    example: EBalancerCodes.KP,
  })
  code: EBalancerCodes

  @ApiProperty({
    name: 'name',
    type: String,
    required: true,
    example: 'Кинопоиск официальное (не совсем) API'
  })
  name: string

  @ApiProperty({
    name: 'documentationLink',
    type: String,
    required: true,
    example: 'https://kinopoiskapiunofficial.tech/profile'
  })
  documentationLink: string

  @ApiProperty({
    name: 'status',
    type: String,
    required: true,
    enum: EBalancerStatus,
    example: EBalancerStatus.ONLINE,
  })
  status: string

  @ApiProperty({
    name: 'selected',
    type: Boolean,
    required: true,
    example: true,
  })
  selected: boolean
}

export class SuccessGetContentBalancerList {
  @ApiProperty({
    name: 'totalItems',
    type: Number,
    required: true,
    example: 12,
  })
  totalItems: number

  @ApiProperty({
    name: 'totalPages',
    type: Number,
    required: true,
    example: 1,
  })
  totalPages: number

  @ApiProperty({
    name: 'items',
    type: () => [BalancerItemSchema],
    required: true,
  })
  balancers: BalancerItemSchema[]
}

class MovieDescription {
  @ApiProperty({
    name: 'short',
    nullable: true,
    type: String,
    example: 'Гангстер идет на терапию, чтобы разобраться в себе. ' +
      'Сериал HBO, с которого началась золотая эра телевидения',
  })
  short?: string | null

  @ApiProperty({
    name: 'default',
    nullable: true,
    type: String,
    example: 'Мафиозный босс Северного Джерси Тони Сопрано эффективно решает ' +
      'проблемы «семьи». Но с собственной роднёй ситуация сложнее: дети от рук ' +
      'отбились, брак под угрозой, в отношениях с пожилой матерью сплошное ' +
      'недопонимание. После серии панических атак он решает тайно посещать ' +
      'психотерапевта.'
  })
  default?: string | null
}

class MovieYear {
  @ApiProperty({
    name: 'release',
    type: Number,
    example: 2011,
  })
  release: number

  @ApiProperty({
    name: 'start',
    nullable: true,
    type: Number,
    example: 2011,
  })
  start?: number | null

  @ApiProperty({
    name: 'end',
    nullable: true,
    type: Number,
    example: 2019,
  })
  end?: number | null
}

class MovieRating {
  @ApiProperty({
    name: 'code',
    type: String,
    enum: EMovieVoteCodes,
    example: EMovieVoteCodes.KINOPPOISK,
  })
  code: EMovieVoteCodes

  @ApiProperty({
    name: 'rating',
    nullable: true,
    type: Number,
    example: 8.826,
  })
  rating?: number | null

  @ApiProperty({
    name: 'votes',
    nullable: true,
    type: Number,
    example: 2098709,
  })
  votes?: number | null
}

class MovieName {
  @ApiProperty({
    name: 'name',
    nullable: true,
    type: String,
    example: '1+1'
  })
  name?: string | null

  @ApiProperty({
    name: 'language',
    type: String,
    example: 'RU'
  })
  language: string
}

class MoviePoster {
  @ApiProperty({
    name: 'preview',
    nullable: true,
    type: String,
    example: 'https://image.openmoviedb.com/kinopoisk-images/1946459' +
      '/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/x1000',
  })
  preview?: string | null

  @ApiProperty({
    name: 'display',
    type: String,
    example: 'https://image.openmoviedb.com/kinopoisk-images/1946459' +
      '/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/orig'
  })
  display: string
}

export class SuccessGetMovie {
  @ApiProperty({
    name: 'kinopoiskId',
    type: Number,
    required: true,
    example: 535341,
  })
  kinopoiskId: number

  @ApiProperty({
    name: 'imdbId',
    nullable: true,
    type: String,
    required: false,
    example: 'tt0141842'
  })
  imdbId?: string | null

  @ApiProperty({
    name: 'type',
    nullable: true,
    type: String,
    enum: EMovieTypes,
    example: EMovieTypes.MOVIE,
  })
  type: EMovieTypes | null

  @ApiProperty({
    name: 'duration',
    nullable: true,
    type: Number,
    example: 120,
  })
  duration?: number | null

  // @ApiProperty({
  //   name: 'slogan',
  //   type: String,
  //   example: 'Добро пожаловать в реальный мир',
  // })
  // slogan: string
  //
  // @ApiProperty({
  //   name: 'description',
  //   required: true,
  //   type: MovieDescription,
  // })
  // description: MovieDescription

  @ApiProperty({
    name: 'poster',
    type: MoviePoster,
  })
  poster: MoviePoster

  @ApiProperty({
    name: 'ageLimits',
    nullable: true,
    type: Number,
    example: 18,
  })
  ageLimits?: number | null

  @ApiProperty({
    name: 'names',
    type: () => [MovieName]
  })
  names: MovieName[]

  @ApiProperty({
    name: 'genres',
    nullable: true,
    type: () => [String],
    example: ['драма', 'комедия'],
  })
  genres?: string[] | null

  @ApiProperty({
    name: 'countries',
    type: () => [String],
    required: true,
    example: ['россия', 'сша']
  })
  countries: string[]

  @ApiProperty({
    name: 'votes',
    type: () => [MovieRating],
  })
  votes: MovieRating[]

  @ApiProperty({
    name: 'years',
    type: MovieYear,
  })
  years: MovieYear
}
