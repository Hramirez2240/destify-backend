import { MovieResponseDto } from "../movie/movie-response.dto";

export class RatingResponseDto{
    id: string;
    rating: number;
    review: string;
    reviewerName: string;
    movie: MovieResponseDto;
    createdAt: Date;
    updatedAt: Date;
}