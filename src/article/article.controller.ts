import { Controller, Get, Param, Post, Put, Body } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get('findAll')
    async findAll(): Promise<Article[]> {
        return this.articleService.findAll();
    }

    @Get('findOne/:id')
    async findOne(@Param('id') id: string): Promise<Article> {
        return this.articleService.findOne(parseInt(id));
    }

    @Post('create')
    async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
        return this.articleService.create(createArticleDto);
    }

    @Put('update/:id')
    async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto): Promise<Article> {
        return this.articleService.update(parseInt(id), updateArticleDto);
    }
}