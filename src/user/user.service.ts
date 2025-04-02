import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { PasswordService } from './services/password.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
    private passwordService: PasswordService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto.user);

    // Hash password before saving
    if (createUserDto.user.password) {
      user.password = await this.passwordService.hashPassword(
        createUserDto.user.password,
      );
    }

    const savedUser = await this.userRepository.save(user);
    savedUser.token = this.authService.generateToken(savedUser);
    return savedUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.user) {
      await this.userRepository.update(id, updateUserDto.user);
    }
    return this.findOne(id);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return this.passwordService.comparePasswords(password, user.password);
  }
}
