import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { DataClientPersonal } from "./dataClientPersonal.entity";

@Entity("journals")
class Journal {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  exercise: string;

  @Column()
  time: string;

  @Column()
  repetitions: number;

  @ManyToMany(
    () => DataClientPersonal,
    (data_client_personal) => data_client_personal.journals
  )
  data_client_personal: DataClientPersonal[];
}

export default Journal;
