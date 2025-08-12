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
  private readonly accessExpiresIn = '15m';
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
    } catch {
      throw new UnauthorizedException('Access token is expired or invalid');
    }
  }

  async decodeToken(
    token: string,
    tokenType: TokenType,
  ): Promise<TokenPayload> {
    try {
      const config = this.config[tokenType];
      return this.jwtService.verify(token, {
        secret: config.secret,
        ignoreExpiration: true,
      });
    } catch {
      throw new UnauthorizedException('Access token is expired or invalid');
    }
  }
}
