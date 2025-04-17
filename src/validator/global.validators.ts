import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  validate as validatorValidate
} from 'class-validator'
import { plainToInstance } from 'class-transformer'

@ValidatorConstraint({ name: 'MatchProviderDataByType', async: true })
export class MatchTypeWithDataConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const object = args.object as any
    const type = object.type
    const [typeMap] = args.constraints as [Record<string, new (...args: any[]) => any>]
    if (!type) {
      return false
    }

    const validatorExemplar = typeMap[type]
    if (!validatorExemplar) {
      return false
    }

    const classInstance = plainToInstance(validatorExemplar, value)
    const errors = await validatorValidate(classInstance)
    args.constraints[1] = errors || []

    return !errors.length
  }

  defaultMessage(args: ValidationArguments) {
    if (!args.constraints[1]?.length) {
      return `Data does not match the specified type: ${args.object['type']}`
    }

    const errors: Array<{ property: string; constraints?: Record<string, string> }> = args.constraints[1] || []
    return errors.map(e =>
      `${e.property}: ${Object.values(e.constraints || {}).join(', ')}`
    ).join('; ')
  }
}
