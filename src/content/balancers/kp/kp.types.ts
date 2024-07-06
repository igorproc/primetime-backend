/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Film {
  /** @example 301 */
  kinopoiskId: number;
  /** @example "4824a95e60a7db7e86f14137516ba590" */
  kinopoiskHDId: string | null;
  /** @example "tt0133093" */
  imdbId: string | null;
  /** @example "Матрица" */
  nameRu: string | null;
  /** @example "The Matrix" */
  nameEn: string | null;
  /** @example "The Matrix" */
  nameOriginal: string | null;
  /** @example "https://kinopoiskapiunofficial.tech/images/posters/kp/301.jpg" */
  posterUrl: string;
  /** @example "https://kinopoiskapiunofficial.tech/images/posters/kp_small/301.jpg" */
  posterUrlPreview: string;
  /** @example "https://avatars.mds.yandex.net/get-ott/1672343/2a0000016cc7177239d4025185c488b1bf43/orig" */
  coverUrl: string | null;
  /** @example "https://avatars.mds.yandex.net/get-ott/1648503/2a00000170a5418408119bc802b53a03007b/orig" */
  logoUrl: string | null;
  /** @example 293 */
  reviewsCount: number;
  /** @example 88.9 */
  ratingGoodReview: number | null;
  /** @example 257 */
  ratingGoodReviewVoteCount: number | null;
  /** @example 8.5 */
  ratingKinopoisk: number | null;
  /** @example 524108 */
  ratingKinopoiskVoteCount: number | null;
  /** @example 8.7 */
  ratingImdb: number | null;
  /** @example 1729087 */
  ratingImdbVoteCount: number | null;
  /** @example 7.8 */
  ratingFilmCritics: number | null;
  /** @example 155 */
  ratingFilmCriticsVoteCount: number | null;
  /** @example 7.8 */
  ratingAwait: number | null;
  /** @example 2 */
  ratingAwaitCount: number | null;
  /** @example 7.8 */
  ratingRfCritics: number | null;
  /** @example 31 */
  ratingRfCriticsVoteCount: number | null;
  /** @example "https://www.kinopoisk.ru/film/301/" */
  webUrl: string;
  /** @example 1999 */
  year: number | null;
  /** @example 136 */
  filmLength: number | null;
  /** @example "Добро пожаловать в реальный мир" */
  slogan: string | null;
  /** @example "Жизнь Томаса Андерсона разделена на две части:" */
  description: string | null;
  /** @example "Хакер Нео узнает, что его мир — виртуальный. Выдающийся экшен, доказавший, что зрелищное кино может быть умным" */
  shortDescription: string | null;
  /** @example "Фильм доступен только на языке оригинала с русскими субтитрами" */
  editorAnnotation: string | null;
  /** @example false */
  isTicketsAvailable: boolean;
  /** @example "POST_PRODUCTION" */
  productionStatus: "FILMING" | "PRE_PRODUCTION" | "COMPLETED" | "ANNOUNCED" | "UNKNOWN" | "POST_PRODUCTION" | null;
  /** @example "FILM" */
  type: "FILM" | "VIDEO" | "TV_SERIES" | "MINI_SERIES" | "TV_SHOW";
  /** @example "r" */
  ratingMpaa: string | null;
  /** @example "age16" */
  ratingAgeLimits: string | null;
  /** @example false */
  hasImax: boolean | null;
  /** @example false */
  has3D: boolean | null;
  /** @example "2021-07-29T20:07:49.109817" */
  lastSync: string;
  countries: Country[];
  genres: Genre[];
  /** @example 1996 */
  startYear: number | null;
  /** @example 1996 */
  endYear: number | null;
  /** @example false */
  serial?: boolean | null;
  /** @example false */
  shortFilm?: boolean | null;
  /** @example false */
  completed?: boolean | null;
}

export interface SeasonResponse {
  /** @example 5 */
  total: number;
  items: Season[];
}

export interface FactResponse {
  /** @example 5 */
  total: number;
  items: Fact[];
}

export interface DistributionResponse {
  /** @example 5 */
  total: number;
  items: Distribution[];
}

export interface BoxOfficeResponse {
  /** @example 5 */
  total: number;
  items: BoxOffice[];
}

export interface Fact {
  /** @example "В эпизоде, где Тринити и Нео в поисках Морфиуса оказываются на крыше..." */
  text: string;
  /** @example "BLOOPER" */
  type: "FACT" | "BLOOPER";
  /** @example false */
  spoiler: boolean;
}

export interface BoxOffice {
  /** @example "BUDGET" */
  type: string;
  /** @example 63000000 */
  amount: number;
  /** @example "USD" */
  currencyCode: string;
  /** @example "US Dollar" */
  name: string;
  /** @example "$" */
  symbol: string;
}

export interface AwardResponse {
  /** @example 5 */
  total: number;
  items: Award[];
}

export interface Award {
  /** @example "Оскар" */
  name: string;
  /** @example true */
  win: boolean;
  /** @example "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/09035193-2458-4de7-a7df-ad8f85b73798/orig" */
  imageUrl: string | null;
  /** @example "Лучший звук" */
  nominationName: string;
  /** @example 2000 */
  year: number;
  persons?: AwardPerson[];
}

