import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { DataClientPersonal } from "./dataClientPersonal.entity";

@Entity("avaliations")
class Avaliation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  wheight: number;

  @Column()
  height: number;

  @Column()
  neck: string;

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
  cardio_freq: number;

  @Column()
  circumference: number;

  @Column()
  diameter: number;

  @Column()
  created_at: Date

  @Column()
  updated_at: Date

  @ManyToMany(
    () => DataClientPersonal,
    (data_client_personal) => data_client_personal.avaliations
  )
  data_client_personal: DataClientPersonal[];
}

export default Avaliation;