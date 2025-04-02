import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { AuthModule } from '../auth/auth.module';
import { Article } from './entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    AuthModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
