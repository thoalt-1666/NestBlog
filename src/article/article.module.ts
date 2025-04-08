import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { AuthModule } from '../auth/auth.module';
import { Article } from './entities/article.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from '../constants';
import { User } from 'src/user/entities/user.entity';
import { PasswordModule } from 'src/user/services/password.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, User]),
    JwtModule.register({
      secret: JWT.SECRET,
      signOptions: { expiresIn: JWT.EXPIRES_IN },
    }),
    AuthModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
