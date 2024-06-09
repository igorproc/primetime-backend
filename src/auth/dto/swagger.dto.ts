import { ApiProperty } from '@nestjs/swagger'
import { user_roles as EUserRoles } from '@prisma/client'

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
    required: true,
  })
  role: EUserRoles

  @ApiProperty({
    name: 'firstName',
    type: String,
    required: true,
  })
  firstName: string

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

  @ApiProperty({
    name: 'lastVisited',
    type: Date,
    required: true,
  })
  lastVisited: Date
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
}

export class SuccessLogoutSchema {
  @ApiProperty({
    name: 'successLogout',
    type: Boolean,
    required: true,
  })
  successLogout: boolean
}
