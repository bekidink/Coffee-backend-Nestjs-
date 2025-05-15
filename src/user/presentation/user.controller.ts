import {
  Controller,
  Post,
  Body,
  HttpCode,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase } from '../application/create-user.usecase';
import { LoginUseCase } from '../application/login.usecase';
import { UpdateUserUseCase } from '../application/update-user.usecase';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() dto: CreateUserDto) {
    const user = await this.createUserUseCase.execute(dto);
    return { id: user.id, email: user.email, role: user.role };
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    const { user, token } = await this.loginUseCase.execute(dto);
    return { id: user.id, email: user.email, role: user.role, token };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.updateUserUseCase.execute(id, dto);
    return { id: user.id, email: user.email, role: user.role };
  }
}
