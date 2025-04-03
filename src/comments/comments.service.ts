import { Injectable } from '@nestjs/common';
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
  ) {}

  async createComment(slug: string, createCommentDto: CreateCommentDto, userId: number) : Promise<CommentResponseDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    
    const userResponse = new AuthorDto({
        username: user.username,
        bio: user.bio,
        image: user.image,
        following: false,
      });
    // const userResponse = new AuthorDto;
    // userResponse.username = user.username;
    // userResponse.bio = user.bio;
    // userResponse.image = user.image;
    // userResponse.following = false;

    const newComment = await this.commentRepository.create({
      body: createCommentDto.comment.body,
      author: userResponse,
    });
    await this.commentRepository.save(newComment);

    return {comment: newComment};
  }
}
