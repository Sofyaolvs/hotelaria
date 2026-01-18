import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Guest } from "./entities/guest.entitiy";
import { Repository } from "typeorm";
import { CreateGuestDto } from "./dto/create-guest.dto";

@Injectable()
export class GuestService {
    constructor(@InjectRepository(Guest) private readonly guestRepository: Repository<Guest>){}

    async createGuest(createGuestDto: CreateGuestDto){
        try {
            const newGuest = this.guestRepository.create(createGuestDto)
            return await this.guestRepository.save(newGuest)
        } catch (error) {
            console.log("Erro ao criar hóspede", error)
            throw new Error('Erro ao criar hóspede')
        }
    }

    async findAll():Promise<Guest[]>{
        try {
            const allGuest = await this.guestRepository.find()
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
            await this.guestRepository.delete({id})
        } catch (error) {
            console.log("Erro ao deletar hóspede", error)
            throw new Error('Erro ao deletar hóspede')
        }
    }
    
}