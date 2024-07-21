// Node Deps
import { env } from 'process'
import {HttpException, HttpStatus, Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common'
import { createPool, type Pool, type PoolOptions } from 'mysql2/promise'

@Injectable()
export class MysqlService implements OnModuleInit, OnModuleDestroy {
  private readonly config: PoolOptions
  private pool: Pool

  constructor() {
    this.config = {
      host: env.MYSQL_HOST,
      port: Number(env.MYSQL_PORT),
      user: env.MYSQL_USER,
      password: env.MYSQL_PASSWORD,
      database: 'prime',
    }
    this.pool = null
  }

  async onModuleInit(){
    if (!this.pool) {
      this.pool = createPool(this.config)
    }
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end()
    }
  }

  public async executeQuery<T>(query: string, params?: unknown[]) {
    if (!this.pool) {
      throw new Error('Connection pool not initialized')
    }

    try {
      return await this.pool.execute(query, params) as T
    } catch (error) {
      console.error(error)
      throw new HttpException('[Mysql] Connect db Error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
