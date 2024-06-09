import { Injectable } from '@nestjs/common'
import { DbService } from '@/db/db.service'
import { device_platforms } from '@prisma/client'

@Injectable()
export class DeviceService {
  constructor(
    private readonly db: DbService
  ) {
  }

  public async getByUUID(clientId: string) {
    return this.db
      .device
      .findUnique({
        where: { clientId }
      })
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

  public async setUserIdByClientId(userId: number, clientId: string) {
    return this.db
      .device
      .update({
        where: { clientId },
        data: { userId }
      })
  }

  public async removeUserFromClientId(clientId: string) {
    return this.db
      .device
      .update({
        where: { clientId },
        data: { userId: null }
      })
  }
}
