import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { DataClientPersonal } from "./dataClientPersonal.entities";
import { v4 as uuid } from "uuid";  

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

  /*@ManyToMany(
    () => DataClientPersonal,
    (data_client_personal) => data_client_personal.journals
  )*/

  //data_client_personal: DataClientPersonal[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Journal;
