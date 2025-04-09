import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponseDto, CommentContextDto, AuthorDto } from './dto/comment-response.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createComment(commentSlug: string, createCommentDto: CreateCommentDto, userId: number): Promise<CommentResponseDto> {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) { throw new NotFoundException('User not found'); }

      const userResponse = new AuthorDto({
        username: user.username,
        bio: user.bio,
        image: user.image,
        following: false,
      });

      const newComment = this.commentRepository.create({
        slug: commentSlug,
        body: createCommentDto.comment.body,
        authorId: user.id,
      });

      await this.commentRepository.save(newComment);

      const commentContext = new CommentContextDto({
        id: newComment.id,
        createdAt: newComment.createdAt.toISOString(),
        updatedAt: newComment.updatedAt.toISOString(),
        body: newComment.body,
        author: userResponse,
      });

      const commentResponse = new CommentResponseDto({
        comment: commentContext,
      });

      return commentResponse;
    }
    catch (err) {
      throw new NotFoundException('Error creating comment: ' + err.message);
    }
  }
}
