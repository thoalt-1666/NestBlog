import {
  Controller,
  Put,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleInputDto } from './dto/create-article.dto';
import { UpdateArticleInputDto } from './dto/update-article.dto';
import { JwtAuthGuard, RequestWithUser } from 'src/auth/guards/jwt-auth.guard';
import { ArticleResponeDto } from './dto/article-respone.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createArticleInputDto: CreateArticleInputDto,
    @Request() req: RequestWithUser,
  ): Promise<ArticleResponeDto> {
    const userId = req.user.id;
    return this.articleService.create(createArticleInputDto, userId);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateArticleInputDto: UpdateArticleInputDto,
    @Request() req: RequestWithUser,
  ): Promise<ArticleResponeDto> {
    const userId = req.user.id;
    return this.articleService.update(
      parseInt(id),
      updateArticleInputDto,
      userId,
    );
  }
}
