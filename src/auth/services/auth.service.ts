import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/model/dto/auth/login.dto';
import { AuthResponseDto } from 'src/model/dto/auth/auth-response.dto';
import { RegisterDto } from 'src/model/dto/auth/register.dto';
import { BaseResponseDto } from 'src/model/dto/common/base-response.dto';
import { Constants } from 'src/config/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(dto: LoginDto): Promise<BaseResponseDto<AuthResponseDto>> {
    const user = await this.validateUser(dto.email, dto.password);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = { email: user.email, sub: user.id };
    const authResponseDto = {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
    
    return {
      statusCode: HttpStatus.OK,
      message: Constants.responseMessage.SUCCESS,
      data: authResponseDto,
    }
  }

  async register(dto: RegisterDto): Promise<BaseResponseDto<AuthResponseDto>> {
    const user = await this.userService.findByEmail(dto.email);

    if (user) throw new ConflictException('User already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.userService.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    const payload = { email: newUser.email, sub: newUser.id };
    const authResponseDto = {
      access_token: this.jwtService.sign(payload),
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    };

    return {
      statusCode: HttpStatus.CREATED,
      message: Constants.responseMessage.SUCCESS,
      data: authResponseDto,
    }
  }
}
