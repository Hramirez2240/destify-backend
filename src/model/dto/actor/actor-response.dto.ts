import { Transform, Type } from "class-transformer";
import { MovieResponseDto } from "../movie/movie-response.dto";

export class ActorResponseDto {
  id: number;
  firstName: string;
  lastName: string;

  @Transform(({ value }) => {
    if (value instanceof Date) {
      return value.toISOString().split('T')[0];
    }
    return value;
  })
  birthDate: Date;
  nationality: string;

  @Type(() => MovieResponseDto)
  movies: MovieResponseDto[];
  createdAt?: Date;
  updatedAt?: Date;
}