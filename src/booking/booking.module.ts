import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "./entities/booking.entity";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { Hotel } from "src/hotel/entities/hotel.entity";
import { Guest } from "src/guest/entities/guest.entitiy";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([Booking, Hotel, Guest]), AuthModule],
    controllers: [BookingController],
    providers: [BookingService],
    exports: [BookingService],
})
export class BookingModule {}
