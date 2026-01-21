import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entitiy';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { AuthModule } from 'src/auth/auth.module';
import { Booking } from 'src/booking/entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guest, Booking]), AuthModule],
  controllers: [GuestController],
  providers: [GuestService],
  exports: [GuestService],
})
export class GuestModule {}