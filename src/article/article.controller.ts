import { Controller, Get, Put, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard, RequestWithUser } from 'src/auth/guards/jwt-auth.guard';
import { ArticleResponeDto } from './dto/article-respone.dto';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post('create')
    @UseGuards(JwtAuthGuard)
    async create(
        @Body() createArticleDto: CreateArticleDto, 
        @Request() req: RequestWithUser
    ): Promise<ArticleResponeDto> {
        const userId = req.user.id;
        return this.articleService.create(createArticleDto, userId);
    }

    @Put('update/:id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Param('id') id: string, 
        @Body() updateArticleDto: UpdateArticleDto,
        @Request() req: RequestWithUser
    ): Promise<ArticleResponeDto> {
        const userId = req.user.id;
        return this.articleService.update(parseInt(id), updateArticleDto, userId);
    }
}