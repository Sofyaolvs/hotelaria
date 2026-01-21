import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { IsDocument } from "../decorators/is-cpf.decorator";

export class CreateGuestDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsDocument({message: 'O documento  é inválido (informe um CPF ou passaporte válido)'})
    document: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    bookingIds?: string[];
}