export interface AwardPerson {
  /** @example 1937039 */
  kinopoiskId: number;
  /** @example "https://www.kinopoisk.ru/name/1937039/" */
  webUrl: string;
  /** @example "Джон Т. Рейц" */
  nameRu: string | null;
  /** @example "John T. Reitz" */
  nameEn: string | null;
  /** @example "MALE" */
  sex: string;
  /** @example "https://kinopoiskapiunofficial.tech/images/actor_posters/kp/1937039.jpg" */
  posterUrl: string;
  /** @example 178 */
  growth: number | null;
  /** @example "1955-11-02" */
  birthday: string | null;
  /** @example "2019-01-06" */
  death: string | null;
  /** @example 21 */
  age: number | null;
  /** @example "Лос-Анджелес, Калифорния, США" */
  birthplace: string | null;
  /** @example "Лос-Анджелес, Калифорния, США" */
  deathplace: string | null;
  /** @example "Монтажер, Продюсер" */
  profession: string | null;
}

export interface Distribution {
  /** @example "PREMIERE" */
  type: "LOCAL" | "COUNTRY_SPECIFIC" | "PREMIERE" | "ALL" | "WORLD_PREMIER";
  /** @example "CINEMA" */
  subType: "CINEMA" | "DVD" | "DIGITAL" | "BLURAY" | null;
  /** @example "1999-05-07" */
  date: string | null;
  /** @example false */
  reRelease: boolean | null;
  country: Country;
  companies: Company[];
}

export interface Company {
  /** @example "Каро-Премьер" */
  name: string;
}

export interface Season {
  /** @example 1 */
  number: number;
  episodes: Episode[];
}

export interface Episode {
  /** @example 1 */
  seasonNumber: number;
  /** @example 1 */
  episodeNumber: number;
  nameRu: string | null;
  /** @example "Chapter One: The Vanishing of Will Byers" */
  nameEn: string | null;
  /** @example "The Vanishing of Will Byers..." */
  synopsis: string | null;
  /** @example "2016-07-15" */
  releaseDate: string | null;
}

export interface Country {
  /** @example "США" */
  country: string;
}

export interface Genre {
  /** @example "фантастика" */
  genre: string;
}

export interface FiltersResponse {
  genres: FiltersResponseGenres[];
  countries: FiltersResponseCountries[];
}

export interface FilmSearchResponse {
  /** @example "мстители" */
  keyword: string;
  /** @example 7 */
  pagesCount: number;
  /** @example 134 */
  searchFilmsCountResult: number;
  films: FilmSearchResponseFilms[];
}

export interface FilmSearchByFiltersResponse {
  /** @example 7 */
  total: number;
  /** @example 1 */
  totalPages: number;
  items: FilmSearchByFiltersResponseItems[];
}

export interface FilmSequelsAndPrequelsResponse {
  /** @example 301 */
  filmId: number;
  /** @example "Матрица" */
  nameRu: string;
  /** @example "The Matrix" */
  nameEn: string;
  /** @example "The Matrix" */
  nameOriginal: string;
  /** @example "https://kinopoiskapiunofficial.tech/images/posters/kp/301.jpg" */
  posterUrl: string;
  /** @example "https://kinopoiskapiunofficial.tech/images/posters/kp_small/301.jpg" */
  posterUrlPreview: string;
  /** @example "SEQUEL" */
  relationType: "SEQUEL" | "PREQUEL" | "REMAKE" | "UNKNOWN";
}

export interface RelatedFilmResponse {
  /** @example 7 */
  total: number;
  items: RelatedFilmResponseItems[];
}

export interface ReviewResponse {
  /**
   * Суммарное кол-во пользовательских рецензий
   * @example 12
   */
  total: number;
  /** @example 2 */
  totalPages: number;
  /** @example 1 */
  totalPositiveReviews: number;
  /** @example 7 */
  totalNegativeReviews: number;
  /** @example 12 */
  totalNeutralReviews: number;
  items: ReviewResponseItems[];
}

export interface ExternalSourceResponse {
  /**
   * Суммарное кол-во сайтов
   * @example 12
   */
  total: number;
  items: ExternalSourceResponseItems[];
}

export interface FilmCollectionResponse {
  /** @example 200 */
  total: number;
  /** @example 7 */
  totalPages: number;
  items: FilmCollectionResponseItems[];
}

export interface StaffResponse {
  /** @example 66539 */
  staffId: number;
  /** @example "Винс Гиллиган" */
  nameRu: string | null;
  /** @example "Vince Gilligan" */
  nameEn: string | null;
  /** @example "Neo" */
  description: string | null;
  /** @example "https://st.kp.yandex.net/images/actor/66539.jpg" */
  posterUrl: string;
  /** @example "Режиссеры" */
  professionText: string;
  /** @example "DIRECTOR" */
  professionKey:
    | "WRITER"
    | "OPERATOR"
    | "EDITOR"
    | "COMPOSER"
    | "PRODUCER_USSR"
    | "TRANSLATOR"
    | "DIRECTOR"
    | "DESIGN"
    | "PRODUCER"
    | "ACTOR"
    | "VOICE_DIRECTOR"
    | "UNKNOWN";
}

