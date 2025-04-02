import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { JWT } from '../constants';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: JWT.SECRET,
      signOptions: { expiresIn: JWT.EXPIRES_IN },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
