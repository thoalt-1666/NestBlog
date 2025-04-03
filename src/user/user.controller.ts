import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  UseGuards,
  Request,
  Version,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard, RequestWithUser } from '../auth/jwt-auth.guard';
import { API } from '../constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version(API.VERSION)
  @Get('findAll')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Version(API.VERSION)
  @Get('findOne/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(parseInt(id));
  }

  @Version(API.VERSION)
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Version(API.VERSION)
  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(parseInt(id), updateUserDto);
  }
  
  @Version(API.VERSION)
  @Get('api/user')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@Request() req: RequestWithUser) {
    return this.userService.findOne(req.user.id);
  }
}
