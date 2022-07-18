import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import Address from "./address.entity";
import Journal from "./journal.entity";

@Entity()
export class DataClientPersonal {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: string;

  @Column()
  password: string;

  @Column()
  phone_number: string;

  @Column()
  status: boolean;

  @Column()
  adm: boolean;

  @Column()
  plan: string;

  @Column()
  checkin: string;

  @Column()
  checkout: string;

  @Column()
  lock_number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Address, (address) => address.data_clients_personals)
  @JoinTable()
  addresses: Address[];

  @ManyToMany(() => Journal, (journal) => journal.data_client_personal)
  @JoinTable()
  journals: Journal[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
