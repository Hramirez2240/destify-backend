import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ActorService } from '../services/actor.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateActorDto } from 'src/model/dto/actor/create-actor.dto';
import { BaseResponseDto } from 'src/model/dto/common/base-response.dto';
import { ActorResponseDto } from 'src/model/dto/actor/actor-response.dto';
import { UpdateActorDto } from 'src/model/dto/actor/update-actor.dto';
import { MovieResponseDto } from 'src/model/dto/movie/movie-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Public()
  @ApiOperation({ summary: 'Get all actors' })
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the actors list',
  })
  async getAll(): Promise<BaseResponseDto<ActorResponseDto[]>> {
    return await this.actorService.findAll();
  }

  @ApiOperation({ summary: 'Create actor' })
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Returns the created actor',
  })
  async create(
    @Body() dto: CreateActorDto,
  ): Promise<BaseResponseDto<ActorResponseDto>> {
    return await this.actorService.create(dto);
  }

  @ApiOperation({ summary: 'Update actor' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns actor if it was updated successfully',
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateActorDto,
  ): Promise<BaseResponseDto<ActorResponseDto>> {
    return await this.actorService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete actor' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Returns nothing if actor was deleted successfully',
  })
  async delete(@Param('id') id: number): Promise<void> {
    await this.actorService.delete(id);
  }
  
  @Public()
  @ApiOperation({ summary: 'Get movies an actor has been in' })
  @Get(':id/movies')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns movies an actor has been in',
  })
  async findMoviesByActor(@Param('id') id: number): Promise<BaseResponseDto<MovieResponseDto[]>> {
    return await this.actorService.findMoviesByActor(id);
  }
}
