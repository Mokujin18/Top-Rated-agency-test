import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  userId: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export interface TokenConfig {
  [TokenType.ACCESS]: JwtConfig;
  [TokenType.REFRESH]: JwtConfig;
}
