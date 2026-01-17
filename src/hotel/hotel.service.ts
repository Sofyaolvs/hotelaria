import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Hotel } from "./entities/hotel.entity";
import { CreateHotelDto } from "./dto/create-hotel.dto";

@Injectable()
export class HotelService {
    constructor(
        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>
    ){}

    async createHotel(createHotelDto: CreateHotelDto){
        try {
            const newHotel = this.hotelRepository.create(createHotelDto)
            return await this.hotelRepository.save(newHotel)
        } catch (error) {
            console.log("Erro ao criar hotel", error)
            throw new Error('Erro ao criar hotel')
        }
    }

    async findAll():Promise<Hotel[]>{
        try {
            const allHotels = await this.hotelRepository.find()
            return allHotels    
        } catch (error) {
            console.log("Erro ao buscar hotéis", error)
            throw new Error('Erro ao buscar hotéis')
        }
    }

    async findById(id:string):Promise<Hotel | null>{
        try {
            const hotel = await this.hotelRepository.findOne({ 
                where:{id}
                // relations:[]
            })
            return hotel
        } catch (error) {
            console.log("Erro ao buscar hotel", error)
            throw new Error('Erro ao buscar hotel')
        }
    }

    async deleteHotel(id:string):Promise<void>{
        try {
          await this.hotelRepository.delete({id})
        } catch (error) {
            console.log("Erro ao deletar hotel", error)
            throw new Error('Erro ao deletar hotel')
        }
    }
  
}