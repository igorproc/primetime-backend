// SLUG: movie
export enum EBalancerMovieType {
  movie = 'FILM',
  video = 'VIDEO',
  series = 'TV_SERIES',
  mini_series = 'MINI_SERIES',
  show = 'TV_SHOW'
}

interface IBalancerMovieCountry {
  country: string
}

interface IBalancerMovieGenre {
  genre: string
}

export type TBalancerMovie = {
  kinopoiskId: number
  kinopoiskHDId: string
  imdbId: string
  nameRu: string
  nameEn: any
  nameOriginal: string
  posterUrl: string
  posterUrlPreview: string
  coverUrl: string
  logoUrl: string
  reviewsCount: number
  ratingGoodReview: number
  ratingGoodReviewVoteCount: number
  ratingKinopoisk: number
  ratingKinopoiskVoteCount: number
  ratingImdb: number
  ratingImdbVoteCount: number
  ratingFilmCritics: number
  ratingFilmCriticsVoteCount: number
  ratingAwait: any
  ratingAwaitCount: number
  ratingRfCritics: number
  ratingRfCriticsVoteCount: number
  webUrl: string
  year: number
  filmLength: number
  slogan: string
  description: string
  shortDescription: string
  editorAnnotation: any
  isTicketsAvailable: boolean
  productionStatus: any
  type: EBalancerMovieType
  ratingMpaa: string
  ratingAgeLimits: string
  countries: IBalancerMovieCountry[]
  genres: IBalancerMovieGenre[]
  startYear: any
  endYear: any
  serial: boolean
  shortFilm: boolean
  completed: boolean
  hasImax: boolean
  has3D: boolean
  lastSync: string
}
