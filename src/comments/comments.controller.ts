// src/comments/comments.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard, RequestWithUser } from '../auth/guards/jwt-auth.guard'; // Adjust the path as necessary
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';

@Controller('articles')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':slug/comments')
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
