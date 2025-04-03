import { Comment } from '../comment.entity';
export class AuthorDto {
    username: string;
    bio: string;
    image: string;
    following: boolean;
    constructor(partial: Partial<AuthorDto>) {
        Object.assign(this, partial);
      }
}
export class CommentContextDto {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: AuthorDto;
}
export class CommentResponseDto {
    comment: Comment;
}
  