import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordHelper } from '../security/password.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordHelper: PasswordHelper,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneBy({ username: username });

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.passwordHelper.isPasswordValid(
      user.password,
      pass,
    );

    if (user && isPasswordValid) {
      const { password, ...data } = user;
      return data;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
