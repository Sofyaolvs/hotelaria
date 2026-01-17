import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Guest {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    cpf:string

    @Column()
    phone:string

    // @ManyToOne(() => Reserva, Booking => Booking.guest)
    // @JoinColumn({name: 'guest_id'})
    // booking: Reserva

    @CreateDateColumn({name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name:'updated_at'})
    updatedAt: Date;
}