export interface PersonResponse {
  /** @example 66539 */
  personId: number;
  /** @example "10096" */
  webUrl: string | null;
  /** @example "Винс Гиллиган" */
  nameRu: string | null;
  /** @example "Vince Gilligan" */
  nameEn: string | null;
  /** @example "MALE" */
  sex: "MALE" | "FEMALE" | null;
  /** @example "https://kinopoiskapiunofficial.tech/images/actor_posters/kp/10096.jpg" */
  posterUrl: string;
  /** @example "174" */
  growth: string | null;
  /** @example "1965-04-04" */
  birthday: string | null;
  /** @example "2008-01-22" */
  death: string | null;
  /** @example 55 */
  age: number | null;
  /** @example "Манхэттэн, Нью-Йорк, США" */
  birthplace: string | null;
  /** @example "Манхэттэн, Нью-Йорк, США" */
  deathplace: string | null;
  /** @example 1 */
  hasAwards: number | null;
  /** @example "Актер, Продюсер, Сценарист" */
  profession: string | null;
  facts: string[];
  spouses: PersonResponseSpouses[];
  films: PersonResponseFilms[];
}

export interface PersonByNameResponse {
  /** @example 35 */
  total: number;
  items: PersonByNameResponseItems[];
}

export interface ImageResponse {
  /**
   * Общее кол-во изображений
   * @example 50
   */
  total: number;
  /**
   * Код-во доступных страниц
   * @example 3
   */
  totalPages: number;
  items: ImageResponseItems[];
}

export interface PremiereResponse {
  /** @example 34 */
  total: number;
  items: PremiereResponseItem[];
}

export interface PremiereResponseItem {
  /** @example 301 */
  kinopoiskId: number;
  /** @example "Дитя погоды" */
  nameRu: string | null;
  /** @example "Tenki no ko" */
  nameEn: string | null;
  /** @example 2019 */
  year: number;
  /** @example "http://kinopoiskapiunofficial.tech/images/posters/kp/1219417.jpg" */
  posterUrl: string;
  /** @example "https://kinopoiskapiunofficial.tech/images/posters/kp_small/301.jpg" */
  posterUrlPreview: string;
  countries: Country[];
  genres: Genre[];
  /** @example 112 */
  duration: number | null;
  /** @example "2020-06-01" */
  premiereRu: string;
}

export interface DigitalReleaseResponse {
  /** @example 1 */
  page: number;
  /** @example 34 */
  total: number;
  releases: DigitalReleaseItem[];
}

export interface DigitalReleaseItem {
  /** @example 301 */
  filmId: number;
  /** @example "Дитя погоды" */
  nameRu: string;
  /** @example "Tenki no ko" */
  nameEn: string;
  /** @example 2019 */
  year: number;
  /** @example "http://kinopoiskapiunofficial.tech/images/posters/kp/1219417.jpg" */
  posterUrl: string;
  /** @example "https://kinopoiskapiunofficial.tech/images/posters/kp_small/301.jpg" */
  posterUrlPreview: string;
  countries: Country[];
  genres: Genre[];
  /** @example 7.962 */
  rating: number;
  /** @example 14502 */
  ratingVoteCount: number;
  /** @example 99.13 */
  expectationsRating: number;
  /** @example 1123 */
  expectationsRatingVoteCount: number;
  /** @example 112 */
  duration: number;
  /** @example "2020-06-01" */
  releaseDate: string;
}

export interface VideoResponse {
  /** @example 50 */
  total: number;
  items: VideoResponseItems[];
}

export interface KinopoiskUserVoteResponse {
  /** @example 200 */
  total: number;
  /** @example 7 */
  totalPages: number;
  items: KinopoiskUserVoteResponseItems[];
}

export interface ApiKeyResponse {
  totalQuota: ApiKeyResponseTotalQuota;
  dailyQuota: ApiKeyResponseDailyQuota;
  /** @example "FREE" */
  accountType: "FREE" | "EXTENDED" | "UNLIMITED";
}

export interface MediaPostsResponse {
  /** @example 200 */
  total: number;
  /** @example 7 */
  totalPages: number;
  items: MediaPostsResponseItems[];
}

export interface ApiError {
  /** @example "User test@test.ru is inactive or deleted." */
  message: string;
}

export interface FiltersResponseGenres {
  /** @example 1 */
  id?: number;
  /** @example "боевик" */
  genre?: string;
}

export interface FiltersResponseCountries {
  /** @example 1 */
  id?: number;
  /** @example "США" */
  country?: string;
}

export interface FilmSearchResponseFilms {
  /** @example 263531 */
  filmId?: number;
  /** @example "Мстители" */
  nameRu?: string;
  /** @example "The Avengers" */
  nameEn?: string;
  /** @example "FILM" */
  type?: "FILM" | "TV_SHOW" | "VIDEO" | "MINI_SERIES" | "TV_SERIES" | "UNKNOWN";
  /** @example "2012" */
  year?: string;
  /** @example "США, Джосс Уидон(фантастика)" */
  description?: string;
  /** @example "2:17" */
  filmLength?: string;
  countries?: Country[];
  genres?: Genre[];
  /** @example "NOTE!!! 7.9 for released film or 99% if film have not released yet" */
  rating?: string;
  /** @example 284245 */
  ratingVoteCount?: number;
  /** @example "http://kinopoiskapiunofficial.tech/images/posters/kp/263531.jpg" */
  posterUrl?: string;
  /** @example "https://kinopoiskapiunofficial.tech/images/posters/kp_small/301.jpg" */
  posterUrlPreview?: string;
}

