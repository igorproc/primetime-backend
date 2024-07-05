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

export interface ExternalId {
  /**
   * ID из kinopoisk HD
   * @example "48e8d0acb0f62d8585101798eaeceec5"
   */
  kpHD?: string | null;
  /** @example "tt0232500" */
  imdb?: string | null;
  /** @example 9799 */
  tmdb?: number | null;
}

export interface Name {
  name?: string;
  language?: string | null;
  type?: string | null;
}

export interface FactInMovie {
  value: string;
  type?: string | null;
  spoiler?: boolean | null;
}

export interface Rating {
  /**
   * Рейтинг кинопоиска
   * @example 6.2
   */
  kp?: number | null;
  /**
   * Рейтинг IMDB
   * @example 8.4
   */
  imdb?: number | null;
  /**
   * Рейтинг TMDB
   * @example 3.2
   */
  tmdb?: number | null;
  /**
   * Рейтинг кинокритиков
   * @example 10
   */
  filmCritics?: number | null;
  /**
   * Рейтинг кинокритиков из РФ
   * @example 5.1
   */
  russianFilmCritics?: number | null;
  /**
   * Рейтинг основанный на ожиданиях пользователей
   * @example 6.1
   */
  await?: number | null;
}

export interface Votes {
  /** @example 60000 */
  kp?: string | null;
  /** @example 50000 */
  imdb?: number | null;
  /** @example 10000 */
  tmdb?: number | null;
  /**
   * Количество голосов кинокритиков
   * @example 10000
   */
  filmCritics?: number | null;
  /**
   * Количество голосов кинокритиков из РФ
   * @example 4000
   */
  russianFilmCritics?: number | null;
  /**
   * Количество ожидающих выхода
   * @example 34000
   */
  await?: number | null;
}

export interface Logo {
  /** Чтобы найти фильмы с этим полем, используйте: `!null` */
  url?: string | null;
}

export interface ShortImage {
  /** Чтобы найти фильмы с этим полем, используйте: `!null` */
  url?: string | null;
  /** Чтобы найти фильмы с этим полем, используйте: `!null` */
  previewUrl?: string | null;
}

export interface Video {
  /**
   * Url трейлера
   * @example "https://www.youtube.com/embed/ZsJz2TJAPjw"
   */
  url?: string | null;
  /** @example "Official Trailer" */
  name?: string | null;
  /** @example "youtube" */
  site?: string | null;
  size?: number | null;
  /** @example "TRAILER" */
  type?: string | null;
}

export interface VideoTypes {
  trailers?: Video[] | null;
}

export interface ItemName {
  name?: string;
}

export interface PersonInMovie {
  /**
   * Id персоны с кинопоиска
   * @example 6317
   */
  id: number;
  /** @example "https://st.kp.yandex.net/images/actor_iphone/iphone360_6317.jpg" */
  photo?: string | null;
  /** @example "Пол Уокер" */
  name?: string | null;
  /** @example "Paul Walker" */
  enName?: string | null;
  description?: string | null;
  profession?: string | null;
  enProfession?: string | null;
}

export interface ReviewInfo {
  count?: number | null;
  positiveCount?: number | null;
  percentage?: string | null;
}

export interface SeasonInfo {
  number?: number | null;
  episodesCount?: number | null;
}

export interface CurrencyValue {
  /**
   * Сумма
   * @example 207283
   */
  value?: number | null;
  /**
   * Валюта
   * @example "€"
   */
  currency?: string | null;
}

export interface Fees {
  world?: CurrencyValue;
  russia?: CurrencyValue;
  usa?: CurrencyValue;
}

export interface Premiere {
  /** @example "США" */
  country?: string | null;
  /**
   * Для более релевантного поиска, используйте интервал дат 01.02.2022-01.02.2023
   * @format date-time
   * @example "2023-02-25T02:44:39.359Z"
   */
  world?: string | null;
  /**
   * Для более релевантного поиска, используйте интервал дат 01.02.2022-01.02.2023
   * @format date-time
   * @example "2023-02-25T02:44:39.359Z"
   */
  russia?: string | null;
  digital?: string | null;
  /**
   * Для более релевантного поиска, используйте интервал дат 01.02.2022-01.02.2023
   * @format date-time
   * @example "2023-02-25T02:44:39.359Z"
   */
  cinema?: string | null;
  bluray?: string | null;
  dvd?: string | null;
}

export interface LinkedMovieV14 {
  id: number;
  name?: string | null;
  enName?: string | null;
  alternativeName?: string | null;
  type?: string | null;
  poster?: ShortImage | null;
  rating?: Rating | null;
  /** @example 2021 */
  year?: number | null;
}

export interface WatchabilityItem {
  name?: string | null;
  logo: Logo;
  url: string;
}

export interface Watchability {
  items?: WatchabilityItem[];
}

export interface YearRange {
  /**
   * Год начала
   * @example 2022
   */
  start?: number | null;
  /**
   * Год окончания
   * @example 2023
   */
  end?: number | null;
}

export interface Audience {
  /**
   * Количество просмотров в кино
   * @example 1000
   */
  count?: number | null;
  /**
   * Страна в которой проходил показ
   * @example "Россия"
   */
  country?: string | null;
}

export interface NetworkItemV14 {
  /** @example "Netflix" */
  name?: string | null;
  logo?: Logo | null;
}

export interface NetworksV14 {
  items?: NetworkItemV14[] | null;
}

export interface MovieDtoV14 {
  /**
   * Id фильма с кинопоиска
   * @example 666
   */
  id?: number | null;
  externalId?: ExternalId | null;
  /** @example "Человек паук" */
  name?: string | null;
  /** @example "Spider man" */
  alternativeName?: string | null;
  /** @example "Spider man" */
  enName?: string | null;
  names?: Name[] | null;
  /**
   * Тип тайтла. Доступны: movie | tv-series | cartoon | anime | animated-series | tv-show
   * @example "movie"
   */
  type?: string | null;
  /**
   * Тип тайтла в числовом обозначении. Доступны: 1 (movie) | 2 (tv-series) | 3 (cartoon) | 4 (anime) | 5 (animated-series) | 6 (tv-show)
   * @example 1
   */
  typeNumber?: number | null;
  /**
   * Год премьеры. При поиске по этому полю, можно использовать интервалы 1860-2030
   * @example 2023
   */
  year?: number | null;
  /** Описание тайтла */
  description?: string | null;
  /** Сокращенное описание */
  shortDescription?: string | null;
  /** Слоган */
  slogan?: string | null;
  /**
   * Статус релиза тайтла. Доступные значения: filming | pre-production | completed | announced | post-production
   * @example "completed"
   */
  status?: string | null;
  facts?: FactInMovie[] | null;
  rating?: Rating;
  votes?: Votes;
  /**
   * Продолжительность фильма
   * @example 120
   */
  movieLength?: number | null;
  /**
   * Возрастной рейтинг по MPAA
   * @example "pg13"
   */
  ratingMpaa?: string | null;
  /**
   * Возрастной рейтинг
   * @example "16"
   */
  ageRating?: number | null;
  logo?: Logo;
  poster?: ShortImage;
  backdrop?: ShortImage;
  videos?: VideoTypes;
  genres?: ItemName[];
  countries?: ItemName[];
  persons?: PersonInMovie[];
  reviewInfo?: ReviewInfo;
  seasonsInfo?: SeasonInfo[];
  budget?: CurrencyValue;
  fees?: Fees;
  premiere?: Premiere;
  similarMovies?: LinkedMovieV14[] | null;
  sequelsAndPrequels?: LinkedMovieV14[] | null;
  watchability?: Watchability;
  releaseYears?: YearRange[];
  /**
   * Позиция тайтла в топ 10. Чтобы найти фильмы участвующие в рейтинге используйте: `!null`
   * @example 1
   */
  top10?: number | null;
  /**
   * Позиция тайтла в топ 250. Чтобы найти фильмы участвующие в рейтинге используйте: `!null`
   * @example 200
   */
  top250?: number | null;
  /**
   * Признак того, что тайтл находится в прокате
   * @example true
   */
  ticketsOnSale?: boolean | null;
  /**
   * Продолжительность всех серий
   * @example 155
   */
  totalSeriesLength?: number | null;
  /**
   * Средняя продолжительность серии
   * @example 20
   */
  seriesLength?: number | null;
  /**
   * Признак сериала
   * @example true
   */
  isSeries?: boolean | null;
  audience?: Audience[] | null;
  /**
   * Список коллекций, в которых находится тайтл.
   * @example ["250 лучших сериалов"]
   */
  lists?: string[] | null;
  networks?: NetworksV14 | null;
  /** @format date-time */
  updatedAt?: string | null;
  /** @format date-time */
  createdAt?: string | null;
}

export interface UnauthorizedErrorResponseDto {
  /** @example 401 */
  statusCode: number;
  /** @example "В запросе не указан токен!" */
  message: string;
  /** @example "Unauthorized" */
  error: string;
}

