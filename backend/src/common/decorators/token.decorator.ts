import { SetMetadata } from '@nestjs/common';
import { TokenType } from '@/common/types/token.type';

export const TokenTypeDecorator = (tokenType: TokenType) => {
  return SetMetadata('tokenType', tokenType);
};
