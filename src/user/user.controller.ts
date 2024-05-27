// Node Deps
import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthFillUserSchema } from '@/user/dto/validate.dto'

@ApiTags('User')
@Controller('user')
export class UserController {

  @Post('fill')
  @ApiOperation({ description: 'First data fill on register' })
  @ApiBody({ type: AuthFillUserSchema })
  async fillData(
    @Body() data: AuthFillUserSchema,
  ) {
    return data
  }
}

