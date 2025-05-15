import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { CreateLoyaltyUseCase } from '../application/create-loyalty.usecase';
import { GetLoyaltyUseCase } from '../application/get-loyalty.usecase';
import { UpdateLoyaltyUseCase } from '../application/update-loyalty.usecase';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('loyalty')
export class LoyaltyController {
  constructor(
    private readonly createLoyaltyUseCase: CreateLoyaltyUseCase,
    private readonly getLoyaltyUseCase: GetLoyaltyUseCase,
    private readonly updateLoyaltyUseCase: UpdateLoyaltyUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(@Body() dto: CreateLoyaltyDto) {
    const loyalty = await this.createLoyaltyUseCase.execute(dto);
    return { id: loyalty.id, userId: loyalty.userId, points: loyalty.points };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: string) {
    const loyalty = await this.getLoyaltyUseCase.execute(id);
    return {
      id: loyalty.id,
      userId: loyalty.userId,
      points: loyalty.points,
      createdAt: loyalty.createdAt,
      updatedAt: loyalty.updatedAt,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateLoyaltyDto) {
    const loyalty = await this.updateLoyaltyUseCase.execute(id, dto);
    return { id: loyalty.id, userId: loyalty.userId, points: loyalty.points };
  }
}
