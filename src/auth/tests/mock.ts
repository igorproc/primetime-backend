// Node Deps
import { faker } from '@faker-js/faker'
// Utils
import { getCurrentDate } from '@utils/time'
// Types & Interfaces
import { device_platforms } from '@prisma/client'
import { TDeviceModel, TUserModel } from '@/global.types'

export const mockUser: Omit<TUserModel, 'createdAt' | 'updatedAt'> = {
  id: faker.number.int({ min: 1, max: 10**5 }),
  firstName: faker.person.firstName('male'),
  username: faker.internet.userName({ firstName: 'mock-unit' }),
  role: 'USER_VERIFY',
  photoUrl: faker.image.avatar(),
  lastVisited: faker.date.past({ years: 1, refDate: getCurrentDate() }),
}

export const mockDevice: TDeviceModel = {
  id: 0,
  clientId: faker.string.uuid(),
  platform: device_platforms.WINDOWS,
  ip: faker.internet.ipv4(),
  userId: null,
  createdAt: getCurrentDate(),
  updatedAt: getCurrentDate(),
}
