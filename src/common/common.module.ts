import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Actor } from "src/model/entities/actor";
import { Movie } from "src/model/entities/movie";
import { Rating } from "src/model/entities/rating";
import { User } from "src/model/entities/user";
import { Repository } from "typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      ssl: process.env.POSTGRES_DB === 'neondb' ? true : false,
      synchronize: true,
      entities: [Actor, Movie, Rating, User],
    }),
    TypeOrmModule.forFeature([Actor, Movie, Rating, User]),
  ],
  providers: [Repository],
  exports: [Repository, TypeOrmModule, ConfigModule],
})
export class CommonModule {}