// Node Deps
import { getCurrentDate } from '@utils/time'
import { ApiProperty } from '@nestjs/swagger'
// Types
import { user_roles as EUserRoles, user_blocking as EUserBlocking } from '@prisma/client'

export class SuccessAuthBlockingStatus {
  @ApiProperty({
    name: 'blockingStatus',
    type: String,
    enum: EUserBlocking,
    example: EUserBlocking.temporarily,
    required: true,
  })
  blockingStatus: string

  @ApiProperty({
    name: 'blockingReason',
    type: String,
    example: 'DMCA',
    required: true,
  })
  blockingReason: string

  @ApiProperty({
    name: 'blockedEnd',
    type: Date,
    example: getCurrentDate().getTime(),
  })
  blockedEnd: Date
}

export class SuccessAuthUser {
  @ApiProperty({
    name: 'id',
    type: Number,
    minimum: 1,
    maximum: 10**8,
    required: true,
  })
  id: number

  @ApiProperty({
    name: 'role',
    type: String,
    enum: EUserRoles,
    example: EUserRoles.USER_VERIFY,
    required: true,
  })
  role: EUserRoles

  @ApiProperty({
    name: 'displayName',
    type: String,
    required: true,
  })
  displayName: string

  @ApiProperty({
    name: 'username',
    type: String,
    required: true,
  })
  username: string

  @ApiProperty({
    name: 'photoUrl',
    type: String,
    required: true,
  })
  photoUrl: string
}

export class SuccessAuthTokens {
  @ApiProperty({
    name: 'refreshToken',
    type: String,
    required: true,
  })
  refreshToken: string

  @ApiProperty({
    name: 'accessToken',
    type: String,
    required: true,
  })
  accessToken: string
}

export class SuccessAuthSchema {
  @ApiProperty({
    name: 'user',
    type: SuccessAuthUser,
    required: true,
  })
  user: SuccessAuthUser

  @ApiProperty({
    name: 'tokens',
    type: SuccessAuthTokens,
    required: true,
  })
  tokens: SuccessAuthTokens

  @ApiProperty({
    name: 'blocking',
    type: SuccessAuthBlockingStatus,
    nullable: true,
  })
  blocking: SuccessAuthBlockingStatus
}

export class SuccessLogoutSchema {
  @ApiProperty({
    name: 'successLogout',
    type: Boolean,
    required: true,
  })
  successLogout: boolean
}
