export interface IBalancerService {
  getMovie: (token: string, kinopoiskId: number) => Promise<IGetMovie>
}

export enum EMovieTypes {
  movie = 'MOVIE',
  series = 'SERIES',
  show = 'SHOW',
}

export interface IGetMovie {
  kinopoiskId: string | number,
  imdbId?: string,
  type: EMovieTypes | null,
  names: { name: string, language: string }[],
  genres: string[],
  countries: string[],
  description: {
    short: string,
    default: string,
  },
  rates?: {
    kinopoisk?: number,
    imdb?: number,
  },
  poster: {
    preview: string,
    display: string,
  },
  rating: {
    age: number,
    mpaa: string,
  },
}
