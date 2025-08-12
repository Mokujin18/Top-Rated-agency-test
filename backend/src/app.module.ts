import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { PrismaModule } from '@/database/prisma/prisma.module';
import { ENV } from '@/common/constants/env.constants';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from '@/modules/user/auth/auth.module';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: () => {
        const isProduction = ENV.NODE_ENV === 'production';
        return {
          pinoHttp: {
            transport: isProduction
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                  },
                  level: isProduction ? 'info' : 'debug',
                },
          },
        };
      },
      inject: [],
    }),

    PrismaModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
