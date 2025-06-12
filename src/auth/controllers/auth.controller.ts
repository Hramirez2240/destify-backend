import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoginDto } from "src/model/dto/auth/login.dto";
import { BaseResponseDto } from "src/model/dto/common/base-response.dto";
import { AuthResponseDto } from "src/model/dto/auth/auth-response.dto";
import { RegisterDto } from "src/model/dto/auth/register.dto";
import { Public } from "../decorators/public.decorator";

@Controller("auth")
export class AuthController{
    constructor(private readonly authService: AuthService) {}

    @Public()
    @ApiOperation({ summary: 'Login user' })
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User logged in successfully',
    })
     async login(@Body() dto: LoginDto): Promise<BaseResponseDto<AuthResponseDto>>{
        return this.authService.login(dto);
    }

    @Public()
    @ApiOperation({ summary: 'Register user' })
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'User registered successfully',
    })
    async register(@Body() dto: RegisterDto): Promise<BaseResponseDto<AuthResponseDto>>{
        return this.authService.register(dto);
    }
}