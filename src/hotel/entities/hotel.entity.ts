import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('hotel')
export class Hotel {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;

    @Column()
    city:string

    @Column()
    rooms:string
    
    // @ManyToOne(() => Enterprise, enterprise => enterprise.users)
    // @JoinColumn({name: 'enterprise_id'})
    // enterprise: Enterprise;


    @CreateDateColumn({name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name:'updated_at'})
    updatedAt: Date;


}