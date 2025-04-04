import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { PasswordService } from '../user/services/password.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.comparePasswords(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      bio: user.bio,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const token = this.jwtService.sign(payload);
    await this.userService.updateToken(user.id, token);

    return {
      access_token: token,
      user: payload,
    };
  }
}
