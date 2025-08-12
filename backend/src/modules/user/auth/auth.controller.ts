import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ENDPOINTS } from '@/common/constants/endpoints.constant';
import { API_OPERATION } from '@/common/constants/docs.constant';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  CurrentUser,
  RequestUser,
} from '@/common/decorators/current-user.decorator';
import { JwtGuard } from '@/common/guards/jwt.guard';
import { TokenType } from '@/common/types/token.type';
import { TokenTypeDecorator } from '@/common/decorators/token.decorator';
import { SetRefreshTokenInterceptor } from '@/common/interceptors/set-refresh-token.interceptors';

@ApiTags(ENDPOINTS.AUTH.BASE)
@Controller(ENDPOINTS.AUTH.BASE)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation(API_OPERATION.AUTH.LOGIN)
  @Post(ENDPOINTS.AUTH.LOGIN)
  @UseInterceptors(new SetRefreshTokenInterceptor())
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation(API_OPERATION.AUTH.REGISTER)
  @Post(ENDPOINTS.AUTH.REGISTER)
  @UseInterceptors(new SetRefreshTokenInterceptor())
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation(API_OPERATION.AUTH.REFRESH)
  @Post(ENDPOINTS.AUTH.REFRESH)
  @TokenTypeDecorator(TokenType.REFRESH)
  @UseGuards(JwtGuard)
  @UseInterceptors(new SetRefreshTokenInterceptor())
  refresh(@CurrentUser() user: RequestUser) {
    return this.authService.refresh(user);
  }

  @ApiOperation(API_OPERATION.AUTH.LOGOUT)
  @Post(ENDPOINTS.AUTH.LOGOUT)
  logout() {
    return this.authService.logout();
  }
}
