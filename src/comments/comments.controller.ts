// src/comments/comments.controller.ts
import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust the path as necessary
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';

@Controller('articles/:slug/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Assuming you have a JWT guard for authentication
  async addComment(
    @Param('slug') slug: string,
    @Body() createCommentDto: CreateCommentDto,
  ) : Promise<CommentResponseDto> {
    const userId = 1; // Fake user ID

    return this.commentsService.createComment(slug, createCommentDto, userId);
  }
}
