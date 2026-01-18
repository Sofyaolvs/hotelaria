import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

function isValidPassport(value: string): boolean {
  const passportRegex = /^[A-Z0-9]{5,20}$/i;
  return passportRegex.test(value);
}

@ValidatorConstraint({ name: 'isDocument', async: false })
export class IsDocumentConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (!value || typeof value !== 'string') return false;
    return cpf.isValid(value) || isValidPassport(value);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Documento inválido (CPF ou passaporte)';
  }
}

export function IsDocument(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDocumentConstraint,
    });
  };
}

export const IsCpf = IsDocument;
export const IsCpfConstraint = IsDocumentConstraint;
