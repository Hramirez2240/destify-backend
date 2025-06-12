import { Module } from "@nestjs/common";
import { ActorService } from "./services/actor.service";
import { ActorController } from "./controllers/actor.controller";
import { CommonModule } from "src/common/common.module";

@Module({
    imports: [CommonModule],
    providers: [ActorService],
    controllers: [ActorController]
})

export class ActorModule {}