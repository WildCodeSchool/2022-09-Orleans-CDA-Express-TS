import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Grade } from "./Grade";
import { Skill } from "./Skill";

@Entity()
export class Wilder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  city?: string;

  @OneToMany(() => Grade, (grade) => grade.wilder)
  grades: Grade[];

  @OneToMany(() => Skill, (skill) => skill.wilder)
  skills: Skill[];
}
