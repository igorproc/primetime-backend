export interface IBalancerService {
  getMovie: (token: string, kinopoiskId: number) => Promise<any>
}
