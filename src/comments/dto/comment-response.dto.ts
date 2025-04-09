import { ApiProperty } from '@nestjs/swagger';

export class AuthorDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  bio: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  following: boolean;

  constructor(partial: Partial<AuthorDto>) {
    Object.assign(this, partial);
  }
}
export class CommentContextDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
  @ApiProperty()
  body: string;
  @ApiProperty()
  author: AuthorDto;

  constructor(partial: Partial<CommentContextDto>) {
    Object.assign(this, partial);
  }
}
export class CommentResponseDto {
  @ApiProperty()
  comment: CommentContextDto;

  constructor(partial: Partial<CommentResponseDto>) {
    Object.assign(this, partial);
  }
}
