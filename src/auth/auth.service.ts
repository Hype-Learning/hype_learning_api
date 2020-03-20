import * as jwt from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './dto/jwt-payload.dto';
import { User } from 'src/users/user.entity';
import { RegistrationStatus } from './dto/registration-status.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AppConfigService } from 'src/config/app/config.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly appConfigService: AppConfigService) {}

  private readonly logger = new Logger(AuthService.name);
  
  async register(user: CreateUserDto) {
    let status: RegistrationStatus = {
      success: true,
      message: 'user register',
    };
    try {
      await this.usersService.register(user);
    } catch (err) {
      status = { success: false, message: err };
    }
    return status;
  }
  createToken(user: User) {
    const expiresIn = 3600;


    const accessToken: string = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
        this.appConfigService.secret,
      { expiresIn },
    );
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUserToken(payload: JwtPayload): Promise<User> {
    return await this.usersService.findById(payload.id);
  }
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.comparePassword(password)) {
      this.logger.log('password check success');
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}