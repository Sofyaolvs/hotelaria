import { Booking } from "src/booking/entities/booking.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('hotel')
export class Hotel {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;

    @Column()
    city:string

    @Column()
    rooms:number
    
    @OneToMany(() => Booking, booking => booking.hotel)
    bookings: Booking[]


    @CreateDateColumn({name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name:'updated_at'})
    updatedAt: Date;


}