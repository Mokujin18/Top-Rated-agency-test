import { httpService } from '@common/services/httpService.ts';
import type { LoginForm } from '@modules/auth/pages/login/types.ts';
import type { RegistrationForm } from '@modules/auth/pages/registration/types.ts';
import type { AuthResponse } from '@modules/auth/authTypes.ts';

export const authApi = {
  login: async (data: LoginForm): Promise<AuthResponse> => {
    return httpService.post('/auth/login', data);
  },
  registration: async (data: RegistrationForm): Promise<AuthResponse> => {
    return httpService.post('/auth/register', data);
  },
};
