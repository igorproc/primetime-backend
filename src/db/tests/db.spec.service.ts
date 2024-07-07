import { createMockContext, MockContext } from '@@/test/unit/prisma.context'

describe('[DB] Main Service', () => {
  let service: MockContext['prisma']

  beforeEach(async () => {
    service = createMockContext().prisma
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
