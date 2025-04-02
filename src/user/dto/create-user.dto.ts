export class UserDto {
  username: string;
  email: string;
  password: string;
  bio?: string;
  image?: string;
  token?: string;
}

export class CreateUserDto {
  user: UserDto;
}
