import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard, RequestWithUser } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('findAll')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('findOne/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(parseInt(id));
  }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(parseInt(id), updateUserDto);
  }

  @Get('api/user')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@Request() req: RequestWithUser) {
    return this.userService.findOne(req.user.id);
  }
}
