import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  body: string;
}

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  comment: CommentBodyDto;
}
