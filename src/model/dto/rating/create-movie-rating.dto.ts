import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateMovieRatingDto{
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @Max(10)
    @IsNotEmpty()
    rating: number;

    @IsString()
    @IsOptional()
    review: string;

    @IsString()
    @IsOptional()
    reviewerName: string;

    @IsInt()
    @IsNotEmpty()
    movieId: number;
}