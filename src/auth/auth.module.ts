import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { SecurityModule } from '../security/security.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { LocalAuthGuard } from './local-auth.guard';

@Module({
  imports: [UserModule, SecurityModule],
  providers: [AuthService, LocalStrategy, LocalAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
