import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { BaseResponseDto } from "src/model/dto/common/base-response.dto";
import { CreateMovieRatingDto } from "src/model/dto/rating/create-movie-rating.dto";
import { RatingService } from "../services/rating.service";
import { RatingResponseDto } from "src/model/dto/rating/rating-response.dto";
import { UpdateMovieRatingDto } from "src/model/dto/rating/update-movie-rating.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Public } from "src/auth/decorators/public.decorator";

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Public()
  @ApiOperation({ summary: 'Get all movie ratings' })
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the movies rating list',
  })
  async getAll(): Promise<BaseResponseDto<RatingResponseDto[]>> {
    return await this.ratingService.findAll();
  }

  @ApiOperation({ summary: 'Add rating to specific movie' })
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Returns true if rating was added to movie successfully',
  })
  async addToMovie(@Body() dto: CreateMovieRatingDto): Promise<BaseResponseDto<RatingResponseDto>> {
    return await this.ratingService.addToMovie(dto);
  }

  @ApiOperation({ summary: 'Update rating' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns rating if it was updated successfully',
  })
  async update(@Param('id') id: number, @Body() dto: UpdateMovieRatingDto): Promise<BaseResponseDto<RatingResponseDto>> {
    return await this.ratingService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete rating' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Returns nothing if rating was deleted successfully',
  })
  async delete(@Param('id') id: number): Promise<void> {
    await this.ratingService.delete(id);
  }
}