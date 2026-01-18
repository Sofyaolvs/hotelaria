import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHotelDto{
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    city: string;
    
    @IsNumber()
    @IsNotEmpty()
    rooms: number;
}