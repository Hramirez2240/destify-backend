import { Module } from "@nestjs/common";
import { MovieService } from "./services/movie.service";
import { MovieController } from "./controllers/movie.controller";
import { CommonModule } from "src/common/common.module";

@Module({
    imports: [CommonModule],
    providers: [MovieService],
    controllers: [MovieController]
})

export class MovieModule {}