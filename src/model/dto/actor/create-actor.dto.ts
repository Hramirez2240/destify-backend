import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateActorDto{
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsDateString()
    @IsNotEmpty()
    birthDate: Date;

    @IsString()
    @IsNotEmpty()
    nationality: string;
}