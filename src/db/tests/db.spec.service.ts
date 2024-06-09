// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { createMockContext, MockContext } from '@@/test/unit/prisma.context'
import { mockUser } from '@/auth/tests/mock'

describe('[DB] Main Service', () => {
  let service: MockContext['prisma']

  beforeEach(async () => {
    service = createMockContext().prisma
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be create user', async () => {
    expect(
      service.user.create(mockUser)
    ).toBe(mockUser)
  })
})
