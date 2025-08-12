import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from '@/common/exeption-filters/prisma.filter';
import { Logger } from 'nestjs-pino';
import { ENV } from '@/common/constants/env.constants';
import { ENDPOINTS } from '@/common/constants/endpoints.constant';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: false,
    }),
  );

  app.setGlobalPrefix(ENDPOINTS.BASE);

  app.useLogger(app.get(Logger));

  app.useGlobalFilters(new PrismaExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('test task')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(ENV.PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
