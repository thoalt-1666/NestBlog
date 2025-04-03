// src/comments/comments.controller.ts
import { Controller, Post, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';

@Controller('articles/:slug/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async addComment(
    @Param('slug') slug: string,
    @Body() createCommentDto: CreateCommentDto,
  ) : Promise<CommentResponseDto> {
    const userId = 1; // Fake user ID

    return this.commentsService.createComment(slug, createCommentDto, userId);
  }
}
