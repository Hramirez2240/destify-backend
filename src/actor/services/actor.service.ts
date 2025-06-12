import { HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Constants } from "src/config/constants";
import { ActorResponseDto } from "src/model/dto/actor/actor-response.dto";
import { CreateActorDto } from "src/model/dto/actor/create-actor.dto";
import { UpdateActorDto } from "src/model/dto/actor/update-actor.dto";
import { BaseResponseDto } from "src/model/dto/common/base-response.dto";
import { MovieResponseDto } from "src/model/dto/movie/movie-response.dto";
import { Actor } from "src/model/entities/actor";
import { Movie } from "src/model/entities/movie";
import { Repository } from "typeorm";

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,

    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<BaseResponseDto<ActorResponseDto[]>> {
    try {
      const actors = await this.actorRepository.find({ relations: ['movies'] });
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

  async create(
    dto: CreateActorDto,
  ): Promise<BaseResponseDto<ActorResponseDto>> {
    const actor = this.actorRepository.create(dto);
    try {
      const savedActor = await this.actorRepository.save(actor);
      const savedActorResponse = plainToInstance(ActorResponseDto, savedActor);
      return {
        statusCode: HttpStatus.CREATED,
        data: savedActorResponse,
        message: Constants.responseMessage.SUCCESS,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: number,
    dto: UpdateActorDto,
  ): Promise<BaseResponseDto<ActorResponseDto>> {
    try {
      const actor = await this.actorRepository.findOneBy({ id: id });
      if (!actor)
        throw new InternalServerErrorException(`Actor with id ${id} not found`);
      const updatingActor = this.actorRepository.merge(actor, dto);
      const savedActor = await this.actorRepository.save(updatingActor);
      const savedActorResponse = plainToInstance(ActorResponseDto, savedActor);
      return {
        statusCode: HttpStatus.OK,
        data: savedActorResponse,
        message: Constants.responseMessage.SUCCESS,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const actor = await this.actorRepository.findOneBy({ id: id });
      if (!actor)
        throw new InternalServerErrorException(
          `Actor with id ${id} not found`,
        );
      await this.actorRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findMoviesByActor(id: number): Promise<BaseResponseDto<MovieResponseDto[]>>{
    try{
      const actor = await this.actorRepository.findOneBy({ id: id });
      if(!actor) throw new InternalServerErrorException(`Actor with id ${id} not found`);
      const movies = await this.movieRepository.find({
        relations: ['actors'],
        where: { actors: { id: id } },
      });
      const moviesResponse = plainToInstance(MovieResponseDto, movies);
      return {
        statusCode: HttpStatus.OK,
        data: moviesResponse,
        message: Constants.responseMessage.SUCCESS,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}