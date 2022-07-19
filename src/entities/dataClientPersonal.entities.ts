import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class DataClientPersonal{
    @PrimaryColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    age: string

    @Column()
    password: string

    @Column()
    phone_number: string

    @Column()
    status: boolean

    @Column()
    adm: boolean

    @Column()
    plan: string

    @Column()
    checkin: string

    @Column()
    checkout: string

    @Column()
    lock_number: number

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}