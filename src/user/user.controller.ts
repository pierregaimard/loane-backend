import {
  BadRequestException,
  NotFoundException,
  ParseIntPipe,
  Body,
  Controller,
  Param,
  Get,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.create.dto';
import { PasswordHelper } from '../security/password.helper';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private passwordHelper: PasswordHelper,
  ) {}

  @Post()
  async create(@Body() user: UserCreateDto) {
    user.password = await this.passwordHelper.getHash(user.password);

    try {
      return await this.userService.create(user);
    } catch (err) {
      throw new BadRequestException(err.sqlMessage);
    }
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    const { password, ...data } = user;

    return data;
  }
}
