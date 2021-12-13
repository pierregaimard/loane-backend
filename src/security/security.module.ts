import { Module } from '@nestjs/common';
import { PasswordHelper } from './password.helper';

@Module({
  providers: [PasswordHelper],
  exports: [PasswordHelper],
})
export class SecurityModule {}
