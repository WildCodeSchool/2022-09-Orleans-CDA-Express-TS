import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Grade } from "./Grade";
import { Wilder } from "./Wilder";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Grade, (grade) => grade.skill)
  grades: Grade[];

  @ManyToOne(() => Wilder, (wilder) => wilder.skills)
  wilder: Wilder;
}
