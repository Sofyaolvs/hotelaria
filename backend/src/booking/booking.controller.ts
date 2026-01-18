import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { Booking } from "./entities/booking.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guards";

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingController {
    constructor(private readonly bookingService: BookingService){}

    @Post()
    async createBooking(@Body() createBookingDto: CreateBookingDto ){
        return this.bookingService.createBooking(createBookingDto)
    }

    @Get()
    async findAll():Promise<Booking[]>{
        return this.bookingService.findAll()
    }

    @Get(':id')
    async findById(@Param('id') id:string){
        return this.bookingService.findById(id)
    }

    @Get(':id/guests')
    async findGuestsByBookingId(@Param('id') id:string){
        return this.bookingService.findGuestsByBookingId(id)
    }

    @Delete(':id')
    async deleteBooking(@Param('id') id:string){
        return this.bookingService.deleteBooking(id)
    }
}