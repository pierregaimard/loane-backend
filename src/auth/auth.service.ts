import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordHelper } from '../security/password.helper';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordHelper: PasswordHelper,
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
}
