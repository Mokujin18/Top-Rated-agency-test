import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtUtil } from '@/modules/user/auth/utils/jwt.util';
import { UserService } from '@/modules/user/user.service';
import { TokenType } from '@/common/types/token.type';
import { RequestUser } from '@/common/decorators/current-user.decorator';

type RequestWithUser = Request & { user: RequestUser };

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtUtil: JwtUtil,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    const tokenType = this.getTokenTypeFromContext(context);

    const token = this.getToken(context);

    const { userId } =
      tokenType === TokenType.ACCESS
        ? await this.jwtUtil.validateToken(token, TokenType.ACCESS)
        : await this.jwtUtil.decodeToken(token, TokenType.ACCESS);

    request.user = await this.userService.findOne(userId);
    return true;
  }

  private getToken(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Authorization header is required');
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Authorization header is invalid');
    }

    return token;
  }

  private getTokenFromCookie(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    const cookie = request.cookies.refreshToken;
    if (!cookie) {
      throw new UnauthorizedException('Refresh token is required');
    }
    return cookie;
  }

  private getTokenTypeFromContext(context: ExecutionContext): TokenType {
    const handler = context.getHandler();
    const requiredTokenType = Reflect.getMetadata('tokenType', handler);

    return requiredTokenType || TokenType.ACCESS;
  }
}
