// src/presentation/controllers/review.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateReviewUseCase } from '../../application/use-cases/review/create-review.use-case';
import { UpdateReviewUseCase } from '../../application/use-cases/review/update-review.use-case';
import { DeleteReviewUseCase } from '../../application/use-cases/review/delete-review.use-case';
import { ListReviewsUseCase } from '../../application/use-cases/review/list-reviews.use-case';
import { GetAverageRatingUseCase } from '../../application/use-cases/review/get-average-rating.use-case';
import { CreateReviewDto, UpdateReviewDto } from '../../application/dtos/review.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(
    private createReviewUseCase: CreateReviewUseCase,
    private updateReviewUseCase: UpdateReviewUseCase,
    private deleteReviewUseCase: DeleteReviewUseCase,
    private listReviewsUseCase: ListReviewsUseCase,
    private getAverageRatingUseCase: GetAverageRatingUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER')
  async create(@Body() dto: CreateReviewDto) {
    return this.createReviewUseCase.execute(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER')
  async update(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
    return this.updateReviewUseCase.execute(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'ADMIN')
  async delete(@Param('id') id: string) {
    return this.deleteReviewUseCase.execute(id);
  }

  @Get()
  async list(
    @Query('customerId') customerId?: string,
    @Query('productId') productId?: string,
  ) {
    return this.listReviewsUseCase.execute({ customerId, productId });
  }

  @Get('rating/:productId')
  async getAverageRating(@Param('productId') productId: string) {
    return this.getAverageRatingUseCase.execute(productId);
  }
}
