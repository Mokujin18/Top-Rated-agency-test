import type { Tokens, User } from '@common/types/auth.ts';

export type AuthResponse = {
  data: {
    tokens: Tokens;
    user: User;
  };
};
