// Node Deps
import { env } from 'process'
import { TelegramModule } from 'nestjs-telegram'

export default function() {
  return TelegramModule.forRoot({
    botKey: env.TELEGRAM_TOKEN,
  })
}