import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  user?: UserDto;
  email?: string;
  username?: string;
  password?: string;
  bio?: string;
  image?: string;
}
