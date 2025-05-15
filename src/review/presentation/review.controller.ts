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
import { CreateReviewUseCase } from '../application/create-review.usecase';
import { GetReviewUseCase } from '../application/get-review.usecase';
import { UpdateReviewUseCase } from '../application/update-review.usecase';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly createReviewUseCase: CreateReviewUseCase,
    private readonly getReviewUseCase: GetReviewUseCase,
    private readonly updateReviewUseCase: UpdateReviewUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(@Body() dto: CreateReviewDto) {
    const review = await this.createReviewUseCase.execute(dto);
    return {
      id: review.id,
      userId: review.userId,
      shopId: review.shopId,
      rating: review.rating,
    };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const review = await this.getReviewUseCase.execute(id);
    return {
      id: review.id,
      userId: review.userId,
      shopId: review.shopId,
      menuItemId: review.menuItemId,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
    const review = await this.updateReviewUseCase.execute(id, dto);
    return {
      id: review.id,
      userId: review.userId,
      shopId: review.shopId,
      rating: review.rating,
    };
  }
}
