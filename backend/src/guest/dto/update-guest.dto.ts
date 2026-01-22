import { IsArray, IsEmail, IsOptional, IsString, IsUUID } from "class-validator";
import { IsDocument } from "../decorators/is-cpf.decorator";

export class UpdateGuestDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    @IsDocument({message: 'O documento é inválido (informe um CPF ou passaporte válido)'})
    document?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    bookingIds?: string[];
}
