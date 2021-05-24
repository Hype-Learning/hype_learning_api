import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from '../users/user.entity';
import { JwtPayload } from './dto/jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { UserVM } from './dto/user.vm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(credentialsDto: CredentialsDto): Promise<User> {
    return await this.userRepository.signUp(credentialsDto);
  }

  async signIn(signInDto: SignInDto): Promise<UserVM> {
    const email = await this.userRepository.validatePassword(signInDto);

    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user.isBlocked) {
      throw new UnauthorizedException('Jesteś zbanowany, typie');
    }

    const payload: JwtPayload = { email };
    const accessToken = this.jwtService.sign(payload);
    const response = new UserVM();
    response.email = user.email;
    response.id = user.id;
    response.firstName = user.firstName;
    response.lastName = user.lastName;
    response.role = user.role;
    response.isBlocked = user.isBlocked;
    response.token = accessToken;
    response.fileUrl = user.fileUrl;
    return response;
  }
}
