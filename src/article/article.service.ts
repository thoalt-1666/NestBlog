import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>
  ) {}

  findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = this.articleRepository.create(createArticleDto.article);

    const savedArticle = await this.articleRepository.save(article);
    return savedArticle;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    if (updateArticleDto.article) {
      await this.articleRepository.update(id, updateArticleDto.article);
    }
    return this.findOne(id);
  }
}
