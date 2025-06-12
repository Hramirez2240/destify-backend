import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/model/dto/user/create-user.dto";
import { UserResponseDto } from "src/model/dto/user/user-response.dto";
import { User } from "src/model/entities/user";
import { Repository } from "typeorm";

@Injectable()
export class UserService{
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

    async create(dto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(dto);
        return await this.userRepository.save(user);
    }

    async findById(id: number): Promise<UserResponseDto>{
        const user = await this.userRepository.findOneBy({id: id});
        if(!user) throw new UnauthorizedException("User not found");
        return user;
    }

    async findByEmail(email: string): Promise<UserResponseDto>{
        return await this.userRepository.findOneBy({email: email});
    }
}