import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TelegramModule } from './telegram/telegram.module';
import { VkModule } from './vk/vk.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [TelegramModule, VkModule]
})
export class AuthModule {}
