import { IsNotEmpty, IsString } from "class-validator";
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
}