export interface FilmSearchByFiltersResponseItems {
  /** @example 263531 */
  kinopoiskId?: number;
  /** @example "tt0050561" */
  imdbId?: string | null;
  /** @example "Мстители" */
  nameRu?: string | null;
  /** @example "The Avengers" */
  nameEn?: string | null;
  /** @example "The Avengers" */
  nameOriginal?: string | null;
  countries?: Country[];
  genres?: Genre[];
  /** @example 7.9 */
  ratingKinopoisk?: number | null;
  /** @example 7.9 */
  ratingImdb?: number | null;
  /** @example 2012 */
  year?: number | null;
  /** @example "FILM" */
  type?: "FILM" | "TV_SHOW" | "VIDEO" | "MINI_SERIES" | "TV_SERIES" | "UNKNOWN";
  /** @example "http://kinopoiskapiunofficial.tech/images/posters/kp/263531.jpg" */
  posterUrl?: string;
  /** @example "https://kinopoiskapiunofficial.tech/images/posters/kp_small/301.jpg" */
  posterUrlPreview?: string;
}

export interface RelatedFilmResponseItems {
  /** @example 301 */
  filmId?: number;
  /** @example "Матрица" */
  nameRu?: string | null;
  /** @example "The Matrix" */
  nameEn?: string | null;
  /** @example "The Matrix" */
  nameOriginal?: string | null;
  /** @example "https://kinopoiskapiunofficial.tech/images/posters/kp/301.jpg" */
  posterUrl?: string;
  /** @example "https://kinopoiskapiunofficial.tech/images/posters/kp_small/301.jpg" */
  posterUrlPreview?: string;
  /** @example "SIMILAR" */
  relationType?: "SIMILAR";
}

export interface ReviewResponseItems {
  /** @example 2 */
  kinopoiskId?: number;
  type?: "POSITIVE" | "NEGATIVE" | "NEUTRAL" | "UNKNOWN";
  /** @example "2010-09-05T20:37:00" */
  date?: string;
  /** @example 122 */
  positiveRating?: number;
  /** @example 12 */
  negativeRating?: number;
  /** @example "Username" */
  author?: string;
  /** @example "Title" */
  title?: string | null;
  /** @example "text" */
  description?: string;
}

export interface ExternalSourceResponseItems {
  /** @example "https://okko.tv/movie/equilibrium?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed" */
  url?: string;
  /** @example "Okko" */
  platform?: string;
  /** @example "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig" */
  logoUrl?: string;
  /** @example 122 */
  positiveRating?: number;
  /** @example 12 */
  negativeRating?: number;
  /** @example "Username" */
  author?: string;
  /** @example "Title" */
  title?: string | null;
  /** @example "text" */
  description?: string;
}

export interface FilmCollectionResponseItems {
  /** @example 263531 */
  kinopoiskId?: number;
  /** @example "Мстители" */
  nameRu?: string | null;
  /** @example "The Avengers" */
  nameEn?: string | null;
  /** @example "The Avengers" */
  nameOriginal?: string | null;
  countries?: Country[];
  genres?: Genre[];
  /** @example 7.9 */
  ratingKinopoisk?: number | null;
  /** @example 7.9 */
  ratingImbd?: number | null;
  /** @example "2012" */
  year?: string | null;
  /** @example "FILM" */
  type?: "FILM" | "TV_SHOW" | "VIDEO" | "MINI_SERIES" | "TV_SERIES" | "UNKNOWN";
  /** @example "http://kinopoiskapiunofficial.tech/images/posters/kp/263531.jpg" */
  posterUrl?: string;
  /** @example "https://kinopoiskapiunofficial.tech/images/posters/kp_small/301.jpg" */
  posterUrlPreview?: string;
}

export interface PersonResponseSpouses {
  /** @example 32169 */
  personId?: number;
  /** @example "Сьюзан Дауни" */
  name?: string | null;
  /** @example false */
  divorced?: boolean;
  /** @example "" */
  divorcedReason?: string | null;
  /** @example "MALE" */
  sex?: "MALE" | "FEMALE";
  /** @example 2 */
  children?: number;
  /** @example "https://www.kinopoisk.ru/name/32169/" */
  webUrl?: string;
  /** @example "супруга" */
  relation?: string;
}

export interface PersonResponseFilms {
  /** @example 32169 */
  filmId?: number;
  /** @example "Солист" */
  nameRu?: string | null;
  /** @example "The Soloist" */
  nameEn?: string | null;
  /** @example "7.2 or 76% if film has not released yet" */
  rating?: string | null;
  /** @example false */
  general?: boolean;
  /** @example "Steve Lopez" */
  description?: string | null;
  /** @example "ACTOR" */
  professionKey?:
    | "WRITER"
    | "OPERATOR"
    | "EDITOR"
    | "COMPOSER"
    | "PRODUCER_USSR"
    | "HIMSELF"
    | "HERSELF"
    | "HRONO_TITR_MALE"
    | "HRONO_TITR_FEMALE"
    | "TRANSLATOR"
    | "DIRECTOR"
    | "DESIGN"
    | "PRODUCER"
    | "ACTOR"
    | "VOICE_DIRECTOR"
    | "UNKNOWN";
}

