import { Module } from "@nestjs/common";
import { CommonModule } from "src/common/common.module";
import { RatingService } from "./services/rating.service";
import { RatingController } from "./controllers/rating.controller";

@Module({
    imports: [CommonModule],
    providers: [RatingService],
    controllers: [RatingController]
})

export class RatingModule {}