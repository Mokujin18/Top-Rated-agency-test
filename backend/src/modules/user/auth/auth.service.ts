import { CreateUserDto } from './../dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';
import { PrismaService } from '@/database/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtUtil } from '@/modules/user/auth/utils/jwt.util';
import { RequestUser } from '@/common/decorators/current-user.decorator';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtUtil: JwtUtil,
    private readonly prisma: PrismaService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tokens = await this.jwtUtil.createTokens({
      userId: user.id,
    });

    return {
      user,
      tokens,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const tokens = await this.jwtUtil.createTokens({
      userId: user.id,
    });

    return {
      user,
      tokens,
    };
  }

  async refresh(user: RequestUser) {
    const tokens = await this.jwtUtil.createTokens({
      userId: user.id,
    });

    return {
      user,
      ...tokens,
    };
  }

  async logout() {
    return { message: 'Logout successful' };
  }
}