export interface PersonByNameResponseItems {
  /** @example 66539 */
  kinopoiskId?: number;
  /** @example "10096" */
  webUrl?: string;
  /** @example "Винс Гиллиган" */
  nameRu?: string | null;
  /** @example "Vince Gilligan" */
  nameEn?: string | null;
  /** @example "MALE" */
  sex?: "MALE" | "FEMALE" | "UNKNOWN" | null;
  /** @example "https://kinopoiskapiunofficial.tech/images/actor_posters/kp/10096.jpg" */
  posterUrl?: string;
}

export interface ImageResponseItems {
  /** @example "https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/2924f6c4-4ea0-4a1d-9a48-f29577172b27/orig" */
  imageUrl?: string;
  /** @example "https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/2924f6c4-4ea0-4a1d-9a48-f29577172b27/300x" */
  previewUrl?: string;
}

export interface VideoResponseItems {
  /** @example "https://www.youtube.com/watch?v=gbcVZgO4n4E" */
  url?: string;
  /** @example "Мстители: Финал – официальный трейлер (16+)" */
  name?: string;
  /** @example "YOUTUBE" */
  site?: "YOUTUBE" | "KINOPOISK_WIDGET" | "YANDEX_DISK" | "UNKNOWN";
}

export interface KinopoiskUserVoteResponseItems {
  /** @example 263531 */
  kinopoiskId?: number;
  /** @example "Мстители" */
  nameRu?: string | null;
  /** @example "The Avengers" */
  nameEn?: string | null;
  /** @example "The Avengers" */
  nameOriginal?: string | null;
  countries?: Country[];
  genres?: Genre[];
  /** @example 7.9 */
  ratingKinopoisk?: number | null;
  /** @example 7.9 */
  ratingImbd?: number | null;
  /** @example "2012" */
  year?: string | null;
  /** @example "FILM" */
  type?: "FILM" | "TV_SHOW" | "VIDEO" | "MINI_SERIES" | "TV_SERIES" | "UNKNOWN";
  /** @example "http://kinopoiskapiunofficial.tech/images/posters/kp/263531.jpg" */
  posterUrl?: string;
  /** @example "https://kinopoiskapiunofficial.tech/images/posters/kp_small/301.jpg" */
  posterUrlPreview?: string;
  /** @example 7 */
  userRating?: number;
}

export interface ApiKeyResponseTotalQuota {
  /** @example 1000 */
  value: number;
  /** @example 2 */
  used: number;
}

export interface ApiKeyResponseDailyQuota {
  /** @example 500 */
  value: number;
  /** @example 2 */
  used: number;
}

