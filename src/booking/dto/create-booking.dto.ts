import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookingDto {
    @IsString()
    @IsNotEmpty()
    hotelId: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    guestIds?: string[];

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    checkInDate: Date;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    checkOutDate: Date;

    @IsString()
    @IsNotEmpty()
    responsibleName: string;
}