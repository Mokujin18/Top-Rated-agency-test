import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PinoLogger } from 'nestjs-pino';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new PinoLogger({
    renameContext: 'PrismaExceptionFilter',
  });

  catch(exception: Prisma.PrismaClientKnownRequestError) {
    this.logger.error(exception);

    if (exception.code === 'P2025') {
      const model = exception.meta?.modelName;
      const modelName = typeof model === 'string' ? model : 'Document';

      const details = `${modelName} not found`;
      throw new NotFoundException(details);
    }
    if (exception.code === 'P2002') {
      const details = exception.meta?.message;

      throw new BadRequestException(details);
    }
  }
}
