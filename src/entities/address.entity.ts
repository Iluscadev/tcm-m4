import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { DataClientPersonal } from "./dataClientPersonal.entity";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  cep: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  town: string;

  @Column()
  state: string;

  @ManyToMany(
    () => DataClientPersonal,
    (data_client_personal) => data_client_personal.addresses
  )
  data_client_personal: DataClientPersonal[];
}

export default Address;
