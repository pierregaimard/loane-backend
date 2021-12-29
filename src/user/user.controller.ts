import {
  BadRequestException,
  NotFoundException,
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put
} from '@nestjs/common';
import { UserService } from './user.service';
import { PasswordHelper } from '../security/password.helper';
import { User } from './entity/user.entity';
import { UserUpdateDto } from './dto/user.update.dto';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private passwordHelper: PasswordHelper,
  ) {}

  @Post()
  async create(@Body() user: User) {
    user.password = await this.passwordHelper.getHash(user.password);

    try {
      const { password, ...resource } = await this.userService.save(user);
      return resource;
    } catch (err) {
      throw new BadRequestException(err.sqlMessage);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() userUpdateDto: UserUpdateDto) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new BadRequestException(`L'utilisateur n°${id} n'existe pas`);
    }

    userUpdateDto.id = id;

    if (userUpdateDto.password) {
      userUpdateDto.password = await this.passwordHelper.getHash(
        userUpdateDto.password,
      );
    }

    try {
      await this.userService.save(userUpdateDto);
      const { password, ...data } = await this.userService.findOne(id);
      return data;
    } catch (err) {
      throw new BadRequestException(err.sqlMessage);
    }
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    const { password, ...data } = user;

    return data;
  }
}