export interface ForbiddenErrorResponseDto {
  /** @example 403 */
  statusCode: number;
  /** @example "Превышен дневной лимит!" */
  message: string;
  /** @example "Forbidden" */
  error: string;
}

export interface ErrorResponseDto {
  statusCode: number;
  message: string;
  error: string;
}

export interface MovieDocsResponseDtoV14 {
  docs: MovieDtoV14[];
  /** Общее количество результатов */
  total: number;
  /** Количество результатов на странице */
  limit: number;
  /** Текущая страница */
  page: number;
  /** Сколько страниц всего */
  pages: number;
}

export interface SearchMovieDtoV14 {
  id: number;
  name?: string | null;
  alternativeName?: string | null;
  enName?: string | null;
  type?: string | null;
  year?: number | null;
  description?: string | null;
  shortDescription?: string | null;
  movieLength?: number | null;
  names?: Name[] | null;
  externalId?: ExternalId | null;
  logo?: Logo | null;
  poster?: ShortImage | null;
  backdrop?: ShortImage | null;
  rating?: Rating | null;
  votes?: Votes | null;
  genres?: ItemName[] | null;
  countries?: ItemName[] | null;
  releaseYears?: YearRange[] | null;
  isSeries?: boolean | null;
  ticketsOnSale?: boolean | null;
  totalSeriesLength?: number | null;
  seriesLength?: number | null;
  ratingMpaa?: string | null;
  ageRating?: number | null;
  top10?: number | null;
  top250?: number | null;
  typeNumber?: number | null;
  status?: string | null;
}

export interface SearchMovieResponseDtoV14 {
  docs: SearchMovieDtoV14[];
  /** Общее количество результатов */
  total: number;
  /** Количество результатов на странице */
  limit: number;
  /** Текущая страница */
  page: number;
  /** Сколько страниц всего */
  pages: number;
}

export interface NominationAward {
  title?: string | null;
  year?: number | null;
}

export interface Nomination {
  award?: NominationAward | null;
  title?: string | null;
}

export interface MovieAward {
  nomination?: Nomination | null;
  winning?: boolean | null;
  /** @format date-time */
  updatedAt?: string | null;
  /** @format date-time */
  createdAt?: string | null;
  movieId?: number | null;
}

export interface MovieAwardDocsResponseDto {
  docs: MovieAward[];
  /** Общее количество результатов */
  total: number;
  /** Количество результатов на странице */
  limit: number;
  /** Текущая страница */
  page: number;
  /** Сколько страниц всего */
  pages: number;
}

export interface PossibleValueDto {
  /** Значение по которому нужно делать запрос в базу данных */
  name?: string | null;
  /** Вспомогательное значение */
  slug?: string | null;
}

export interface EpisodeV14 {
  number?: number;
  name?: string;
  enName?: string;
  /** @deprecated */
  date?: string;
  description?: string;
  still?: ShortImage;
  airDate?: string;
  enDescription?: string;
}

export interface SeasonV14 {
  movieId: number;
  number?: number;
  episodesCount?: number;
  episodes?: EpisodeV14[];
  poster?: ShortImage;
  name?: string;
  enName?: string;
  duration?: number;
  description?: string;
  enDescription?: string;
  airDate?: string;
  /** @format date-time */
  updatedAt?: string | null;
  /** @format date-time */
  createdAt?: string | null;
}

export interface SeasonDocsResponseDtoV14 {
  docs: SeasonV14[];
  /** Общее количество результатов */
  total: number;
  /** Количество результатов на странице */
  limit: number;
  /** Текущая страница */
  page: number;
  /** Сколько страниц всего */
  pages: number;
}

export interface Review {
  id: number;
  movieId: number;
  title?: string;
  type?: string;
  review?: string;
  date?: string;
  author?: string;
  userRating?: number;
  authorId: number;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  createdAt: string;
}

export interface ReviewDocsResponseDtoV14 {
  docs: Review[];
  /** Общее количество результатов */
  total: number;
  /** Количество результатов на странице */
  limit: number;
  /** Текущая страница */
  page: number;
  /** Сколько страниц всего */
  pages: number;
}

export interface BirthPlace {
  value?: string;
}

export interface DeathPlace {
  value?: string;
}

export interface Spouses {
  id: number;
  name?: string;
  divorced?: boolean;
  divorcedReason?: string;
  sex?: string;
  children?: number;
  relation?: string;
}

export interface Profession {
  value?: string;
}

export interface FactInPerson {
  value?: string;
}

export interface MovieInPerson {
  id: number;
  name?: string | null;
  alternativeName?: string | null;
  rating?: number | null;
  general?: boolean | null;
  description?: string | null;
  enProfession?: string | null;
}

export interface Person {
  id: number;
  name?: string | null;
  enName?: string | null;
  photo?: string | null;
  sex?: string | null;
  growth?: number | null;
  birthday?: string | null;
  death?: string | null;
  age?: number | null;
  birthPlace?: BirthPlace[];
  deathPlace?: DeathPlace[];
  spouses?: Spouses;
  countAwards?: number;
  profession?: Profession[];
  facts?: FactInPerson[];
  movies?: MovieInPerson[];
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  createdAt: string;
}

export interface PersonDocsResponseDtoV14 {
  docs: Person[];
  /** Общее количество результатов */
  total: number;
  /** Количество результатов на странице */
  limit: number;
  /** Текущая страница */
  page: number;
  /** Сколько страниц всего */
  pages: number;
}

export interface MeiliPersonEntityV14 {
  id: number;
  name?: string | null;
  enName?: string | null;
  photo?: string | null;
  sex?: string | null;
  growth?: number | null;
  birthday?: string | null;
  death?: string | null;
  age?: number | null;
  birthPlace?: BirthPlace[];
  deathPlace?: DeathPlace[];
  profession?: Profession[];
}

export interface SearchPersonResponseDtoV14 {
  docs: MeiliPersonEntityV14[];
  /** Общее количество результатов */
  total: number;
  /** Количество результатов на странице */
  limit: number;
  /** Текущая страница */
  page: number;
  /** Сколько страниц всего */
  pages: number;
}

export interface Movie {
  id: number;
  name?: string | null;
  rating?: number | null;
}

export interface PersonAward {
  nomination?: Nomination | null;
  winning?: boolean | null;
  /** @format date-time */
  updatedAt?: string | null;
  /** @format date-time */
  createdAt?: string | null;
  personId: number;
  movie?: Movie | null;
}

export interface PersonAwardDocsResponseDto {
  docs: PersonAward[];
  /** Общее количество результатов */
  total: number;
  /** Количество результатов на странице */
  limit: number;
  /** Текущая страница */
  page: number;
  /** Сколько страниц всего */
  pages: number;
}

export interface MovieFromStudio {
  id: number;
}

export interface Studio {
  id: string;
  subType?: string | null;
  title?: string | null;
  type?: "Производство" | "Спецэффекты" | "Прокат" | "Студия дубляжа";
  movies?: MovieFromStudio;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  createdAt: string;
}

export interface StudioDocsResponseDtoV14 {
  docs: Studio[];
  /** Общее количество результатов */
  total: number;
  /** Количество результатов на странице */
  limit: number;
  /** Текущая страница */
  page: number;
  /** Сколько страниц всего */
  pages: number;
}

export interface MovieFromKeyword {
  id: number;
}

export interface Keyword {
  id: number;
  title?: string | null;
  movies?: MovieFromKeyword;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  createdAt: string;
}

export interface KeywordDocsResponseDtoV14 {
  docs: Keyword[];
  /** Общее количество результатов */
  total: number;
  /** Количество результатов на странице */
  limit: number;
  /** Текущая страница */
  page: number;
  /** Сколько страниц всего */
  pages: number;
}

export interface Image {
  movieId: number;
  type?: string;
  language?: string;
  url?: string;
  previewUrl?: string;
  height?: number;
  width?: number;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  createdAt: string;
}

export interface ImageDocsResponseDtoV14 {
  docs: Image[];
  /** Общее количество результатов */
  total: number;
  /** Количество результатов на странице */
  limit: number;
  /** Текущая страница */
  page: number;
  /** Сколько страниц всего */
  pages: number;
}

export interface List {
  category?: string | null;
  slug?: string | null;
  moviesCount?: number | null;
  cover?: ShortImage | null;
  name: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  createdAt: string;
}

