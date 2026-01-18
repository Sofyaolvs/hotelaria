import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Booking } from "./entities/booking.entity";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { Hotel } from "src/hotel/entities/hotel.entity";

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>
    ){}

    async createBooking(createBookingDto: CreateBookingDto){
        const hotel = await this.hotelRepository.findOne({
            where: { id: createBookingDto.hotelId }
        });

        if (!hotel) {
            throw new NotFoundException('Hotel não encontrado');
        }

        const newBooking = this.bookingRepository.create({
            hotel,
            checkInDate: createBookingDto.checkInDate,
            checkOutDate: createBookingDto.checkOutDate,
            responsibleName: createBookingDto.responsibleName,
            status: 'pending'
        });

        return await this.bookingRepository.save(newBooking);
    }

    async findAll(){
        return await this.bookingRepository.find({
            relations: ['hotel']
        });
    }

    async findById(id: string){
        const booking = await this.bookingRepository.findOne({
            where: { id },
            relations: ['hotel']
        });

        if (!booking) {
            throw new NotFoundException('Reserva não encontrada');
        }

        return booking;
    }

    async findGuestsByBookingId(id: string){
        const booking = await this.bookingRepository.findOne({
            where: { id },
            relations: ['guests']
        });

        if (!booking) {
            throw new NotFoundException('Reserva não encontrada');
        }

        return booking.guests;
    }

    async deleteBooking(id: string){
        const booking = await this.bookingRepository.findOne({
            where: { id }
        });

        if (!booking) {
            throw new NotFoundException('Reserva não encontrada');
        }

        await this.bookingRepository.delete(id);
        return { message: 'Reserva deletada com sucesso' };
    }
}
