import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'johndoe',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password123',
    required: true,
    minLength: 6,
  })
  password: string;

  @ApiProperty({
    description: 'Bio of the user',
    example: 'I am a software developer',
    required: false,
  })
  bio?: string;

  @ApiProperty({
    description: 'Profile image URL of the user',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  image?: string;

  @ApiProperty({
    description: 'Authentication token',
    example: 'jwt.token.here',
    required: false,
  })
  token?: string;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'User object containing user details',
    type: UserDto,
  })
  user: UserDto;
}
