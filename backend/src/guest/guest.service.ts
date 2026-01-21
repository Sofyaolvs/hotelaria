import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Guest } from "./entities/guest.entitiy";
import { In, Repository } from "typeorm";
import { CreateGuestDto } from "./dto/create-guest.dto";
import { Booking } from "src/booking/entities/booking.entity";

@Injectable()
export class GuestService {
    constructor(
        @InjectRepository(Guest) private readonly guestRepository: Repository<Guest>,
        @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>
    ){}

    async createGuest(createGuestDto: CreateGuestDto){
        try {
            const { bookingIds, ...guestData } = createGuestDto;

            const newGuest = this.guestRepository.create(guestData);
            const savedGuest = await this.guestRepository.save(newGuest);

            if (bookingIds && bookingIds.length > 0) {
                const bookings = await this.bookingRepository.find({
                    where: { id: In(bookingIds) },
                    relations: ['guests']
                });

                if (bookings.length !== bookingIds.length) {
                    throw new NotFoundException('Uma ou mais reservas não foram encontradas');
                }

                for (const booking of bookings) {
                    booking.guests = [...(booking.guests || []), savedGuest];
                    await this.bookingRepository.save(booking);
                }
            }

            return savedGuest;
        } catch (error) {
            console.log("Erro ao criar hóspede", error)
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new Error('Erro ao criar hóspede')
        }
    }

    async findAll():Promise<Guest[]>{
        try {
            const allGuest = await this.guestRepository.find({
                relations: ['bookings', 'bookings.hotel']
            })
            return allGuest
        } catch (error) {
            console.log("Erro ao buscar hóspedes", error)
            throw new Error('Erro ao buscar hóspedes')
        }
    }

    async findById(id:string):Promise<Guest | null>{
        try {
            const guest =  this.guestRepository.findOne({
                where:{id},
                relations:['bookings']
            })
            return guest
        } catch (error) {
            console.log("Erro ao buscar hóspede", error)
            throw new Error('Erro ao buscar hóspede')
        }
    }

    async deleteGuest(id:string):Promise<void>{
        try {
            // Busca o guest com suas reservas
            const guest = await this.guestRepository.findOne({
                where: { id },
                relations: ['bookings']
            });

            if (!guest) {
                throw new NotFoundException('Hóspede não encontrado');
            }

            // Remove o guest de todas as reservas associadas
            if (guest.bookings && guest.bookings.length > 0) {
                for (const booking of guest.bookings) {
                    const bookingWithGuests = await this.bookingRepository.findOne({
                        where: { id: booking.id },
                        relations: ['guests']
                    });

                    if (bookingWithGuests) {
                        bookingWithGuests.guests = bookingWithGuests.guests.filter(g => g.id !== id);
                        await this.bookingRepository.save(bookingWithGuests);
                    }
                }
            }

            // Agora deleta o guest
            await this.guestRepository.delete({ id });
        } catch (error) {
            console.log("Erro ao deletar hóspede", error)
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new Error('Erro ao deletar hóspede')
        }
    }
    
}