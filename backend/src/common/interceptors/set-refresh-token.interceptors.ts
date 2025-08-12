import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENV } from '@/common/constants/env.constants';

@Injectable()
export class SetRefreshTokenInterceptor implements NestInterceptor {
  constructor(private readonly cookieOptions: any = {}) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.tokens && data.tokens.refreshToken) {
          const response = context.switchToHttp().getResponse();
          const { refreshToken, accessToken } = data.tokens;

          const defaultOptions = {
            httpOnly: true,
            secure: ENV.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: '/',
          };

          response.cookie('refreshToken', refreshToken, {
            ...defaultOptions,
            ...this.cookieOptions,
          });

          return {
            ...data,
            tokens: { accessToken },
          };
        }
        return data;
      }),
    );
  }
}
