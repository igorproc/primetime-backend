import { Injectable } from '@nestjs/common'
import { VkAuthInput } from '@/auth/vk/dto/validator.dto'
import { IAuthServiceProvider } from '@/auth/auth.types'

@Injectable()
export class VkService implements IAuthServiceProvider<
  VkAuthInput,
  VkAuthInput
>{
  async authUser (data: VkAuthInput) {
    return data
  }
}
