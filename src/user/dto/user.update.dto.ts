import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entity/user.entity';

export class UserUpdateDto extends PartialType<User>(User) {}
