import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Constants } from 'src/config/constants';
import { ActorResponseDto } from 'src/model/dto/actor/actor-response.dto';
import { BaseResponseDto } from 'src/model/dto/common/base-response.dto';
import { CreateMovieDto } from 'src/model/dto/movie/create-movie.dto';
import { MovieResponseDto } from 'src/model/dto/movie/movie-response.dto';
import { UpdateMovieDto } from 'src/model/dto/movie/update-movie.dto';
import { Actor } from 'src/model/entities/actor';
import { Movie } from 'src/model/entities/movie';
import { In, Repository } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,

    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async findAll(): Promise<BaseResponseDto<MovieResponseDto[]>> {
    const movies = await this.movieRepository.find({
      relations: ['actors', 'ratings'],
    });
    const moviesResponse = plainToInstance(MovieResponseDto, movies);
    return {
      statusCode: HttpStatus.OK,
      data: moviesResponse,
      message: Constants.responseMessage.SUCCESS,
    };
  }

  async create(
    dto: CreateMovieDto,
  ): Promise<BaseResponseDto<MovieResponseDto>> {
    const movieData = this.mapDtoToEntity(dto);
    try {
      const movie = this.movieRepository.create(movieData);
      const actors = await this.getActors(dto.actors);

      movie.actors = actors;
      const savedMovie = await this.movieRepository.save(movie);
      const savedMovieResponse = plainToInstance(MovieResponseDto, savedMovie);
      return {
        statusCode: HttpStatus.CREATED,
        data: savedMovieResponse,
        message: Constants.responseMessage.SUCCESS,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: number,
    dto: UpdateMovieDto,
  ): Promise<BaseResponseDto<MovieResponseDto>> {
    try {
      const movie = await this.movieRepository.findOne({
        where: { id },
        relations: ['actors'],
      });
      if (!movie)
        throw new InternalServerErrorException(`Movie with id ${id} not found`);
      if (dto.actors.length > 0) {
        const actors = await this.getActors(dto.actors);
        movie.actors = actors;
      }
      const updateMovie = this.mapDtoToEntity(dto);
      const updatedMovie = this.movieRepository.merge(movie, updateMovie); 
      const savedMovie = await this.movieRepository.save(updatedMovie);
      const savedMovieResponse = plainToInstance(MovieResponseDto, savedMovie);
      return {
        statusCode: HttpStatus.OK,
        data: savedMovieResponse,
        message: Constants.responseMessage.SUCCESS,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const movie = await this.movieRepository.findOneBy({ id: id });
      if (!movie)
        throw new InternalServerErrorException(`Movie with id ${id} not found`);
      await this.movieRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findActorsByMovie(
    id: number,
  ): Promise<BaseResponseDto<ActorResponseDto[]>> {
    try {
      const movie = await this.movieRepository.findOneBy({ id: id });
      if (!movie)
        throw new InternalServerErrorException(`Movie with id ${id} not found`);
      const actors = await this.actorRepository.find({
        relations: ['movies'],
        where: { movies: { id: id } },
      });
      const actorsResponse = plainToInstance(ActorResponseDto, actors);
      return {
        statusCode: HttpStatus.OK,
        data: actorsResponse,
        message: Constants.responseMessage.SUCCESS,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private mapDtoToEntity(dto: CreateMovieDto | UpdateMovieDto): Partial<Movie> {
    const { title, description, releaseDate, genre, duration, director } = dto;
    return { title, description, releaseDate, genre, duration, director };
  }

  private async getActors(actorsId: number[]): Promise<Actor[]> {
    const actors = await this.actorRepository.findBy({ id: In(actorsId) });
    if (actors.length != actorsId.length)
      throw new InternalServerErrorException('Some actors were not found');
    return actors;
  }
}
