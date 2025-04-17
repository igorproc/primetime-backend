import {
  staff_sex,
  staff_profession_key
} from '@prisma/client'

export interface IBalancerService {
  getMovie: (token: string, kinopoiskId: number) => Promise<IGetMovie | IExpiredToken>
  getStaffInfo: (token: string, staffKinopoiskId: number) => Promise<IGetStaffInfo | IExpiredToken>
  getMovieStaff: (token: string, kinopoiskId: number) => Promise<IGetMovieStaffList | IExpiredToken>
}

export enum EMovieTypes {
  movie = 'MOVIE',
  series = 'SERIES',
  show = 'SHOW',
}

export enum EMovieVotes {
  kp = 'kp',
  imdb = 'imdb',
  critics = 'critics',
  ruCritics = 'ruCritics'
}

interface IMovieVote {
  rating: number | null,
  votes: number | null,
}

type TMovieVote = Partial<{ [key in keyof typeof EMovieVotes]: IMovieVote }>

interface IMovieName {
  name: string,
  language: string
}

interface IMovieYears {
  release: number,
  start?: number,
  end?: number,
}

interface IMovieDescription {
  short: string,
  default: string,
}

interface IMoviePoster {
  preview: string,
  display: string,
}

interface IMovieRatings {
  age: number,
  mpaa: string,
}

export interface IGetMovie {
  kinopoiskId: number,
  imdbId?: string,
  type: EMovieTypes | null,
  names: IMovieName[],
  duration: number,
  genres: string[],
  countries: string[],
  slogan: string,
  years: IMovieYears,
  description: IMovieDescription,
  poster: IMoviePoster,
  rating: IMovieRatings,
  votes: TMovieVote,
}

export interface IExpiredToken {
  status: 'error' | 'warn',
  withDelete: boolean
}

export interface IGetStaffInfo {
  staffKinopoiskId: number
  name?: string
  nameAlt?: string
  sex?: staff_sex
  growth?: number
  birthday?: Date
  birthplace?: string
  deathplace?: string
  avatarUrl?: string
  linkMovies?: IGetMovieStaff[]
  linkFacts?: string[]
}

export interface IGetMovieStaff {
  kinopoiskId: number
  professionKey: staff_profession_key
  role: string
}

export interface IGetMovieStaffList {
  staffKinopoiskId: number[]
}
