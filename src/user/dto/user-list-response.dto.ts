import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../auth/dto/login-response.dto';

export class UserListResponseDto {
  @ApiProperty({
    type: [UserResponseDto],
    description: 'List of users',
    example: [
      {
        id: 1,
        username: 'johndoe',
        email: 'john@example.com',
        bio: 'Software developer',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ],
  })
  users: UserResponseDto[];
}
