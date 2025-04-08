import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from 'src/user/entities/user.entity';
import { ArticleDto, ArticleResponeDto, AuthorDto } from './dto/article-respone.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createArticleDto: CreateArticleDto, userId: number): Promise<ArticleResponeDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    const newArticle = this.articleRepository.create({
      title: createArticleDto.article.title,
      description: createArticleDto.article.description,
      body: createArticleDto.article.body,
      tagList: createArticleDto.article.tagList,
      authorId: user.id
    });
    const savedArticle = await this.articleRepository.save(newArticle);
    const userResponse = new AuthorDto({
      username: user.username,
      bio: user.bio,
      image: user.image,
      following: false,
    });

    const articleContext = new ArticleDto();
    articleContext.id = savedArticle.id
    articleContext.title = savedArticle.title;
    articleContext.description = savedArticle.description;
    articleContext.body = savedArticle.body;
    articleContext.tagList = savedArticle.tagList;
    articleContext.author = userResponse;
    articleContext.createdAt = savedArticle.createdAt.toISOString();
    articleContext.updatedAt = savedArticle.updatedAt.toISOString();

    const articleRespone = new ArticleResponeDto();
    articleRespone.article = articleContext
    return articleRespone;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto, userId: number): Promise<ArticleResponeDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const updateArticle = await this.articleRepository.findOne({ 
      where: {
         id: id, 
         authorId: userId 
        }
       });
    if (!updateArticle) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    if (updateArticleDto.article.title) {
      updateArticle.title = updateArticleDto.article.title

    }
    if (updateArticleDto.article.description) {
      updateArticle.description = updateArticleDto.article.description

    }
    if (updateArticleDto.article.body) {
      updateArticle.body = updateArticleDto.article.body

    }
    const savedArticle = await this.articleRepository.save(updateArticle);
    const userResponse = new AuthorDto({
      username: user.username,
      bio: user.bio,
      image: user.image,
      following: false,
    });

    const articleContext = new ArticleDto();
    articleContext.id = savedArticle.id
    articleContext.title = savedArticle.title;
    articleContext.description = savedArticle.description;
    articleContext.body = savedArticle.body;
    articleContext.tagList = savedArticle.tagList;
    articleContext.author = userResponse;
    articleContext.createdAt = savedArticle.createdAt.toISOString();
    articleContext.updatedAt = savedArticle.updatedAt.toISOString();

    const articleRespone = new ArticleResponeDto();
    articleRespone.article = articleContext;
    return articleRespone;
  }
}
