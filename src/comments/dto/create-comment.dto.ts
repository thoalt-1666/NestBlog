import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: 'Comment with body' })
  @IsNotEmpty()
  comment: {
    body: string;
  };
}
