import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  TokenConfig,
  TokenPayload,
  TokenType,
} from '@/common/types/token.type';
import { ENV } from '@/common/constants/env.constants';

@Injectable()
export class JwtUtil {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;
  private readonly accessExpiresIn = '1d';
  private readonly refreshExpiresIn = '7d';
  private readonly config: TokenConfig;

  constructor(private readonly jwtService: JwtService) {
    this.accessSecret = ENV.JWT_ACCESS_SECRET_KEY;
    this.refreshSecret = ENV.JWT_REFRESH_SECRET_KEY;

    this.config = {
      [TokenType.ACCESS]: {
        secret: this.accessSecret,
        expiresIn: this.accessExpiresIn,
      },
      [TokenType.REFRESH]: {
        secret: this.refreshSecret,
        expiresIn: this.refreshExpiresIn,
      },
    };
  }

  async createToken(
    payload: TokenPayload,
    tokenType: TokenType,
  ): Promise<string> {
    const config = this.config[tokenType];
    return this.jwtService.sign(payload, {
      secret: config.secret,
      expiresIn: config.expiresIn,
    });
  }

  async createTokens(
    payload: TokenPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.createToken(payload, TokenType.ACCESS);
    const refreshToken = await this.createToken(payload, TokenType.REFRESH);
    return { accessToken, refreshToken };
  }

  async validateToken(
    token: string,
    tokenType: TokenType,
  ): Promise<TokenPayload> {
    try {
      const config = this.config[tokenType];
      return this.jwtService.verify(token, { secret: config.secret });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Invalid or expired token';
      throw new UnauthorizedException(message);
    }
  }
}
