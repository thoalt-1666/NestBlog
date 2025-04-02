import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  generateToken(user: User): string {
    const payload = { 
      sub: user.id, 
      username: user.username,
      email: user.email 
    };
    return this.jwtService.sign(payload);
  }

  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email }
    });

    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    user.token = this.generateToken(user);
    return user;
  }
} 
