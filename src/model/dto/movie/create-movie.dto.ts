import { IsArray, IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateMovieDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDateString()
    @IsNotEmpty()
    releaseDate: Date;

    @IsString()
    @IsNotEmpty()
    genre: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    duration: number;

    @IsString()
    @IsNotEmpty()
    director: string;

    @IsArray()
    @IsNumber({}, {each: true})
    @IsNotEmpty()
    actors?: number[];
}