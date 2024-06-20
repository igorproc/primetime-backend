import { Injectable } from '@nestjs/common'
import { DbService } from '@/db/db.service'
import { device_platforms } from '@prisma/client'

@Injectable()
export class DeviceService {
  constructor(
    private readonly db: DbService
  ) {
  }

  public async createClientId(ip: string, payload: string) {
    return this.db
      .device
      .create({
        data: {
          platform: payload as device_platforms,
          ip: ip
        },
        select: {
          clientId: true
        }
      })
  }
}