export interface MediaPostsResponseItems {
  /** @example 4008943 */
  kinopoiskId?: number;
  /** @example "https://avatars.mds.yandex.net/get-kinopoisk-post-thumb/1348084/a879121a01ae7416afac04e2061521d5/orig" */
  imageUrl?: string;
  /** @example "«Общество снега»: кино о голодающих в Андах регбистах, которое претендует на «Оскар»" */
  title?: string;
  /** @example "«Общество снега» на Netflix — драма выживания, претендующая на «Оскар». Это история уругвайских регбистов, попавших в авиакатастрофу и оказавшихся в заснеженных горах. Рассказываем, чем же они там питались." */
  description?: string;
  /** @example "https://www.kinopoisk.ru/api/webview/post/4008943" */
  url?: string;
  /** @example "2024-01-09T12:35:22" */
  publishedAt?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://kinopoiskapiunofficial.tech";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Kinopoisk Unofficial API
 * @version 2.0.1
 * @baseUrl https://kinopoiskapiunofficial.tech
 * @contact Support <support@kinopoiskapiunofficial.tech>
 *
 * Kinopoisk Unofficial API предоставляет доступ к данным сайта https://www.kinopoisk.ru. Для доступа вы должны получить <b>токен</b>, который будет доступен после регистрации на <a href="https://kinopoiskapiunofficial.tech">https://kinopoiskapiunofficial.tech</a> </br> <b>Ограничения:</b>  лимитов на общее кол-во описаны тут https://kinopoiskapiunofficial.tech/rates. Так же есть лимиты на кол-во запросов в секунду. </br> Каждый пользователь имеет ограничение в <b>20 req/sec</b>. </br> <b>Некоторые</b> эндпоинты имеют свои собственные ограничения, они указаны в описании для статуса <b>429</b>. </br>
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Данный эндпоинт возвращает базовые данные о фильме. Поле <b>lastSync</b> показывает дату последнего обновления данных.
     *
     * @tags films
     * @name V22FilmsDetail
     * @summary получить данные о фильме по kinopoisk id
     * @request GET:/api/v2.2/films/{id}
     * @secure
     */
    v22FilmsDetail: (id: number, params: RequestParams = {}) =>
      this.request<Film, void>({
        path: `/api/v2.2/films/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Данный эндпоинт возвращает данные о сезонах для сериала.
     *
     * @tags films
     * @name V22FilmsSeasonsDetail
     * @summary получить данные о сезонах для сериала по kinopoisk film id
     * @request GET:/api/v2.2/films/{id}/seasons
     * @secure
     */
    v22FilmsSeasonsDetail: (id: number, params: RequestParams = {}) =>
      this.request<SeasonResponse, void>({
        path: `/api/v2.2/films/${id}/seasons`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Данный эндпоинт возвращает список фактов и ошибок в фильме. <br> type - <b>FACT</b>, обозначает интересный факт о фильме. <br> type - <b>BLOOPER</b>, обозначает ошибку в фильме.
     *
     * @tags films
     * @name V22FilmsFactsDetail
     * @summary получить данные о фактах и ошибках в фильме по kinopoisk film id
     * @request GET:/api/v2.2/films/{id}/facts
     * @secure
     */
    v22FilmsFactsDetail: (id: number, params: RequestParams = {}) =>
      this.request<FactResponse, void>({
        path: `/api/v2.2/films/${id}/facts`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Данный эндпоинт возвращает данные о прокате в разных странах.
     *
     * @tags films
     * @name V22FilmsDistributionsDetail
     * @summary получить данные о прокате фильма по kinopoisk film id
     * @request GET:/api/v2.2/films/{id}/distributions
     * @secure
     */
    v22FilmsDistributionsDetail: (id: number, params: RequestParams = {}) =>
      this.request<DistributionResponse, void>({
        path: `/api/v2.2/films/${id}/distributions`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Данный эндпоинт возвращает данные о бюджете и сборах.
     *
     * @tags films
     * @name V22FilmsBoxOfficeDetail
     * @summary получить данные о бюджете и сборах фильма по kinopoisk film id
     * @request GET:/api/v2.2/films/{id}/box_office
     * @secure
     */
    v22FilmsBoxOfficeDetail: (id: number, params: RequestParams = {}) =>
      this.request<BoxOfficeResponse, void>({
        path: `/api/v2.2/films/${id}/box_office`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Данный эндпоинт возвращает данные о наградах и премиях фильма.
     *
     * @tags films
     * @name V22FilmsAwardsDetail
     * @summary получить данные о наградах фильма по kinopoisk film id
     * @request GET:/api/v2.2/films/{id}/awards
     * @secure
     */
    v22FilmsAwardsDetail: (id: number, params: RequestParams = {}) =>
      this.request<AwardResponse, void>({
        path: `/api/v2.2/films/${id}/awards`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Данный эндпоинт возвращает трейлеры,тизеры,видео для фильма по kinopoisk film id. В данный момент доступно три site:  <br/> <ul><li>YOUTUBE - в этом случае <b>url</b> это просто ссылка на youtube видео.</li><li>YANDEX_DISK - в этом случае <b>url</b> это ссылка на yandex disk.</li><li>KINOPOISK_WIDGET - в этом случае <b>url</b> это ссылка на кинопоиск виджет. Например https://widgets.kinopoisk.ru/discovery/trailer/123573?onlyPlayer=1&autoplay=1&cover=1. Если вы хотите вставить этот виджет на вашу страницу, вы можете сделать следующее:  <br/><br/>&lt;script src=&quot;https://unpkg.com/@ungap/custom-elements-builtin&quot;&gt;&lt;/script&gt;<br/>&lt;script type=&quot;module&quot; src=&quot;https://unpkg.com/x-frame-bypass&quot;&gt;&lt;/script&gt;<br/>&lt;iframe is=&quot;x-frame-bypass&quot; src=&quot;https://widgets.kinopoisk.ru/discovery/trailer/167560?onlyPlayer=1&amp;autoplay=1&amp;cover=1&quot; width=&quot;500&quot; height=&quot;500&quot;&gt;&lt;/iframe&gt;</li></ul>
     *
     * @tags films
     * @name V22FilmsVideosDetail
     * @summary получить трейлеры,тизеры,видео для фильма по kinopoisk film id
     * @request GET:/api/v2.2/films/{id}/videos
     * @secure
     */
    v22FilmsVideosDetail: (id: number, params: RequestParams = {}) =>
      this.request<VideoResponse, void>({
        path: `/api/v2.2/films/${id}/videos`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags films
     * @name V22FilmsSimilarsDetail
     * @summary получить список похожих фильмов по kinopoisk film id
     * @request GET:/api/v2.2/films/{id}/similars
     * @secure
     */
    v22FilmsSimilarsDetail: (id: number, params: RequestParams = {}) =>
      this.request<RelatedFilmResponse, void>({
        path: `/api/v2.2/films/${id}/similars`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Данный эндпоинт возвращает изображения связанные с фильмом с пагинацией. Каждая страница содержит <b>не более чем 20 фильмов</b>.</br> Доступные изображения:</br> <ul> <li>STILL - кадры</li> <li>SHOOTING - изображения со съемок</li> <li>POSTER - постеры</li> <li>FAN_ART - фан-арты</li> <li>PROMO - промо</li> <li>CONCEPT - концепт-арты</li> <li>WALLPAPER - обои</li> <li>COVER - обложки</li> <li>SCREENSHOT - скриншоты</li> </ul>
     *
     * @tags films
     * @name V22FilmsImagesDetail
     * @summary получить изображения(кадры, постеры, фан-арты, обои и т.д.) связанные с фильмом по kinopoisk film id
     * @request GET:/api/v2.2/films/{id}/images
     * @secure
     */
    v22FilmsImagesDetail: (
      id: number,
      query?: {
        /**
         * тип изображения
         * @default "STILL"
         */
        type?: "STILL" | "SHOOTING" | "POSTER" | "FAN_ART" | "PROMO" | "CONCEPT" | "WALLPAPER" | "COVER" | "SCREENSHOT";
        /**
         * номер страницы
         * @min 1
         * @max 20
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ImageResponse, void>({
        path: `/api/v2.2/films/${id}/images`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает список рецензии зрителей с пагинацией. Каждая страница содержит не более чем 20 рецензий.
     *
     * @tags films
     * @name V22FilmsReviewsDetail
     * @summary получить список рецензии зрителей по kinopoisk film id
     * @request GET:/api/v2.2/films/{id}/reviews
     * @secure
     */
    v22FilmsReviewsDetail: (
      id: number,
      query?: {
        /**
         * номер страницы
         * @default 1
         */
        page?: number;
        /**
         * тип сортировки
         * @default "DATE_DESC"
         */
        order?:
          | "DATE_ASC"
          | "DATE_DESC"
          | "USER_POSITIVE_RATING_ASC"
          | "USER_POSITIVE_RATING_DESC"
          | "USER_NEGATIVE_RATING_ASC"
          | "USER_NEGATIVE_RATING_DESC";
      },
      params: RequestParams = {},
    ) =>
      this.request<ReviewResponse, void>({
        path: `/api/v2.2/films/${id}/reviews`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает список сайтов с пагинацией. Каждая страница содержит не более чем 20 рецензий.
     *
     * @tags films
     * @name V22FilmsExternalSourcesDetail
     * @summary получить список сайтов, где можно посмотреть фильм по kinopoisk film id
     * @request GET:/api/v2.2/films/{id}/external_sources
     * @secure
     */
    v22FilmsExternalSourcesDetail: (
      id: number,
      query?: {
        /**
         * номер страницы
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ExternalSourceResponse, void>({
        path: `/api/v2.2/films/${id}/external_sources`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает список фильмов с пагинацией. Каждая страница содержит не более чем 20 фильмов.
     *
     * @tags films
     * @name V22FilmsCollectionsList
     * @summary получить список фильмов из различных топов или коллекций. Например https://www.kinopoisk.ru/top/lists/58/
     * @request GET:/api/v2.2/films/collections
     * @secure
     */
    v22FilmsCollectionsList: (
      query?: {
        /**
         * тип топа или коллекции
         * @default "TOP_POPULAR_ALL"
         */
        type?:
          | "TOP_POPULAR_ALL"
          | "TOP_POPULAR_MOVIES"
          | "TOP_250_TV_SHOWS"
          | "TOP_250_MOVIES"
          | "VAMPIRE_THEME"
          | "COMICS_THEME"
          | "CLOSES_RELEASES"
          | "FAMILY"
          | "OSKAR_WINNERS_2021"
          | "LOVE_THEME"
          | "ZOMBIE_THEME"
          | "CATASTROPHE_THEME"
          | "KIDS_ANIMATION_THEME"
          | "POPULAR_SERIES";
        /**
         * номер страницы
         * @min 1
         * @max 50
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<FilmCollectionResponse, void>({
        path: `/api/v2.2/films/collections`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Данный эндпоинт возвращает список кинопремьер. Например https://www.kinopoisk.ru/premiere/
     *
     * @tags films
     * @name V22FilmsPremieresList
     * @summary получить список кинопремьер
     * @request GET:/api/v2.2/films/premieres
     * @secure
     */
    v22FilmsPremieresList: (
      query: {
        /** год релиза */
        year: number;
        /** месяц релиза */
        month:
          | "JANUARY"
          | "FEBRUARY"
          | "MARCH"
          | "APRIL"
          | "MAY"
          | "JUNE"
          | "JULY"
          | "AUGUST"
          | "SEPTEMBER"
          | "OCTOBER"
          | "NOVEMBER"
          | "DECEMBER";
      },
      params: RequestParams = {},
    ) =>
      this.request<PremiereResponse, void>({
        path: `/api/v2.2/films/premieres`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает список id стран и жанров, которые могут быть использованы в /api/v2.2/films
     *
     * @tags films
     * @name V22FilmsFiltersList
     * @summary получить id стран и жанров для использования в /api/v2.2/films
     * @request GET:/api/v2.2/films/filters
     * @secure
     */
    v22FilmsFiltersList: (params: RequestParams = {}) =>
      this.request<FiltersResponse, void>({
        path: `/api/v2.2/films/filters`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает список фильмов с пагинацией. Каждая страница содержит не более чем 20 фильмов. Данный эндпоинт не возращает более 400 фильмов. <i>Используй /api/v2.2/films/filters чтобы получить id стран и жанров.</i>
     *
     * @tags films
     * @name V22FilmsList
     * @summary получить список фильмов по различным фильтрам
     * @request GET:/api/v2.2/films
     * @secure
     */
    v22FilmsList: (
      query?: {
        /** список id стран разделенные запятой. Например <i>countries=1,2,3</i>. На данный момент можно указать не более одной страны. */
        countries?: number[];
        /** список id жанров разделенные запятой. Например <i>genres=1,2,3</i>. На данный момент можно указать не более одного жанра. */
        genres?: number[];
        /**
         * сортировка
         * @default "RATING"
         */
        order?: "RATING" | "NUM_VOTE" | "YEAR";
        /**
         * тип фильма
         * @default "ALL"
         */
        type?: "FILM" | "TV_SHOW" | "TV_SERIES" | "MINI_SERIES" | "ALL";
        /**
         * минимальный рейтинг
         * @default 0
         */
        ratingFrom?: number;
        /**
         * максимальный рейтинг
         * @default 10
         */
        ratingTo?: number;
        /**
         * минимальный год
         * @default 1000
         */
        yearFrom?: number;
        /**
         * максимальный год
         * @default 3000
         */
        yearTo?: number;
        /** imdb id */
        imdbId?: string;
        /** ключевое слово, которое встречается в названии фильма */
        keyword?: string;
        /**
         * номер страницы
         * @min 1
         * @max 20
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<FilmSearchByFiltersResponse, void>({
        path: `/api/v2.2/films`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description tbd
     *
     * @tags films
     * @name V21FilmsSequelsAndPrequelsDetail
     * @summary получить сиквелы и приквелы для фильма по kinopoisk film id
     * @request GET:/api/v2.1/films/{id}/sequels_and_prequels
     * @secure
     */
    v21FilmsSequelsAndPrequelsDetail: (id: number, params: RequestParams = {}) =>
      this.request<FilmSequelsAndPrequelsResponse[], void>({
        path: `/api/v2.1/films/${id}/sequels_and_prequels`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает список фильмов с пагинацией. Каждая страница содержит не более чем 20 фильмов.
     *
     * @tags films
     * @name V21FilmsSearchByKeywordList
     * @summary получить список фильмов по ключевым словам
     * @request GET:/api/v2.1/films/search-by-keyword
     * @secure
     */
    v21FilmsSearchByKeywordList: (
      query: {
        /** ключивые слова для поиска */
        keyword: string;
        /**
         * номер страницы
         * @min 1
         * @max 20
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<FilmSearchResponse, void>({
        path: `/api/v2.1/films/search-by-keyword`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Данный эндпоинт возвращает список цифровых релизов. Например https://www.kinopoisk.ru/comingsoon/digital/
     *
     * @tags films
     * @name V21FilmsReleasesList
     * @summary получить список цифровых релизов
     * @request GET:/api/v2.1/films/releases
     * @secure
     */
    v21FilmsReleasesList: (
      query: {
        /** год релиза */
        year: number;
        /** месяц релиза */
        month:
          | "JANUARY"
          | "FEBRUARY"
          | "MARCH"
          | "APRIL"
          | "MAY"
          | "JUNE"
          | "JULY"
          | "AUGUST"
          | "SEPTEMBER"
          | "OCTOBER"
          | "NOVEMBER"
          | "DECEMBER";
        /**
         * номер страницы
         * @min 1
         * @max 20
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DigitalReleaseResponse, void>({
        path: `/api/v2.1/films/releases`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags staff
     * @name V1StaffList
     * @summary получить данные об актерах, режисерах и т.д. по kinopoisk film id
     * @request GET:/api/v1/staff
     * @secure
     */
    v1StaffList: (
      query: {
        /**
         * kinopoisk film id
         * @min 1
         * @max 7000000
         */
        filmId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<StaffResponse[], void>({
        path: `/api/v1/staff`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags staff
     * @name V1StaffDetail
     * @summary получить данные о конкретном человеке по kinopoisk person id
     * @request GET:/api/v1/staff/{id}
     * @secure
     */
    v1StaffDetail: (id: number, params: RequestParams = {}) =>
      this.request<PersonResponse, void>({
        path: `/api/v1/staff/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Одна страница может содержать до 50 элементов в items.
     *
     * @tags persons
     * @name V1PersonsList
     * @summary поиск актеров, режиссеров и т.д. по имени
     * @request GET:/api/v1/persons
     * @secure
     */
    v1PersonsList: (
      query: {
        /** имя человека */
        name: string;
        /**
         * номер страницы
         * @min 1
         * @max 2
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PersonByNameResponse, void>({
        path: `/api/v1/persons`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Одна страница может содержать до 20 элементов в items. Доступны не все оценки пользователя, а примерно 1500 последних
     *
     * @tags kp_users
     * @name V1KpUsersVotesDetail
     * @summary получить данные об оценках пользователя
     * @request GET:/api/v1/kp_users/{id}/votes
     * @secure
     */
    v1KpUsersVotesDetail: (
      id: number,
      query?: {
        /**
         * номер страницы
         * @min 1
         * @max 100
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<KinopoiskUserVoteResponse, void>({
        path: `/api/v1/kp_users/${id}/votes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api_keys
     * @name V1ApiKeysDetail
     * @summary получить данные об api key
     * @request GET:/api/v1/api_keys/{apiKey}
     * @secure
     */
    v1ApiKeysDetail: (apiKey: string, params: RequestParams = {}) =>
      this.request<ApiKeyResponse, void>({
        path: `/api/v1/api_keys/${apiKey}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Одна страница может содержать до 20 элементов в items.
     *
     * @tags media_posts
     * @name V1MediaPostsList
     * @summary получить медиа новости с сайта кинопоиск
     * @request GET:/api/v1/media_posts
     * @secure
     */
    v1MediaPostsList: (
      query?: {
        /**
         * номер страницы
         * @min 1
         * @max 50
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MediaPostsResponse, void>({
        path: `/api/v1/media_posts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
