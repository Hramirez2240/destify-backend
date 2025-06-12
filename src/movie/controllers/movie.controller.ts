import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/model/dto/common/base-response.dto';
import { CreateMovieDto } from 'src/model/dto/movie/create-movie.dto';
import { MovieResponseDto } from 'src/model/dto/movie/movie-response.dto';
import { UpdateMovieDto } from 'src/model/dto/movie/update-movie.dto';
import { ActorResponseDto } from 'src/model/dto/actor/actor-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Public()
  @ApiOperation({ summary: 'Get all movies' })
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the movies list',
  })
  async getAll(): Promise<BaseResponseDto<MovieResponseDto[]>> {
    return await this.movieService.findAll();
  }

  @ApiOperation({ summary: 'Create movie' })
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Returns true if movie was created',
  })
  async create(
    @Body() dto: CreateMovieDto,
  ): Promise<BaseResponseDto<MovieResponseDto>> {
    return await this.movieService.create(dto);
  }

  @ApiOperation({ summary: 'Update movie' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns movie if it was updated successfully',
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateMovieDto,
  ): Promise<BaseResponseDto<MovieResponseDto>> {
    return await this.movieService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete movie' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Returns nothing if movie was deleted successfully',
  })
  async delete(@Param('id') id: number): Promise<void> {
    await this.movieService.delete(id);
  }

  @Public()
  @ApiOperation({ summary: 'Get actors by movie' })
  @Get(':id/actors')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns actors list of movie',
  })
  async getActorsByMovie(
    @Param('id') id: number,
  ): Promise<BaseResponseDto<ActorResponseDto[]>> {
    return await this.movieService.findActorsByMovie(id);
  }
}
