// Node Deps
import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
// Other Modules
import { MysqlService } from '@/db/mysql/mysql.service'

type TMovieRecordsCount = {
  count: number
}

type TMovieRecords = {
  kinopoiskId: number
}

@Injectable()
export class MigrationsService {
  private readonly INDEX_STEP: number

  constructor(
    private readonly mysql: MysqlService,
  ) {
    this.INDEX_STEP = 10
  }

  public async getRecordsCount(type: 'movie') {
    const conditionMap = { 'movie': 'WatchContent' }
    const query = `SELECT COUNT(*) AS count FROM ${conditionMap[type]}`

    try {
      const recordsCount = await this.mysql.executeQuery<TMovieRecordsCount>(query)
      return recordsCount[0][0]?.count || null
    } catch (error) {
      console.error(error)
      throw new HttpException(
        `[Migration/mysql] Query /${query}/ error`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  public async getMoviesIds(index: number): Promise<number[]> {
    const query = 'SELECT kinopoiskId FROM WatchContent WHERE id BETWEEN ? AND ?'

    try {
      const data = await this.mysql
        .executeQuery(query, [index, index + this.INDEX_STEP])

      return data[0]?.map((item: TMovieRecords) => item.kinopoiskId)
    } catch (error) {
      console.error(error)
      throw new HttpException(
        `[Migration/mysql] Query /${query}/ error`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
