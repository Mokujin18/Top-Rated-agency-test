import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../dto/create-user.dto';

export class LoginDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
