import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";
import { DataClientPersonal } from "./dataClientPersonal.entities";

@Entity()
export class FiscalAvaliation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  neck: number;

  @Column()
  waist: number;

  @Column()
  bust: number;

  @Column()
  hip: number;

  @Column()
  arm_right: number;

  @Column()
  arm_left: number;

  @Column()
  leg_right: number;

  @Column()
  leg_left: number;

  @Column()
  cardio_freq: string;

  @Column()
  circumference: string;

  @Column()
  diameter: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToMany(
    () => DataClientPersonal,
    (data_client_personal) => data_client_personal.fiscal_avaliation
  )
  data_clients_personals: DataClientPersonal[];
}

export default FiscalAvaliation;
