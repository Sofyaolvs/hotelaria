import { IsNotEmpty, IsString } from "class-validator";

export class CreateHotelDto{
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    city: string;
    
    @IsString()
    @IsNotEmpty()
    rooms: string;
}