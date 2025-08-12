import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export type RequestUser = Omit<User, 'password'>;

const getUserByContext = (context: ExecutionContext): RequestUser => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): RequestUser => {
    return getUserByContext(context);
  },
);
