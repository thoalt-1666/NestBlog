import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { databaseConfig } from './config/database.config';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig),
    UserModule,
    ArticleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}