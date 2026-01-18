import { Booking } from "src/booking/entities/booking.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Guest {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    document:string

    @Column()
    phone:string

    @ManyToMany(() => Booking, booking => booking.guests)
    bookings: Booking[]

    @CreateDateColumn({name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name:'updated_at'})
    updatedAt: Date;
}