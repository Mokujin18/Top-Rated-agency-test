import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtUtil } from '@/modules/user/auth/utils/jwt.util';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '@/modules/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtUtil, JwtService],
  imports: [UserModule],
})
export class AuthModule {}
