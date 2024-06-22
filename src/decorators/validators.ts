import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

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
          const regex = /^[a-zA-Z0-9]*-[a-zA-Z0-9]*-[a-zA-Z0-9]*-[a-zA-Z0-9]*-[a-zA-Z0-9]*$/g
          return regex.test(value)
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.targetName} Invalid activation key format`
        }
      }
    })
  }
}
