import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { Guest } from './entities/guest.entitiy';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Controller('guest')
@UseGuards(JwtAuthGuard)
export class GuestController {
    constructor(private readonly guestService: GuestService){}

    @Post()
    async createGuest(@Body() createGuestDto: CreateGuestDto){
        return this.guestService.createGuest(createGuestDto)
    }

    @Get()
    async findAll():Promise<Guest[]>{
        return this.guestService.findAll()
    }

    @Get(':id')
    async findById(@Param('id') id:string):Promise<Guest | null>{
        return this.guestService.findById(id)
    }

    @Delete(':id')
    async deleteById(@Param('id') id:string):Promise<void>{
        return this.guestService.deleteGuest(id)
    }
}