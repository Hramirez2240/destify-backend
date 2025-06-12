import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base-entity";
import { Movie } from "./movie";

@Entity('ratings')
export class Rating extends BaseEntity {
  @Column({ type: 'decimal', precision: 3, scale: 2 })
  rating: number;

  @Column({ length: 500, nullable: true })
  review: string;

  @Column({ length: 255, nullable: true })
  reviewerName: string;

  @Column()
  movieId: number;

  @ManyToOne(() => Movie, movie => movie.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movieId' })
  movie: Movie;
}