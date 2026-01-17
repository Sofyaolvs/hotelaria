import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { Hotel } from "./entities/hotel.entity";
import { HotelService } from "./hotel.service";

@Controller('hotel')
export class HotelController {
    constructor(private readonly hotelService: HotelService){}

    @Post()
    async createHotel(@Body()createHotelDto: CreateHotelDto){
        return this.hotelService.createHotel(createHotelDto)
    }

    @Get()
    async findAll():Promise<Hotel[]>{
        return this.hotelService.findAll()
    }

    @Get(':id')
    async findById(@Param('id') id:string){
        return this.hotelService.findById(id)
    }

    @Delete(':id')
    async deleteHotel(@Param('id') id:string){
        return this.hotelService.deleteHotel(id)
    }
}