export interface ListDocsResponseDtoV14 {
  docs: List[];
  /** Общее количество результатов */
  total: number;
  /** Количество результатов на странице */
  limit: number;
  /** Текущая страница */
  page: number;
  /** Сколько страниц всего */
  pages: number;
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
  public baseUrl: string = "https://api.kinopoisk.dev";
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
 * @title Документация для неофициального API кинопоиска (kinopoisk.dev).
 * @version 1.4
 * @baseUrl https://api.kinopoisk.dev
 * @contact
 *
 *
 * <!-- Yandex.Metrika counter -->
 * <div><img src="https://mc.yandex.ru/watch/62307766" style="position:absolute; left:-9999px;" alt="" /></div>
 * <!-- /Yandex.Metrika counter -->
 * <p>Через этот API вы можете получить практически все данные из кинопоиска. Больше информации вы можете получить изучив эту документацию.</p>
 * <h2>Как работать с документацией?</h2>
 * <p>
 * Для начала работы с API вам необходимо получить токен, который вы можете получить в боте <a href="https://t.me/kinopoiskdev_bot">@kinopoiskdev_bot</a>. <br />
 * После получения токена, вам необходимо авторизоваться в документации, для этого нажмите на кнопку <strong>Authorize</strong> и введите токен в поле <strong>Value</strong>.<br />
 * После авторизации вы можете отправлять запросы к API, для этого нажмите на кнопку <strong>Try it out</strong> и заполните необходимые поля для составления нужного фильтра.<br />
 * После заполнения полей нажмите на кнопку <strong>Execute</strong> и получите ответ от API и пример запроса.
 * </p>
 * <h3>Как работать с API?</h3>
 * <p>
 * API работает по принципу REST, все запросы отправляются на адрес <code>https://api.kinopoisk.dev/</code> с указанием версии API и необходимого ресурса.<br />
 * Все запросы к API кинопоиска должны содержать заголовок <code>X-API-KEY</code> с вашим токеном. В противном случае вы получите ошибку <code>401</code>.<br />
 * При составлении запроса учитывайте, что все параметры должны быть в <code>query</code> и <code>path</code>. В зависимости от метода который вы используете.
 * Например, вы хотите получить список фильмов за 2023 год в жанре <code>криминал</code>, тогда ваш запрос будет выглядеть так: <code>https://api.kinopoisk.dev/v1.4/movie?year=2023&genres.name=криминал</code>.
 * Или вы хотите получить список фильмов с рейтингом выше 8, тогда ваш запрос будет выглядеть так: <code>https://api.kinopoisk.dev/v1.4/movie?rating.imdb=8-10</code>.
 * Документация kinopoisk api может помочь вам составить нужный запрос, для этого воспользуйтесь ее конструктором.
 * </p>
 * <h3>Особенности синтекса query параметров</h3>
 * <p>
 * Ключи в query параметрах имеют разные типы значений. В зависимости от типа значения, вы можете использовать разные операторы для фильтрации для поиска максимально релевантного фильма, сериала и т.д. в базе. <br />
 * Поля с типом <code>Number</code> могут принимать значения в форматах: <code>rating.kp=1-10</code>, <code>rating.kp=1</code>, <code>year=2022&year=2023</code>. <br />
 * Поля с типом <code>Date</code> могут принимать значения в форматах: <code>premiere.russia=dd.mm.yyyy-dd.mm.yyyy</code>, <code>premiere.russia=dd.mm.yyyy</code>. <br />
 * Поля с типом <code>String</code> могут принимать значения в форматах: <code>genres.name=драма</code>, <code>genres.name=криминал</code>, <code>genres.name=криминал&genres.name=драма</code> <br/>
 * Поля с типом <code>Boolean</code> могут принимать значения в форматах: <code>isSeries=true</code>, <code>isSeries=false</code>. <br />
 * Параметры жанров и стран могут принимать операторы <code>+</code> и <code>!</code>, для указания включаемых и исключаемых значений. Например, вы хотите получить список фильмов в жанрах <code>драма</code> и <code>криминал</code>, тогда ваш запрос будет выглядеть так: <code>genres.name=+драма&genres.name=+криминал</code>. Или вы хотите получить список фильмов с жанром <code>драма</code> и без жанра <code>криминал</code>, тогда ваш запрос будет выглядеть так: <code>genres.name=+драма&genres.name=!криминал</code>. <br />
 * </p>
 * <p>
 * Расшифровка операторов:
 * <ul>
 *   <li><code>!</code> - исключить. Этот символ нужно отправлять в кодированной форме <code>%21</code></li>
 *   <li><code>+</code> - включить. Этот символ нужно отправлять в кодированной форме <code>%2B</code></li>
 *   <li><code>-</code> - диапазон значений, используется в качестве разделителя.</li>
 * </ul>
 * </p>
 *
 * <p>По вопросам работы с API обращайтесь в чат <a href="https://t.me/+jeHPZVXiLPFhODJi">Developer Community KinopoiskDev</a>.</p>
 *
 * <p>Если вы обнаружили ошибку или у вас есть предложения по улучшению, создавайте issue на <a href="https://github.com/mdwitr0/kinopoiskdev">GitHub</a>.</p>
 *
 * <h3>Полезные ссылки:</h3>
 * <ul>
 *   <li><a href="https://kinopoiskdev.readme.io">Более удобная документация</a></li>
 *   <li><a href="https://github.com/OpenMovieDB/kinopoiskdev_client">JavaScript и TypeScript клиент (Устарел, ждет обновления)</a></li>
 *   <li><a href="https://github.com/odi1n/kinopoisk_dev">Python клиент (Устарел, ждет обновления)</a></li>
 *   <li><a href="/documentation-json">OpenAPI Specification (JSON)</a></li>
 *   <li><a href="/documentation-yaml">OpenAPI Specification (YAML)</a></li>
 * </ul>
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  v14 = {
    /**
     * @description Возвращает всю доступную информацию о сущности.
     *
     * @tags Фильмы, сериалы, и т.д.
     * @name MovieControllerFindOneV14
     * @summary Поиск по id
     * @request GET:/v1.4/movie/{id}
     * @secure
     */
    movieControllerFindOneV14: (id?: number | null, params: RequestParams = {}) =>
      this.request<MovieDtoV14, UnauthorizedErrorResponseDto | ForbiddenErrorResponseDto | ErrorResponseDto>({
        path: `/v1.4/movie/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Этот метод вернет список фильмов удовлетворяющих вашему запросу. <br> В ответе придут поля указанные в параметре `selectFields`. Если его не указать, то вернутся только дефолтные поля.
     *
     * @tags Фильмы, сериалы, и т.д.
     * @name MovieControllerFindManyByQueryV14
     * @summary Универсальный поиск с фильтрами
     * @request GET:/v1.4/movie
     * @secure
     */
    movieControllerFindManyByQueryV14: (
      query?: {
        /**
         * Номер страницы
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Количество элементов на странице
         * @min 1
         * @max 250
         * @default 10
         */
        limit?: number;
        /** Список полей требуемых в ответе из модели */
        selectFields?: (
          | "id"
          | "externalId"
          | "name"
          | "enName"
          | "alternativeName"
          | "names"
          | "description"
          | "shortDescription"
          | "slogan"
          | "type"
          | "typeNumber"
          | "isSeries"
          | "status"
          | "year"
          | "releaseYears"
          | "rating"
          | "ratingMpaa"
          | "ageRating"
          | "votes"
          | "seasonsInfo"
          | "budget"
          | "audience"
          | "movieLength"
          | "seriesLength"
          | "totalSeriesLength"
          | "genres"
          | "countries"
          | "poster"
          | "backdrop"
          | "logo"
          | "ticketsOnSale"
          | "videos"
          | "networks"
          | "persons"
          | "facts"
          | "fees"
          | "premiere"
          | "similarMovies"
          | "sequelsAndPrequels"
          | "watchability"
          | "lists"
          | "top10"
          | "top250"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Список полей которые не должны быть null или пусты */
        notNullFields?: (
          | "id"
          | "externalId.imdb"
          | "externalId.tmdb"
          | "externalId.kpHD"
          | "name"
          | "enName"
          | "alternativeName"
          | "names.name"
          | "description"
          | "shortDescription"
          | "slogan"
          | "type"
          | "typeNumber"
          | "isSeries"
          | "status"
          | "year"
          | "releaseYears.start"
          | "releaseYears.end"
          | "rating.kp"
          | "rating.imdb"
          | "rating.tmdb"
          | "rating.filmCritics"
          | "rating.russianFilmCritics"
          | "rating.await"
          | "ratingMpaa"
          | "ageRating"
          | "votes.kp"
          | "votes.imdb"
          | "votes.tmdb"
          | "votes.filmCritics"
          | "votes.russianFilmCritics"
          | "votes.await"
          | "budget.value"
          | "budget.currency"
          | "audience.count"
          | "audience.country"
          | "movieLength"
          | "seriesLength"
          | "totalSeriesLength"
          | "genres.name"
          | "countries.name"
          | "poster.url"
          | "backdrop.url"
          | "logo.url"
          | "ticketsOnSale"
          | "videos.trailers.url"
          | "videos.trailers.site"
          | "videos.trailers.name"
          | "networks.items.name"
          | "networks.items.logo.url"
          | "persons.id"
          | "persons.name"
          | "persons.enName"
          | "persons.photo"
          | "persons.description"
          | "persons.profession"
          | "persons.enProfession"
          | "facts.type"
          | "facts.value"
          | "facts.spoiler"
          | "fees.world.value"
          | "fees.usa.value"
          | "fees.russia.value"
          | "premiere.world"
          | "premiere.usa"
          | "premiere.russia"
          | "premiere.digital"
          | "premiere.dvd"
          | "premiere.bluRay"
          | "premiere.cinema"
          | "premiere.country"
          | "similarMovies.id"
          | "similarMovies.name"
          | "similarMovies.enName"
          | "similarMovies.alternativeName"
          | "similarMovies.poster.url"
          | "similarMovies.rating.kp"
          | "similarMovies.rating.imdb"
          | "similarMovies.rating.tmdb"
          | "similarMovies.year"
          | "sequelsAndPrequels.id"
          | "sequelsAndPrequels.name"
          | "sequelsAndPrequels.enName"
          | "sequelsAndPrequels.alternativeName"
          | "sequelsAndPrequels.poster.url"
          | "sequelsAndPrequels.rating.kp"
          | "sequelsAndPrequels.rating.imdb"
          | "sequelsAndPrequels.rating.tmdb"
          | "sequelsAndPrequels.year"
          | "watchability.items.name"
          | "watchability.items.url"
          | "watchability.items.logo.url"
          | "lists"
          | "top10"
          | "top250"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Сортировка по полям из модели */
        sortField?: (
          | "id"
          | "externalId.imdb"
          | "externalId.tmdb"
          | "externalId.kpHD"
          | "name"
          | "enName"
          | "alternativeName"
          | "names.name"
          | "description"
          | "shortDescription"
          | "slogan"
          | "type"
          | "typeNumber"
          | "isSeries"
          | "status"
          | "year"
          | "releaseYears.start"
          | "releaseYears.end"
          | "rating.kp"
          | "rating.imdb"
          | "rating.tmdb"
          | "rating.filmCritics"
          | "rating.russianFilmCritics"
          | "rating.await"
          | "ratingMpaa"
          | "ageRating"
          | "votes.kp"
          | "votes.imdb"
          | "votes.tmdb"
          | "votes.filmCritics"
          | "votes.russianFilmCritics"
          | "votes.await"
          | "budget.value"
          | "budget.currency"
          | "audience.count"
          | "audience.country"
          | "movieLength"
          | "seriesLength"
          | "totalSeriesLength"
          | "genres.name"
          | "countries.name"
          | "poster.url"
          | "backdrop.url"
          | "logo.url"
          | "ticketsOnSale"
          | "videos.trailers.url"
          | "videos.trailers.site"
          | "videos.trailers.name"
          | "networks.items.name"
          | "networks.items.logo.url"
          | "persons.id"
          | "persons.name"
          | "persons.enName"
          | "persons.photo"
          | "persons.description"
          | "persons.profession"
          | "persons.enProfession"
          | "facts.type"
          | "facts.value"
          | "facts.spoiler"
          | "fees.world.value"
          | "fees.usa.value"
          | "fees.russia.value"
          | "premiere.world"
          | "premiere.usa"
          | "premiere.russia"
          | "premiere.digital"
          | "premiere.dvd"
          | "premiere.bluRay"
          | "premiere.cinema"
          | "premiere.country"
          | "similarMovies.id"
          | "similarMovies.name"
          | "similarMovies.enName"
          | "similarMovies.alternativeName"
          | "similarMovies.poster.url"
          | "similarMovies.rating.kp"
          | "similarMovies.rating.imdb"
          | "similarMovies.rating.tmdb"
          | "similarMovies.year"
          | "sequelsAndPrequels.id"
          | "sequelsAndPrequels.name"
          | "sequelsAndPrequels.enName"
          | "sequelsAndPrequels.alternativeName"
          | "sequelsAndPrequels.poster.url"
          | "sequelsAndPrequels.rating.kp"
          | "sequelsAndPrequels.rating.imdb"
          | "sequelsAndPrequels.rating.tmdb"
          | "sequelsAndPrequels.year"
          | "watchability.items.name"
          | "watchability.items.url"
          | "watchability.items.logo.url"
          | "lists"
          | "top10"
          | "top250"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Тип сортировки применительно к полям из sortField (пример: `"1", "-1"`) */
        sortType?: string[];
        /** Поиск по ID KinoPoisk (пример: `"666", "555", "!666"`) */
        id?: string[] | null;
        /** Поиск по IMDB ID (пример: `"tt666", "tt555", "!tt666"`) */
        externalIdImdb?: string[] | null;
        /** Поиск по TMDB ID (пример: `666, 555, !666`) */
        externalIdTmdb?: number[] | null;
        /** Поиск по id KinoPoisk HD (пример: `"48e8d0acb0f62d8585101798eaeceec5", "!48e8d0acb0f62d8585101798eaeceec5"`) */
        externalIdKpHd?: string[] | null;
        /** Поиск по типу фильма (пример: `"movie", "tv-series", "!anime"`) */
        type?: ("movie" | "tv-series" | "cartoon" | "animated-series" | "anime")[] | null;
        /** Поиск по номеру типа фильма (пример: `1, 2, !3`). Список типов: 1 (movie), 2 (tv-series), 3 (cartoon), 4 (anime), 5 (animated-series). */
        typeNumber?: string[] | null;
        /** Поиск по индикатору сериала (пример: `true, false`) */
        isSeries?: string[] | null;
        /** Поиск по статусу фильма (пример: `"announced", "completed", "!filming"`) */
        status?: ("announced" | "completed" | "filming" | "post-production" | "pre-production")[] | null;
        /** Поиск по году (пример: `1874, 2050, !2020, 2020-2024`) */
        year?: string[] | null;
        /** Поиск по года начала релиза (пример: `1874, 2050, !2020, 2020-2024`) */
        releaseYearsStart?: string[] | null;
        /** Поиск по года окончания релиза (пример: `1874, 2050, !2020, 2020-2024`) */
        releaseYearsEnd?: string[] | null;
        /** Поиск по рейтингу Кинопоиск (пример: `7, 10, 7.2-10`) */
        ratingKp?: string[] | null;
        /** Поиск по рейтингу IMDB (пример: `7, 10, 7.2-10`) */
        ratingImdb?: string[] | null;
        /** Поиск по рейтингу TMDB (пример: `7, 10, 7.2-10`) */
        ratingTmdb?: string[] | null;
        /** Поиск по рейтингу MPAA (пример: `"G", "NC-17", "!R"`) */
        ratingMpaa?: string[] | null;
        /** Поиск по возрастному рейтингу (пример: `12, !18, 12-18`) */
        ageRating?: string[] | null;
        /** Поиск по количеству голосов на KP (пример: `1000-6666666`) */
        votesKp?: string[] | null;
        /** Поиск по количеству голосов на IMDB (пример: `1000-6666666`) */
        votesImdb?: string[] | null;
        /** Поиск по количеству голосов на TMDB (пример: `1000-6666666`) */
        votesTmdb?: string[] | null;
        /** Поиск по количеству голосов кинокритиков (пример: `1000-6666666`) */
        votesFilmCritics?: string[] | null;
        /** Поиск по количеству голосов кинокритиков из России (пример: `1000-6666666`) */
        votesRussianFilmCritics?: string[] | null;
        /** Поиск по количеству голосов ожидания на Кинопоиске (пример: `1000-6666666`) */
        votesAwait?: string[] | null;
        /** Поиск по бюджету фильма (пример: `1000-6666666`) */
        budgetValue?: string[] | null;
        /** Поиск по количеству аудитории (пример: `1000-6666666`) */
        audienceCount?: string[] | null;
        /** Поиск по продолжительности фильма (пример: `100-120`) */
        movieLength?: string[] | null;
        /** Поиск по всей продолжительности одной серии (пример: `20-60`) */
        seriesLength?: string[] | null;
        /** Поиск по всей продолжительности сериала (пример: `100-120`) */
        totalSeriesLength?: string[] | null;
        /** Поиск по жанрам (пример: `"драма", "комедия", "!мелодрама", "+ужасы"`) */
        genresName?: string[] | null;
        /** Поиск по странам (пример: `"США", "Россия", "!Франция" , "+Великобритания"`) */
        countriesName?: string[] | null;
        /** Поиск по наличию билетов в продаже (пример: `true, false`) */
        ticketsOnSale?: string[] | null;
        /** Поиск по сетям производства фильма (пример: `"HBO", "Netflix", "!Amazon"`) */
        networksItemsName?: string[] | null;
        /** Поиск по ID персон (пример: `666, 555, !666`) */
        personsId?: string[] | null;
        /** Поиск по профессиям персон (пример: `"актер", "режиссер", "!сценарист"`) */
        personsProfession?: string[] | null;
        /** Поиск по английским профессиям персон (пример: `"actor", "director", "!writer"`) */
        personsEnProfession?: string[] | null;
        /** Поиск по сборам в мире (пример: `1000-6666666`) */
        feesWorld?: string[] | null;
        /** Поиск по сборам в США (пример: `1000-6666666`) */
        feesUsa?: string[] | null;
        /** Поиск по сборам в России (пример: `1000-6666666`) */
        feesRussia?: string[] | null;
        /** Поиск по дате премьеры в мире (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        premiereWorld?: string[] | null;
        /** Поиск по дате премьеры в США (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        premiereUsa?: string[] | null;
        /** Поиск по дате премьеры в России (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        premiereRussia?: string[] | null;
        /** Поиск по дате премьеры в стриминговых сервисах (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        premiereDigital?: string[] | null;
        /** Поиск по дате премьеры в кинотеатрах (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        premiereCinema?: string[] | null;
        /** Поиск по стране премьеры (пример: `"США", "Россия", "!Франция" , "+Великобритания"`) */
        premiereCountry?: string[] | null;
        /** Поиск по ID KinoPoisk из списка похожих фильмов (пример: `666, 555, !666`) */
        similarMoviesId?: string[] | null;
        /** Поиск по ID KinoPoisk из списка сиквелов и преквелов (пример: `666, 555, !666`) */
        sequelsAndPrequelsId?: string[] | null;
        /** Поиск по доуступным платформам для просмотра (пример: `"ivi", "okko", "!megogo"`) */
        watchabilityItemsName?: string[] | null;
        /** Поиск по коллекциям из KinoPoisk (пример: `"top250", "top-100-indian-movies", "!top-100-movies"`) */
        lists?: string[] | null;
        /** Поиск по дате обновления в базе (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        updatedAt?: string[] | null;
        /** Поиск по дате добавления в базу (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        createdAt?: string[] | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<MovieDocsResponseDtoV14, any>({
        path: `/v1.4/movie`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Этот метод вернет список фильмов которые подходят под ваш запрос.
     *
     * @tags Фильмы, сериалы, и т.д.
     * @name MovieControllerSearchMovieV14
     * @summary Поиск фильмов по названию
     * @request GET:/v1.4/movie/search
     * @secure
     */
    movieControllerSearchMovieV14: (
      query: {
        /**
         * Страница выборки
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Количество элементов на странице
         * @min 1
         * @max 250
         * @default 10
         */
        limit?: number;
        /** Поисковый запрос */
        query: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<SearchMovieResponseDtoV14, any>({
        path: `/v1.4/movie/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Этот метод вернет рандомный тайтл из базы. Вы можете составить фильтр, чтобы получить рандомный тайтл по вашим критериям.
     *
     * @tags Фильмы, сериалы, и т.д.
     * @name MovieControllerGetRandomMovieV14
     * @summary Получить рандомный тайтл из базы
     * @request GET:/v1.4/movie/random
     * @secure
     */
    movieControllerGetRandomMovieV14: (
      query?: {
        /** Список полей которые не должны быть null или пусты */
        notNullFields?: (
          | "id"
          | "externalId.imdb"
          | "externalId.tmdb"
          | "externalId.kpHD"
          | "name"
          | "enName"
          | "alternativeName"
          | "names.name"
          | "description"
          | "shortDescription"
          | "slogan"
          | "type"
          | "typeNumber"
          | "isSeries"
          | "status"
          | "year"
          | "releaseYears.start"
          | "releaseYears.end"
          | "rating.kp"
          | "rating.imdb"
          | "rating.tmdb"
          | "rating.filmCritics"
          | "rating.russianFilmCritics"
          | "rating.await"
          | "ratingMpaa"
          | "ageRating"
          | "votes.kp"
          | "votes.imdb"
          | "votes.tmdb"
          | "votes.filmCritics"
          | "votes.russianFilmCritics"
          | "votes.await"
          | "budget.value"
          | "budget.currency"
          | "audience.count"
          | "audience.country"
          | "movieLength"
          | "seriesLength"
          | "totalSeriesLength"
          | "genres.name"
          | "countries.name"
          | "poster.url"
          | "backdrop.url"
          | "logo.url"
          | "ticketsOnSale"
          | "videos.trailers.url"
          | "videos.trailers.site"
          | "videos.trailers.name"
          | "networks.items.name"
          | "networks.items.logo.url"
          | "persons.id"
          | "persons.name"
          | "persons.enName"
          | "persons.photo"
          | "persons.description"
          | "persons.profession"
          | "persons.enProfession"
          | "facts.type"
          | "facts.value"
          | "facts.spoiler"
          | "fees.world.value"
          | "fees.usa.value"
          | "fees.russia.value"
          | "premiere.world"
          | "premiere.usa"
          | "premiere.russia"
          | "premiere.digital"
          | "premiere.dvd"
          | "premiere.bluRay"
          | "premiere.cinema"
          | "premiere.country"
          | "similarMovies.id"
          | "similarMovies.name"
          | "similarMovies.enName"
          | "similarMovies.alternativeName"
          | "similarMovies.poster.url"
          | "similarMovies.rating.kp"
          | "similarMovies.rating.imdb"
          | "similarMovies.rating.tmdb"
          | "similarMovies.year"
          | "sequelsAndPrequels.id"
          | "sequelsAndPrequels.name"
          | "sequelsAndPrequels.enName"
          | "sequelsAndPrequels.alternativeName"
          | "sequelsAndPrequels.poster.url"
          | "sequelsAndPrequels.rating.kp"
          | "sequelsAndPrequels.rating.imdb"
          | "sequelsAndPrequels.rating.tmdb"
          | "sequelsAndPrequels.year"
          | "watchability.items.name"
          | "watchability.items.url"
          | "watchability.items.logo.url"
          | "lists"
          | "top10"
          | "top250"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Поиск по ID KinoPoisk (пример: `"666", "555", "!666"`) */
        id?: string[] | null;
        /** Поиск по IMDB ID (пример: `"tt666", "tt555", "!tt666"`) */
        externalIdImdb?: string[] | null;
        /** Поиск по TMDB ID (пример: `666, 555, !666`) */
        externalIdTmdb?: number[] | null;
        /** Поиск по id KinoPoisk HD (пример: `"48e8d0acb0f62d8585101798eaeceec5", "!48e8d0acb0f62d8585101798eaeceec5"`) */
        externalIdKpHd?: string[] | null;
        /** Поиск по типу фильма (пример: `"movie", "tv-series", "!anime"`) */
        type?: ("movie" | "tv-series" | "cartoon" | "animated-series" | "anime")[] | null;
        /** Поиск по номеру типа фильма (пример: `1, 2, !3`). Список типов: 1 (movie), 2 (tv-series), 3 (cartoon), 4 (anime), 5 (animated-series). */
        typeNumber?: string[] | null;
        /** Поиск по индикатору сериала (пример: `true, false`) */
        isSeries?: string[] | null;
        /** Поиск по статусу фильма (пример: `"announced", "completed", "!filming"`) */
        status?: ("announced" | "completed" | "filming" | "post-production" | "pre-production")[] | null;
        /** Поиск по году (пример: `1874, 2050, !2020, 2020-2024`) */
        year?: string[] | null;
        /** Поиск по года начала релиза (пример: `1874, 2050, !2020, 2020-2024`) */
        releaseYearsStart?: string[] | null;
        /** Поиск по года окончания релиза (пример: `1874, 2050, !2020, 2020-2024`) */
        releaseYearsEnd?: string[] | null;
        /** Поиск по рейтингу Кинопоиск (пример: `7, 10, 7.2-10`) */
        ratingKp?: string[] | null;
        /** Поиск по рейтингу IMDB (пример: `7, 10, 7.2-10`) */
        ratingImdb?: string[] | null;
        /** Поиск по рейтингу TMDB (пример: `7, 10, 7.2-10`) */
        ratingTmdb?: string[] | null;
        /** Поиск по рейтингу MPAA (пример: `"G", "NC-17", "!R"`) */
        ratingMpaa?: string[] | null;
        /** Поиск по возрастному рейтингу (пример: `12, !18, 12-18`) */
        ageRating?: string[] | null;
        /** Поиск по количеству голосов на KP (пример: `1000-6666666`) */
        votesKp?: string[] | null;
        /** Поиск по количеству голосов на IMDB (пример: `1000-6666666`) */
        votesImdb?: string[] | null;
        /** Поиск по количеству голосов на TMDB (пример: `1000-6666666`) */
        votesTmdb?: string[] | null;
        /** Поиск по количеству голосов кинокритиков (пример: `1000-6666666`) */
        votesFilmCritics?: string[] | null;
        /** Поиск по количеству голосов кинокритиков из России (пример: `1000-6666666`) */
        votesRussianFilmCritics?: string[] | null;
        /** Поиск по количеству голосов ожидания на Кинопоиске (пример: `1000-6666666`) */
        votesAwait?: string[] | null;
        /** Поиск по бюджету фильма (пример: `1000-6666666`) */
        budgetValue?: string[] | null;
        /** Поиск по количеству аудитории (пример: `1000-6666666`) */
        audienceCount?: string[] | null;
        /** Поиск по продолжительности фильма (пример: `100-120`) */
        movieLength?: string[] | null;
        /** Поиск по всей продолжительности одной серии (пример: `20-60`) */
        seriesLength?: string[] | null;
        /** Поиск по всей продолжительности сериала (пример: `100-120`) */
        totalSeriesLength?: string[] | null;
        /** Поиск по жанрам (пример: `"драма", "комедия", "!мелодрама", "+ужасы"`) */
        genresName?: string[] | null;
        /** Поиск по странам (пример: `"США", "Россия", "!Франция" , "+Великобритания"`) */
        countriesName?: string[] | null;
        /** Поиск по наличию билетов в продаже (пример: `true, false`) */
        ticketsOnSale?: string[] | null;
        /** Поиск по сетям производства фильма (пример: `"HBO", "Netflix", "!Amazon"`) */
        networksItemsName?: string[] | null;
        /** Поиск по ID персон (пример: `666, 555, !666`) */
        personsId?: string[] | null;
        /** Поиск по профессиям персон (пример: `"актер", "режиссер", "!сценарист"`) */
        personsProfession?: string[] | null;
        /** Поиск по английским профессиям персон (пример: `"actor", "director", "!writer"`) */
        personsEnProfession?: string[] | null;
        /** Поиск по сборам в мире (пример: `1000-6666666`) */
        feesWorld?: string[] | null;
        /** Поиск по сборам в США (пример: `1000-6666666`) */
        feesUsa?: string[] | null;
        /** Поиск по сборам в России (пример: `1000-6666666`) */
        feesRussia?: string[] | null;
        /** Поиск по дате премьеры в мире (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        premiereWorld?: string[] | null;
        /** Поиск по дате премьеры в США (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        premiereUsa?: string[] | null;
        /** Поиск по дате премьеры в России (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        premiereRussia?: string[] | null;
        /** Поиск по дате премьеры в стриминговых сервисах (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        premiereDigital?: string[] | null;
        /** Поиск по дате премьеры в кинотеатрах (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        premiereCinema?: string[] | null;
        /** Поиск по стране премьеры (пример: `"США", "Россия", "!Франция" , "+Великобритания"`) */
        premiereCountry?: string[] | null;
        /** Поиск по ID KinoPoisk из списка похожих фильмов (пример: `666, 555, !666`) */
        similarMoviesId?: string[] | null;
        /** Поиск по ID KinoPoisk из списка сиквелов и преквелов (пример: `666, 555, !666`) */
        sequelsAndPrequelsId?: string[] | null;
        /** Поиск по доуступным платформам для просмотра (пример: `"ivi", "okko", "!megogo"`) */
        watchabilityItemsName?: string[] | null;
        /** Поиск по коллекциям из KinoPoisk (пример: `"top250", "top-100-indian-movies", "!top-100-movies"`) */
        lists?: string[] | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<MovieDtoV14, any>({
        path: `/v1.4/movie/random`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Фильмы, сериалы, и т.д.
     * @name MovieControllerFindManyAwardsV14
     * @summary Награды тайтлов
     * @request GET:/v1.4/movie/awards
     * @secure
     */
    movieControllerFindManyAwardsV14: (
      query?: {
        /**
         * Номер страницы
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Количество элементов на странице
         * @min 1
         * @max 250
         * @default 10
         */
        limit?: number;
        /** Список полей требуемых в ответе из модели */
        selectFields?: ("movieId" | "winning" | "nomination" | "updatedAt" | "createdAt")[];
        /** Список полей которые не должны быть null или пусты */
        notNullFields?: (
          | "movieId"
          | "winning"
          | "nomination.award.title"
          | "nomination.award.year"
          | "nomination.title"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Сортировка по полям из модели */
        sortField?: (
          | "movieId"
          | "winning"
          | "nomination.award.title"
          | "nomination.award.year"
          | "nomination.title"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Тип сортировки применительно к полям из sortField (пример: `"1", "-1"`) */
        sortType?: string[];
        /** Поиск по ID фильма (пример: `"666", "555", "!666"`) */
        movieId?: string[] | null;
        /** Поиск по номинациям (пример: `"Оскар", "Золотой глобус"`) */
        nominationTitle?: string[] | null;
        /** Поиск по наградам (пример: `"Лучший фильм", "Лучший актер"`) */
        nominationAwardTitle?: string[] | null;
        /** Поиск по году награды (пример: `"2019", "2020"`) */
        nominationAwardYear?: string[] | null;
        /** Поиск по победам (пример: `"true", "false"`) */
        winning?: string[] | null;
        /** Поиск по дате обновления в базе (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        updatedAt?: string[] | null;
        /** Поиск по дате добавления в базу (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        createdAt?: string[] | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<MovieAwardDocsResponseDto, any>({
        path: `/v1.4/movie/awards`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Сезоны и эпизоды
     * @name SeasonControllerFindManyV14
     * @summary Поиск сезонов
     * @request GET:/v1.4/season
     * @secure
     */
    seasonControllerFindManyV14: (
      query?: {
        /**
         * Номер страницы
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Количество элементов на странице
         * @min 1
         * @max 250
         * @default 10
         */
        limit?: number;
        /** Список полей требуемых в ответе из модели */
        selectFields?: (
          | "movieId"
          | "poster"
          | "number"
          | "name"
          | "enName"
          | "duration"
          | "description"
          | "enDescription"
          | "episodesCount"
          | "airDate"
          | "episodes"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Список полей которые не должны быть null или пусты */
        notNullFields?: (
          | "movieId"
          | "poster.url"
          | "poster.previewUrl"
          | "number"
          | "name"
          | "enName"
          | "episodesCount"
          | "airDate"
          | "duration"
          | "description"
          | "enDescription"
          | "episodes.number"
          | "episodes.name"
          | "episodes.enName"
          | "episodes.airDate"
          | "episodes.date"
          | "episodes.description"
          | "episodes.enDescription"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Сортировка по полям из модели */
        sortField?: (
          | "movieId"
          | "poster.url"
          | "poster.previewUrl"
          | "number"
          | "name"
          | "enName"
          | "episodesCount"
          | "airDate"
          | "duration"
          | "description"
          | "enDescription"
          | "episodes.number"
          | "episodes.name"
          | "episodes.enName"
          | "episodes.airDate"
          | "episodes.date"
          | "episodes.description"
          | "episodes.enDescription"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Тип сортировки применительно к полям из sortField (пример: `"1", "-1"`) */
        sortType?: string[];
        /** Поиск по ID фильма (пример: `"666", "555", "!666"`) */
        movieId?: string[] | null;
        /** Поиск по номеру сезона (пример: `"1", "1-19", "!3"`) */
        number?: string[] | null;
        /** Поиск по нормеру эпизода (пример: `"1", "1-19", "!3"`) */
        episodesNumber?: string[] | null;
        /** Поиск по дате выхода сезона (пример: `"2020-01-01-2020-12-31", "2020-01-01"`) */
        airDate?: string[] | null;
        /** Поиск по дате выхода эпизода (пример: `"2020-01-01-2020-12-31", "2020-01-01"`) */
        episodesAirDate?: string[] | null;
        /** Поиск по дате обновления в базе (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        updatedAt?: string[] | null;
        /** Поиск по дате добавления в базу (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        createdAt?: string[] | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<SeasonDocsResponseDtoV14, any>({
        path: `/v1.4/season`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Этот метод предназначен для поиска персон по фильтрам. Он принимает множество параметров, которые можно комбинировать между собой. Если вам нужен только поиск по имени, используйте метод `Полнотекстовый поиск` (search). В этом методе также доступен выбор полей. А в ответ приходит полная модель персоны.
     *
     * @tags Отзывы пользователей
     * @name ReviewControllerFindManyV14
     * @summary Универсальный поиск с фильтрами
     * @request GET:/v1.4/review
     * @secure
     */
    reviewControllerFindManyV14: (
      query?: {
        /**
         * Номер страницы
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Количество элементов на странице
         * @min 1
         * @max 250
         * @default 10
         */
        limit?: number;
        /** Список полей требуемых в ответе из модели */
        selectFields?: (
          | "id"
          | "movieId"
          | "title"
          | "type"
          | "review"
          | "date"
          | "author"
          | "authorId"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Список полей которые не должны быть null или пусты */
        notNullFields?: (
          | "id"
          | "movieId"
          | "title"
          | "type"
          | "review"
          | "date"
          | "author"
          | "authorId"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Сортировка по полям из модели */
        sortField?: (
          | "id"
          | "movieId"
          | "title"
          | "type"
          | "review"
          | "date"
          | "author"
          | "authorId"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Тип сортировки применительно к полям из sortField (пример: `"1", "-1"`) */
        sortType?: string[];
        /** Поиск по ID отзыва (пример: `"111", "222", "!666"`) */
        id?: string[] | null;
        /** Поиск по ID фильма (пример: `"666", "555", "!666"`) */
        movieId?: string[] | null;
        /** Поиск отзывов по ID автора (пример: `"666", "555", "!666"`) */
        authorId?: string[] | null;
        /** Поиск по имени автора отзыва (пример: `"КиноПоиск", "!КиноПоиск"`) */
        author?: string[] | null;
        /** Поиск по типу отзыва (пример: `"!Негативный", "Нейтральный", "Позитивный"`) */
        type?: ("Негативный" | "Нейтральный" | "Позитивный")[] | null;
        /** Поиск по дате создания отзыва (пример: `"01.01.2021-01.01.2022", "01.01.2021"`) */
        date?: string[] | null;
        /** Поиск по дате обновления в базе (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        updatedAt?: string[] | null;
        /** Поиск по дате добавления в базу (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        createdAt?: string[] | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<ReviewDocsResponseDtoV14, any>({
        path: `/v1.4/review`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает всю доступную информацию о сущности.
     *
     * @tags Актеры, режиссеры, операторы, и т.д
     * @name PersonControllerFindOneV14
     * @summary Поиск по id
     * @request GET:/v1.4/person/{id}
     * @secure
     */
    personControllerFindOneV14: (id: number, params: RequestParams = {}) =>
      this.request<Person, UnauthorizedErrorResponseDto | ForbiddenErrorResponseDto | ErrorResponseDto>({
        path: `/v1.4/person/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Этот метод вернет список персон удовлетворяющих вашему запросу. <br> В ответе придут поля указанные в параметре `selectFields`. Если его не указать, то вернутся только дефолтные поля.
     *
     * @tags Актеры, режиссеры, операторы, и т.д
     * @name PersonControllerFindManyV14
     * @summary Универсальный поиск с фильтрами
     * @request GET:/v1.4/person
     * @secure
     */
    personControllerFindManyV14: (
      query?: {
        /**
         * Номер страницы
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Количество элементов на странице
         * @min 1
         * @max 250
         * @default 10
         */
        limit?: number;
        /** Список полей требуемых в ответе из модели */
        selectFields?: (
          | "id"
          | "name"
          | "enName"
          | "photo"
          | "sex"
          | "growth"
          | "birthday"
          | "death"
          | "age"
          | "birthPlace"
          | "deathPlace"
          | "spouses"
          | "countAwards"
          | "profession"
          | "facts"
          | "movies"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Список полей которые не должны быть null или пусты */
        notNullFields?: (
          | "id"
          | "name"
          | "enName"
          | "photo"
          | "sex"
          | "growth"
          | "birthday"
          | "death"
          | "age"
          | "birthPlace.value"
          | "deathPlace.value"
          | "spouses.id"
          | "spouses.name"
          | "spouses.divorced"
          | "spouses.divorcedReason"
          | "spouses.sex"
          | "spouses.children"
          | "spouses.relation"
          | "countAwards"
          | "profession.value"
          | "facts.value"
          | "movies.id"
          | "movies.name"
          | "movies.alternativeName"
          | "movies.rating"
          | "movies.general"
          | "movies.description"
          | "movies.enProfession"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Сортировка по полям из модели */
        sortField?: (
          | "id"
          | "name"
          | "enName"
          | "photo"
          | "sex"
          | "growth"
          | "birthday"
          | "death"
          | "age"
          | "birthPlace.value"
          | "deathPlace.value"
          | "spouses.id"
          | "spouses.name"
          | "spouses.divorced"
          | "spouses.divorcedReason"
          | "spouses.sex"
          | "spouses.children"
          | "spouses.relation"
          | "countAwards"
          | "profession.value"
          | "facts.value"
          | "movies.id"
          | "movies.name"
          | "movies.alternativeName"
          | "movies.rating"
          | "movies.general"
          | "movies.description"
          | "movies.enProfession"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Тип сортировки применительно к полям из sortField (пример: `"1", "-1"`) */
        sortType?: string[];
        /** Поиск по ID KinoPoisk (пример: `"111", "222", "!666"`) */
        id?: string[] | null;
        /** Поиск по ID фильма (пример: `"666", "555", "!666"`) */
        moviesId?: string[] | null;
        /** Поиск по гендеру (пример: `Женский, Мужской`) */
        sex?: ("Женский" | "Мужской")[] | null;
        /** Поиск по росту (пример: `170-180, 180`) */
        growth?: string[] | null;
        /** Поиск по дате рождения (пример: `01.01.2000-01.01.2001, 01.01.2000`) */
        birthday?: string[] | null;
        /** Поиск по дате смерти (пример: `01.01.2000-01.01.2001, 01.01.2000`) */
        death?: string[] | null;
        /** Поиск по возрасту (пример: `18-25, 25`) */
        age?: string[] | null;
        /** Поиск по месту рождения (пример: `Москва, Санкт-Петербург`) */
        birthPlaceValue?: string[] | null;
        /** Поиск по месту смерти (пример: `Москва, Санкт-Петербург`) */
        deathPlaceValue?: string[] | null;
        /** Поиск по ID супруги(супруга) (пример: `111, 222`) */
        spousesId?: string[] | null;
        /** Поиск по статусу развода (пример: `true, false`) */
        spousesDivorced?: string | null;
        /** Поиск по гендеру супруги(супруга) (пример: `Женский, Мужской`) */
        spousesSex?: ("Женский" | "Мужской")[] | null;
        /** Поиск по количеству наград (пример: `1-10, 10`) */
        countAwards?: string[] | null;
        /** Поиск по профессии (пример: `Актер, Режиссер`) */
        professionValue?:
          | (
              | "Актер"
              | "Актер дубляжа"
              | "Актриса"
              | "Актриса дубляжа"
              | "В титрах не указаны"
              | "Группа: Хроника"
              | "Группа: играют самих себя"
              | "Директор фильма"
              | "Звукорежиссер"
              | "Композитор"
              | "Монтажер"
              | "Озвучка"
              | "Оператор"
              | "Переводчик"
              | "Продюсер"
              | "Режиссер"
              | "Режиссер дубляжа"
              | "Сценарист"
              | "Художник"
            )[]
          | null;
        /** Поиск по рейтингу фильма (пример: `1-10, 10`) */
        moviesRating?: string[] | null;
        /** Поиск по профессии в фильмах на английском (пример: `actor, director`) */
        moviesEnProfession?:
          | (
              | "actor"
              | "cameo"
              | "composer"
              | "design"
              | "director"
              | "director_ussr"
              | "editor"
              | "group_cameo"
              | "group_uncredited"
              | "operator"
              | "producer"
              | "sound_designer"
              | "translator"
              | "uncredited"
              | "voice_director"
              | "voiceover"
              | "writer"
            )[]
          | null;
        /** Поиск по дате обновления в базе (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        updatedAt?: string[] | null;
        /** Поиск по дате добавления в базу (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        createdAt?: string[] | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<PersonDocsResponseDtoV14, any>({
        path: `/v1.4/person`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Этот метод вернет список персон которые подходят под ваш запрос.
     *
     * @tags Актеры, режиссеры, операторы, и т.д
     * @name PersonControllerSearchPersonV14
     * @summary Поиск актеров, режиссеров, и т.д по имени
     * @request GET:/v1.4/person/search
     * @secure
     */
    personControllerSearchPersonV14: (
      query: {
        /**
         * Страница выборки
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Количество элементов на странице
         * @min 1
         * @max 250
         * @default 10
         */
        limit?: number;
        /** Поисковый запрос */
        query: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<SearchPersonResponseDtoV14, any>({
        path: `/v1.4/person/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Актеры, режиссеры, операторы, и т.д
     * @name PersonControllerFindManyAwardsV14
     * @summary Награды актеров
     * @request GET:/v1.4/person/awards
     * @secure
     */
    personControllerFindManyAwardsV14: (
      query?: {
        /**
         * Номер страницы
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Количество элементов на странице
         * @min 1
         * @max 250
         * @default 10
         */
        limit?: number;
        /** Список полей требуемых в ответе из модели */
        selectFields?: ("personId" | "winning" | "nomination" | "updatedAt" | "createdAt")[];
        /** Список полей которые не должны быть null или пусты */
        notNullFields?: (
          | "personId"
          | "winning"
          | "nomination.award.title"
          | "nomination.award.year"
          | "nomination.title"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Сортировка по полям из модели */
        sortField?: (
          | "personId"
          | "winning"
          | "nomination.award.title"
          | "nomination.award.year"
          | "nomination.title"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Тип сортировки применительно к полям из sortField (пример: `"1", "-1"`) */
        sortType?: string[];
        /** Поиск по ID персоны (пример: `"666", "555", "!666"`) */
        personId?: string[] | null;
        /** Поиск по номинациям (пример: `"Оскар", "Золотой глобус"`) */
        nominationTitle?: string[] | null;
        /** Поиск по наградам (пример: `"Лучший фильм", "Лучший актер"`) */
        nominationAwardTitle?: string[] | null;
        /** Поиск по году награды (пример: `"2019", "2020"`) */
        nominationAwardYear?: string[] | null;
        /** Поиск по победам (пример: `"true", "false"`) */
        winning?: string | null;
        /** Поиск по дате обновления в базе (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        updatedAt?: string[] | null;
        /** Поиск по дате добавления в базу (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        createdAt?: string[] | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<PersonAwardDocsResponseDto, any>({
        path: `/v1.4/person/awards`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Этот метод предназначен для поиска студий
     *
     * @tags Студии
     * @name StudioControllerFindManyV14
     * @summary Поиск студий
     * @request GET:/v1.4/studio
     * @secure
     */
    studioControllerFindManyV14: (
      query?: {
        /**
         * Номер страницы
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Количество элементов на странице
         * @min 1
         * @max 250
         * @default 10
         */
        limit?: number;
        /** Список полей требуемых в ответе из модели */
        selectFields?: ("id" | "subType" | "title" | "type" | "movies" | "updatedAt" | "createdAt")[];
        /** Список полей которые не должны быть null или пусты */
        notNullFields?: ("id" | "subType" | "title" | "type" | "movies.id" | "updatedAt" | "createdAt")[];
        /** Сортировка по полям из модели */
        sortField?: ("id" | "subType" | "title" | "type" | "movies.id" | "updatedAt" | "createdAt")[];
        /** Тип сортировки применительно к полям из sortField (пример: `"1", "-1"`) */
        sortType?: string[];
        /** Поиск по ID KinoPoisk (пример: `"warnerbros", "222", "!666"`) */
        id?: string[] | null;
        /** Поиск по ID фильма (пример: `"666", "555", "!666"`) */
        moviesId?: string[] | null;
        /** Поиск по типу студии (пример: `"Производство", "Студия дубляжа"`) */
        type?: string[] | null;
        /** Поиск по типу студии (пример: `"company", "studio"`) */
        subType?: string[] | null;
        /** Поиск по названию студии (пример: `"Warner Bros.", "!Warner Bros."`) */
        title?: string[] | null;
        /** Поиск по дате обновления (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        updatedAt?: string[] | null;
        /** Поиск по дате добавления (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        createdAt?: string[] | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<StudioDocsResponseDtoV14, any>({
        path: `/v1.4/studio`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Этот метод предназначен для поиска ключевых слов
     *
     * @tags Ключевые слова
     * @name KeywordControllerFindManyV14
     * @summary Поиск ключевых слов
     * @request GET:/v1.4/keyword
     * @secure
     */
    keywordControllerFindManyV14: (
      query?: {
        /**
         * Номер страницы
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Количество элементов на странице
         * @min 1
         * @max 250
         * @default 10
         */
        limit?: number;
        /** Список полей требуемых в ответе из модели */
        selectFields?: ("id" | "movies" | "title" | "updatedAt" | "createdAt")[];
        /** Список полей которые не должны быть null или пусты */
        notNullFields?: ("id" | "movies.id" | "title" | "updatedAt" | "createdAt")[];
        /** Сортировка по полям из модели */
        sortField?: ("id" | "movies.id" | "title" | "updatedAt" | "createdAt")[];
        /** Тип сортировки применительно к полям из sortField (пример: `"1", "-1"`) */
        sortType?: string[];
        /** Поиск ключевого слова по id (пример: `"666", "!666"`) */
        id?: string[];
        /** Поиск ключевых слов по id фильма (пример: `"666", "!666"`) */
        moviesId?: string[];
        /** Поиск ключевых слов по наименованию (пример: `"1980-е", "!1980-е"`) */
        title?: string[];
        /** Поиск по дате обновления в базе (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        updatedAt?: string[] | null;
        /** Поиск по дате добавления в базу (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        createdAt?: string[] | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<KeywordDocsResponseDtoV14, any>({
        path: `/v1.4/keyword`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Этот метод предназначен для поиска картинок которые привязаны к фильмам и сериалам
     *
     * @tags Постеры, фоны, кадры, скриншоты и т.д.
     * @name ImageControllerFindManyV14
     * @summary Поиск картинок
     * @request GET:/v1.4/image
     * @secure
     */
    imageControllerFindManyV14: (
      query?: {
        /**
         * Номер страницы
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Количество элементов на странице
         * @min 1
         * @max 250
         * @default 10
         */
        limit?: number;
        /** Список полей требуемых в ответе из модели */
        selectFields?: (
          | "movieId"
          | "type"
          | "language"
          | "url"
          | "previewUrl"
          | "height"
          | "width"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Список полей которые не должны быть null или пусты */
        notNullFields?: (
          | "movieId"
          | "type"
          | "language"
          | "url"
          | "previewUrl"
          | "height"
          | "width"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Сортировка по полям из модели */
        sortField?: (
          | "movieId"
          | "type"
          | "language"
          | "url"
          | "previewUrl"
          | "height"
          | "width"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Тип сортировки применительно к полям из sortField (пример: `"1", "-1"`) */
        sortType?: string[];
        /** Поиск картинок по id фильма (пример: `"666", "!666"`) */
        movieId?: string[];
        /** Поиск картинок по типу (пример: `"cover", "!cover"`) */
        type?: ("backdrops" | "cover" | "frame" | "promo" | "screenshot" | "shooting" | "still" | "wallpaper")[];
        /** Поиск картинок по языку (пример: `"en", "!de"`) */
        language?: (
          | "ab"
          | "af"
          | "am"
          | "ar"
          | "as"
          | "av"
          | "ba"
          | "be"
          | "bg"
          | "bn"
          | "ca"
          | "ce"
          | "cn"
          | "cs"
          | "cu"
          | "cv"
          | "da"
          | "de"
        )[];
        /** Поиск картинок по высоте (пример: `"1920", "360-1920"`) */
        height?: string[];
        /** Поиск картинок по ширине (пример: `"1080", "320-1080"`) */
        width?: string[];
        /** Поиск по дате обновления в базе (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        updatedAt?: string[] | null;
        /** Поиск по дате добавления в базу (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        createdAt?: string[] | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<ImageDocsResponseDtoV14, any>({
        path: `/v1.4/image`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Этот метод предназначен для поиска коллекций кино
     *
     * @tags Коллекции кино
     * @name ListControllerFindManyV14
     * @summary Поиск коллекций
     * @request GET:/v1.4/list
     * @secure
     */
    listControllerFindManyV14: (
      query?: {
        /**
         * Номер страницы
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Количество элементов на странице
         * @min 1
         * @max 250
         * @default 10
         */
        limit?: number;
        /** Список полей требуемых в ответе из модели */
        selectFields?: ("name" | "category" | "slug" | "moviesCount" | "cover" | "updatedAt" | "createdAt")[];
        /** Список полей которые не должны быть null или пусты */
        notNullFields?: (
          | "name"
          | "category"
          | "slug"
          | "moviesCount"
          | "cover.url"
          | "cover.previewUrl"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Сортировка по полям из модели */
        sortField?: (
          | "name"
          | "category"
          | "slug"
          | "moviesCount"
          | "cover.url"
          | "cover.previewUrl"
          | "updatedAt"
          | "createdAt"
        )[];
        /** Тип сортировки применительно к полям из sortField (пример: `"1", "-1"`) */
        sortType?: string[];
        /** Поиск slug (пример: `"!top250", "top250"`) */
        slug?: string[] | null;
        /** Поиск по категории (пример: `"Фильмы", "!Фильмы"`) */
        category?: ("Онлайн-кинотеатр" | "Премии" | "Сборы" | "Сериалы" | "Фильмы")[] | null;
        /** Поиск по количеству фильмов (пример: `"1-200", "10"`) */
        moviesCount?: string[] | null;
        /** Поиск по дате обновления в базе (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        updatedAt?: string[] | null;
        /** Поиск по дате добавления в базу (пример: `01.01.2020, 01.01.2020-31.12.2020`) */
        createdAt?: string[] | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListDocsResponseDtoV14, any>({
        path: `/v1.4/list`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Этот метод предназначен для поиска коллекции кино по slug
     *
     * @tags Коллекции кино
     * @name ListControllerFindOneV14
     * @summary Поиск коллекции по slug
     * @request GET:/v1.4/list/{slug}
     * @secure
     */
    listControllerFindOneV14: (slug: string, params: RequestParams = {}) =>
      this.request<List, any>({
        path: `/v1.4/list/${slug}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  v1 = {
    /**
     * @description Этот метод принимает только определенные поля, и возвращает по ним все доступные значения.
     *
     * @tags Фильмы, сериалы, и т.д.
     * @name MovieControllerGetPossibleValuesByFieldName
     * @summary Получить список стран, жанров, и т.д.
     * @request GET:/v1/movie/possible-values-by-field
     * @secure
     */
    movieControllerGetPossibleValuesByFieldName: (
      query?: {
        field?: "genres.name" | "countries.name" | "type" | "typeNumber" | "status" | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<PossibleValueDto[], PossibleValueDto[]>({
        path: `/v1/movie/possible-values-by-field`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
