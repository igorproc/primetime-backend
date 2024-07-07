// Node Deps
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
// Other Services
import { DbService } from '@/db/db.service'
import { KpPayService } from '@/content/balancers/kp-pay/kp-pay.service'
import { KpService } from '@/content/balancers/kp/kp.service'
import { MovieService } from '@/content/cache/movie/movie.service'
// Utils
import { getPageDataSize } from '@utils/generate'
import { asyncWhile } from '@/content/utils/loop'
// Validators
import {
  AddBalancerTokenInputSchema,
  GetBalancersListInputSchema
} from '@/content/dto/validate.dto'
// Errors
import { ContentErrors } from '@/content/content.errors'
// Swagger Schemas
import {
  SuccessChangeContentBalancer,
  SuccessGetContentBalancerList,
  SuccessGetMovie,
} from '@/content/dto/swagger.dto'
// Types & Interfaces
import { balancer_code as EBalancerCodes } from '@prisma/client'
import {MigrationsService} from '@/content/migrations/migrations.service'

type TBalancer = (KpPayService | KpService)
type TAvailableBalancers = { [key in EBalancerCodes]: TBalancer }
type TTokensIds = { [key in EBalancerCodes]: number }

@Injectable()
export class ContentService {
  private readonly availableServices: TAvailableBalancers
  private readonly DEFAULT_PAGE_SIZE: number
  private readonly tokensIds: TTokensIds

  constructor(
    private readonly db: DbService,
    private readonly kpPay: KpPayService,
    private readonly kp: KpService,
    private readonly movie: MovieService,
    private readonly migrations: MigrationsService,
  ) {
    this.availableServices = { KP: this.kp, KP_TG_KEY: this.kpPay }
    this.tokensIds = { KP: 0, KP_TG_KEY: 0 }
    this.DEFAULT_PAGE_SIZE = 12
  }

  private dbActions = {
    getFirstTokenByCode: async (code: EBalancerCodes) => {
      return this.db
        .dataBalancerToken
        .findFirst({
          where: { type: code },
          select: { id: true, token: true }
        })
    },

    getNextTokenById: async (id: number, code: EBalancerCodes) => {
      return this.db
        .dataBalancerToken
        .findMany({
          where: {
            type: code,
            id: { gt: id }
          },
          select: { id: true, token: true }
        })
    }
  }

  private async changeCurrentBalancerOnActive() {
    try {
      await this.db
        .dataBalancer
        .updateMany({
          where: { selected: true },
          data: { selected: false }
        })
      const firstAvailableService = await this.db
        .dataBalancer
        .findFirst({
          where: { status: 'ONLINE', selected: false },
          select: { id: true, code: true, selected: true, status: true },
        })

      await this.db
        .dataBalancer
        .update({
          where: { id: firstAvailableService.id },
          data: { selected: true },
        })
      return firstAvailableService
    } catch {
      throw new HttpException(
        ContentErrors.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  private async getCurrentBalancer() {
    try {
      let currentBalancer = await this.db
        .dataBalancer
        .findFirst({
          where: { selected: true },
          select: { id: true, code: true, selected: true, status: true }
        })

      if (!currentBalancer || currentBalancer.status === 'OFFLINE') {
        currentBalancer = await this.changeCurrentBalancerOnActive()
      }

      return {
        code: currentBalancer.code,
        service: this.availableServices[currentBalancer.code],
      }
    } catch {
      throw new HttpException(
        ContentErrors.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  private async getFirstTokenByCode(code: EBalancerCodes) {
    const data = await this.dbActions
      .getFirstTokenByCode(code)

    this.tokensIds[code] = data.id
    return data.token
  }

  private async getToken(code: EBalancerCodes) {
    if (!this.tokensIds[code]) {
      return this.getFirstTokenByCode(code)
    }
    const nextToken = await this.dbActions
      .getNextTokenById(this.tokensIds[code], code)

    if (!nextToken.length) {
      return this.getFirstTokenByCode(code)
    }
    this.tokensIds[code] = nextToken[0].id
    return nextToken[0].token
  }

  public async changeService(serviceCode: EBalancerCodes): Promise<SuccessChangeContentBalancer> {
    try {
      await this.db
        .dataBalancer
        .findUniqueOrThrow({
          where: { code: serviceCode }
        })

      await this.db
        .dataBalancer
        .updateMany({
          where: { selected: true },
          data: { selected: false },
        })

      await this.db
        .dataBalancer
        .update({
          where: { code: serviceCode },
          data: { selected: true }
        })

      return { success: true }
    } catch (error) {
      throw new HttpException(
        ContentErrors.BAD_BALANCER_CODE,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  public async addToken(payload: AddBalancerTokenInputSchema): Promise<SuccessChangeContentBalancer> {
    await this.db
      .dataBalancerToken
      .create({
        data: {
          type: payload.code,
          token: payload.token,
        }
      })

    return { success: true }
  }

  public async getAllServices(data: GetBalancersListInputSchema): Promise<SuccessGetContentBalancerList> {
    const space = getPageDataSize(data?.page, data?.size, this.DEFAULT_PAGE_SIZE)
    const totalItems = await this.db.dataBalancer.count()
    const items = await this.db
      .dataBalancer
      .findMany({ ...space })

    return {
      balancers: items.map(item => ({
        id: item.id,
        code: item.code,
        name: item.name,
        documentationLink: item.docs,
        status: item.status,
        selected: item.selected,
      })),
      totalItems,
      totalPages: Math.ceil(totalItems / (space.skip || this.DEFAULT_PAGE_SIZE))
    }
  }

  public async getMovie(kinopoiskId: number): Promise<SuccessGetMovie> {
    const cacheData = await this.movie.findByKinopoiskId(kinopoiskId)
    if (cacheData) {
      return cacheData
    }

    const balancer = await this.getCurrentBalancer()
    const token = await this.getToken(balancer.code)
    const balancerData = await balancer.service.getMovie(token, kinopoiskId)

    return this.movie.cacheMovie(balancerData)
  }

  public async migrateMovies() {
    let currentIndex = 0
    const totalRecords = await this.migrations.getRecordsCount('movie')

    const action = async () => {
      const promiseList = []
      const kpIds = await this.migrations.getMoviesIds(currentIndex)
      kpIds.forEach(item => {
        promiseList.push(this.getMovie(item))
      })

      await Promise.all(promiseList)
      currentIndex += 10
    }

    await asyncWhile(totalRecords > currentIndex, action)

    return {
      q: await this.migrations.getRecordsCount('movie'),
      w: await this.migrations.getMoviesIds(0),
    }
  }
}
