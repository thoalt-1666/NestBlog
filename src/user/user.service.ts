import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from './services/password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateToken(id: number, token: string): Promise<void> {
    await this.userRepository.update(id, { token });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hashPassword(
      createUserDto.user.password,
    );
    const user = this.userRepository.create({
      ...createUserDto.user,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Handle both data structures: with and without 'user' key
    const updateData = updateUserDto.user || updateUserDto;

    // Update user entity
    if (updateData.password) {
      const hashedPassword = await this.passwordService.hashPassword(
        updateData.password,
      );
      user.password = hashedPassword;
    }

    // Update other fields
    if (updateData.email) user.email = updateData.email;
    if (updateData.username) user.username = updateData.username;
    if (updateData.bio) user.bio = updateData.bio;
    if (updateData.image) user.image = updateData.image;

    // Generate new token
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      bio: user.bio,
      createdAt: user.createdAt,
      updatedAt: new Date(),
    };
    const token = this.jwtService.sign(payload);
    user.token = token;

    await this.userRepository.save(user);

    // Get updated user with password
    const updatedUser = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found after update`);
    }

    return updatedUser;
  }
}
