import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard, RequestWithUser } from '../auth/guards/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';

@ApiTags('articles')
@Controller('articles')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':slug/comments')
  @ApiOperation({ summary: 'Post comment on slug' })
  @ApiBody({
    description: 'required comment with body',
    type: CreateCommentDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully create comment!',
    type: CommentResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async addComment(
    @Param('slug') slug: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req: RequestWithUser,
  ): Promise<CommentResponseDto> {
    const userId = req.user.id;
    return this.commentsService.createComment(slug, createCommentDto, userId);
  }
}
