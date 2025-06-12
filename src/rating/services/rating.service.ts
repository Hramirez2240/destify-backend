import { HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Constants } from "src/config/constants";
import { BaseResponseDto } from "src/model/dto/common/base-response.dto";
import { CreateMovieRatingDto } from "src/model/dto/rating/create-movie-rating.dto";
import { RatingResponseDto } from "src/model/dto/rating/rating-response.dto";
import { UpdateMovieRatingDto } from "src/model/dto/rating/update-movie-rating.dto";
import { Movie } from "src/model/entities/movie";
import { Rating } from "src/model/entities/rating";
import { Repository } from "typeorm";

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,

    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<BaseResponseDto<RatingResponseDto[]>> {
    try {
      const ratings = await this.ratingRepository.find({
        relations: ['movie'],
      });
      const ratingsResponse = plainToInstance(RatingResponseDto, ratings);
      return {
        statusCode: HttpStatus.OK,
        data: ratingsResponse,
        message: Constants.responseMessage.SUCCESS,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async addToMovie(
    dto: CreateMovieRatingDto,
  ): Promise<BaseResponseDto<RatingResponseDto>> {
    try {
      const movie = await this.movieRepository.findOneBy({ id: dto.movieId });
      if (!movie)
        throw new InternalServerErrorException(
          `Movie with id ${dto.movieId} not found`,
        );

      const rating = this.ratingRepository.create(dto);
      rating.movie = movie;
      const savedRating = await this.ratingRepository.save(rating);
      const savedRatingResponse = plainToInstance(
        RatingResponseDto,
        savedRating,
      );
      return {
        statusCode: HttpStatus.CREATED,
        data: savedRatingResponse,
        message: Constants.responseMessage.SUCCESS,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, dto: UpdateMovieRatingDto): Promise<BaseResponseDto<RatingResponseDto>>{
    try{
        if(dto.movieId){
            const movie = await this.movieRepository.findOneBy({id: dto.movieId});
            if(!movie) throw new InternalServerErrorException(`Movie with id ${dto.movieId} not found`);
        }
        const rating = await this.ratingRepository.findOneBy({id: id});
        if(!rating) throw new InternalServerErrorException(`Rating with id ${id} not found`);        
        const updatedRating = this.ratingRepository.merge(rating, dto);
        const savedRating = await this.ratingRepository.save(updatedRating);
        const savedRatingResponse = plainToInstance(RatingResponseDto, savedRating);
        return {
            statusCode: HttpStatus.OK,
            data: savedRatingResponse,
            message: Constants.responseMessage.SUCCESS
        }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number): Promise<void>{
    try{
        const rating = await this.ratingRepository.findOneBy({id: id});
        if(!rating) throw new InternalServerErrorException(`Rating with id ${id} not found`);
        await this.ratingRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}