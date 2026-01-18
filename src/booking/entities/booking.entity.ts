import { Guest } from "src/guest/entities/guest.entitiy";
import { Hotel } from "src/hotel/entities/hotel.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, JoinColumn, ManyToOne } from "typeorm";

@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Hotel)
    @JoinColumn({name:'hotel_id'})
    hotel:Hotel
    
    @ManyToMany(()=> Guest)
    @JoinTable({
        name:'booking_guests',
        joinColumn:{name:'booking_id'},
        inverseJoinColumn:{name:'guest_id'}
    })
    guests:Guest[]

    @Column()
    checkInDate: Date;

    @Column()
    checkOutDate: Date;

    @Column()
    responsibleName: string;

    @Column({ default: 'pending' })
    status: string;

    @CreateDateColumn({name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name:'updated_at'})
    updatedAt: Date;

}
