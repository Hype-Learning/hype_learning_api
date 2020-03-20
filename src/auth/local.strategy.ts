import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  private readonly logger = new Logger(AuthService.name);

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    this.logger.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}