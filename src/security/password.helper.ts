import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordHelper {
  async getHash(password: string): Promise<string> {
    try {
      return argon2.hash(password, {
        type: argon2.argon2id,
        hashLength: 50,
      });
    } catch (err) {
      throw err;
    }
  }

  async isPasswordValid(hash: string, password: string): Promise<boolean> {
    try {
      return argon2.verify(hash, password);
    } catch (err) {
      throw err;
    }
  }
}
