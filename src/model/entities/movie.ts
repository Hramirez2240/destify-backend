import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity";
import { Actor } from "./actor";
import { Rating } from "./rating";

@Entity('movies')
export class Movie extends BaseEntity{
    @Column({ length: 255 })
    title: string;

    @Column()
    description: string;

    @Column()
    releaseDate: Date;

    @Column({ length: 100 })
    genre: string;

    @Column()
    duration: number;

    @Column()
    director: string;

    @OneToMany(() => Rating, rating => rating.movie, { cascade: true } )
    ratings?: Rating[];

    @ManyToMany(() => Actor, actor => actor.movies)
    @JoinTable({
        name: 'movie_actors',
        joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' }
    })
    actors?: Actor[];

    @Column({  nullable: true })
    image: string;
}