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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserListResponseDto } from './dto/user-list-response.dto';
import { LoginResponseDto } from '../auth/dto/login-response.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('findAll')
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieve a list of all users in the system',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully',
    type: UserListResponseDto,
  })
  async findAll(): Promise<UserListResponseDto> {
    const users = await this.userService.findAll();
    return { users };
  }

  @Get('findOne/:id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieve a specific user by their ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to retrieve',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found',
      },
    },
  })
  async findOne(@Param('id') id: string): Promise<LoginResponseDto> {
    const user = await this.userService.findOne(parseInt(id));
    return {
      access_token: user.token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        bio: user.bio,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  @Post('create')
  @ApiOperation({
    summary: 'Create new user',
    description: 'Register a new user in the system',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'email must be a valid email',
          'password must be at least 6 characters',
        ],
        error: 'Bad Request',
      },
    },
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<LoginResponseDto> {
    const user = await this.userService.create(createUserDto);
    return {
      access_token: user.token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        bio: user.bio,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  @Put('update/:id')
  @ApiOperation({
    summary: 'Update user',
    description: "Update an existing user's information",
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to update',
    example: 1,
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found',
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<LoginResponseDto> {
    const user = await this.userService.update(parseInt(id), updateUserDto);
    return {
      access_token: user.token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        bio: user.bio,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  @Get('api/user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'Retrieve the profile of the currently authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'Current user profile retrieved successfully',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
        error: 'Unauthorized',
      },
    },
  })
  getCurrentUser(@Request() req: RequestWithUser): Promise<LoginResponseDto> {
    return this.findOne(req.user.id.toString());
  }
}
