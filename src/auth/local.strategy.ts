import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException(
        "Oups! il me semble qu'il y a une petite erreur dans ton nom d'utilisateur ou ton mot de passe...",
      );
    }

    if (user.isActive === false) {
      throw new UnauthorizedException('Oups! ton utilisateur a été désactivé.');
    }

    return user;
  }
}
