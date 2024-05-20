// Node Deps
import { IsNumber, IsString } from 'class-validator'

export class TelegramAuthInput {
  @IsNumber({ maxDecimalPlaces: 10 })
  id: number

  @IsString()
  first_name: string

  @IsString()
  username: string

  @IsString()
  photo_url: string

  @IsString()
  auth_date: string

  @IsString()
  hash: string
}