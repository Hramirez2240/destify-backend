import { Transform, Type } from 'class-transformer';
import { ActorResponseDto } from '../actor/actor-response.dto';

export class MovieResponseDto {
  title: string;
  description: string;

  @Transform(({ value }) => {
    if (value instanceof Date) {
      return value.toISOString().split('T')[0];
    }
    return value;
  })
  releaseDate: Date;
  genre: string;
  duration: number;
  director: string;

  @Type(() => ActorResponseDto)
  actors: ActorResponseDto[];
}
