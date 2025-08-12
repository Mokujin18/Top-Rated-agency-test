import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ENDPOINTS } from '@/common/constants/endpoints.constant';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_OPERATION } from '@/common/constants/docs.constant';

@ApiTags(ENDPOINTS.USER.BASE)
@Controller(ENDPOINTS.USER.BASE)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation(API_OPERATION.USER.CREATE)
  @Post(ENDPOINTS.USER.CREATE)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation(API_OPERATION.USER.FIND_MANY)
  @Get(ENDPOINTS.USER.FIND_MANY)
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation(API_OPERATION.USER.FIND_ONE)
  @Get(ENDPOINTS.USER.FIND_ONE)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation(API_OPERATION.USER.UPDATE)
  @Patch(ENDPOINTS.USER.UPDATE)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation(API_OPERATION.USER.REMOVE)
  @Delete(ENDPOINTS.USER.REMOVE)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
