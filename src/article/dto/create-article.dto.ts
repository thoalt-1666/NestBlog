export class ArticleDto {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  }
  
  export class CreateArticleDto {
    article: ArticleDto;
  } 