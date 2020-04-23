import {
  Controller,
  Body,
  ValidationPipe,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Res,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from '../users/user.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { UserVM } from './dto/user.vm';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  signUp(@Body(ValidationPipe) credentialsDto: CredentialsDto): Promise<User> {
    return this.authService.signUp(credentialsDto);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @Post('/signin')
  signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<UserVM> {
    return this.authService.signIn(signInDto);
  }
}
