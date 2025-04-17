import {
  MatchTypeWithDataConstraint
} from '@/validator/global.validators'

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from 'class-validator'

type TProviderMap<
  T extends Record<string, string>,
  U extends Record<T[keyof T], any>
> = {
  [key in T[keyof T]]: U[key]
}


export function IsActivationKey(validationOptions?: ValidationOptions) {
  return function(object: object, propertyName: string) {
    registerDecorator({
      name: 'isActivationKey',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const regex = /([0-9a-zA-Z]{3,13}-){1,3}[0-9a-zA-Z]{3,13}/gm
          return regex.test(value)
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} Invalid activation key format`
        }
      }
    })
  }
}

export function MatchTypeWithData<T extends Record<string, string>, U extends Record<T[keyof T], any>>(
  typeMap: TProviderMap<T, U>,
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [typeMap],
      validator: MatchTypeWithDataConstraint,
    })
  }
}
