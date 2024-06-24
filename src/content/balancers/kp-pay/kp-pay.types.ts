// SLUG: movie

export type TBalancerMovie = {
  id: number
  externalId: IMovieExetrnalId
  name: string
  alternativeName: string
  enName: any
  names: IMovieName[]
  type: EBalancerMovieType
  typeNumber: number
  year: number
  description: string
  shortDescription: string
  slogan: string
  status: any
  rating: IMovieNameRating
  votes: IMovieRatingVotes
  movieLength: number
  totalSeriesLength: any
  seriesLength: any
  ratingMpaa: string
  ageRating: number
  poster: IMovieRatingPoster
  backdrop: IMovieBackdrop
  genres: IMovieGenre[]
  countries: IMovieCountry[]
  persons: IMoviePerson[]
  budget: IMovieBudget
  premiere: IMoviePremiere
  watchability: IMovieWatchability
  top10: any
  top250: number
  isSeries: boolean
  audience: IMovieAudience[]
  ticketsOnSale: boolean
  lists: string[]
  networks: any
  createdAt: string
  updatedAt: string
}

export enum EBalancerMovieType {
  movie = 'movie',
  series = 'tv-series',
  cartoon = 'cartoon',
  anime = 'anime',
  animatedSeries = 'animated-series',
  show = 'tv-show',
}

interface IMovieExetrnalId {
  kpHD: string
  imdb: string
  tmdb: string
}

interface IMovieName {
  name: string
  language: string | null
  type: 'Original title on kinopoisk' | 'Russian title on kinopoisk'
}

interface IMovieNameRating {
  kp: number
  imdb: number
  tmdb: number
  filmCritics: number
  russianFilmCritics: number
  await: any
}

interface IMovieRatingVotes {
  kp: number
  imdb: number
  tmdb: number
  filmCritics: number
  russianFilmCritics: number
  await: number
}

interface IMovieRatingPoster {
  url: string
  previewUrl: string
}

interface IMovieBackdrop {
  url: string
  previewUrl: string
}

interface IMovieGenre {
  name: string
}

interface IMovieCountry {
  name: string
}

interface IMoviePerson {
  id: number
  photo: string
  name: string
  enName?: string
  description?: string
  profession: string
  enProfession: string
}

interface IMovieBudget {
  currency: string
  value: number
}

interface IMoviePremiere {
  country: any
  digital: any
  cinema: any
}

interface IMovieWatchability {
  items: IMovieItem[]
}

interface IMovieItem {
  name: string
  logo: IMovieLogo
  url: string
}

interface IMovieLogo {
  url: string
}

interface IMovieAudience {
  count: number
  country: string
}
