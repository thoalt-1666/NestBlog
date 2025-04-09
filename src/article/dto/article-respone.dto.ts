export class AuthorDto {
  username: string;
  bio: string;
  image: string;
  following: boolean;
  constructor(partial: Partial<AuthorDto>) {
    Object.assign(this, partial);
  }
}
export class ArticleDto {
  id: number;
  title: string;
  description: string;
  body: string;
  tagList?: string[];
  createdAt?: string;
  updatedAt?: string;
  favorited: boolean;
  favoritesCount: number;
  author?: AuthorDto;
}

export class ArticleResponeDto {
  article: ArticleDto;
}
