import { Column, Entity, ManyToMany } from "typeorm";
import { Movie } from "./movie";
import { BaseEntity } from "./base-entity";

@Entity('actors')
export class Actor extends BaseEntity {
  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column()
  birthDate: Date;

  @Column()
  nationality: string;

  @ManyToMany(() => Movie, movie => movie.actors)
  movies?: Movie[];

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}