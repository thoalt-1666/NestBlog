import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleInputDto } from './dto/create-article.dto';
import { UpdateArticleInputDto } from './dto/update-article.dto';
import { User } from 'src/user/entities/user.entity';
import {
  ArticleDto,
  ArticleResponeDto,
  AuthorDto,
} from './dto/article-respone.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createArticleInputDto: CreateArticleInputDto,
    userId: number,
  ): Promise<ArticleResponeDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      const newArticle = this.articleRepository.create({
        title: createArticleInputDto.article.title,
        description: createArticleInputDto.article.description,
        body: createArticleInputDto.article.body,
        tagList: createArticleInputDto.article.tagList,
        authorId: user.id,
      });
      const savedArticle = await this.articleRepository.save(newArticle);
      const userResponse = new AuthorDto({
        username: user.username,
        bio: user.bio,
        image: user.image,
        following: false,
      });

      const articleContext = new ArticleDto();
      articleContext.id = savedArticle.id;
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
    } catch (err) {
      if (err instanceof Error) {
        throw new NotFoundException('Error creating comment: ' + err.message);
      } else {
        throw new NotFoundException('An unknown error occurred');
      }
    }
  }

  async update(
    id: number,
    updateArticleInputDto: UpdateArticleInputDto,
    userId: number,
  ): Promise<ArticleResponeDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updateArticle = await this.articleRepository.findOne({
      where: {
        id: id,
        authorId: userId,
      },
    });
    if (!updateArticle) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    try {
      if (updateArticleInputDto.article.title) {
        updateArticle.title = updateArticleInputDto.article.title;
      }
      if (updateArticleInputDto.article.description) {
        updateArticle.description = updateArticleInputDto.article.description;
      }
      if (updateArticleInputDto.article.body) {
        updateArticle.body = updateArticleInputDto.article.body;
      }
      const savedArticle = await this.articleRepository.save(updateArticle);
      const userResponse = new AuthorDto({
        username: user.username,
        bio: user.bio,
        image: user.image,
        following: false,
      });

      const articleContext = new ArticleDto();
      articleContext.id = savedArticle.id;
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
    } catch (err) {
      if (err instanceof Error) {
        throw new NotFoundException('Error update article: ' + err.message);
      } else {
        throw new NotFoundException('An unknown error occurred');
      }
    }
  }
}
