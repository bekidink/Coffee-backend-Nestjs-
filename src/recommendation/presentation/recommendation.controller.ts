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
import { GenerateRecommendationUseCase } from '../application/generate-recommendation.usecase';
import { GetRecommendationUseCase } from '../application/get-recommendation.usecase';
import { UpdatePreferencesUseCase } from '../application/update-preferences.usecase';
import { GenerateRecommendationDto } from './dto/generate-recommendation.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('recommendations')
export class RecommendationController {
  constructor(
    private readonly generateRecommendationUseCase: GenerateRecommendationUseCase,
    private readonly getRecommendationUseCase: GetRecommendationUseCase,
    private readonly updatePreferencesUseCase: UpdatePreferencesUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async generate(@Body() dto: GenerateRecommendationDto) {
    const recommendations =
      await this.generateRecommendationUseCase.execute(dto);
    return recommendations.map((rec) => ({
      id: rec.id,
      userId: rec.userId,
      menuItemId: rec.menuItemId,
      score: rec.score,
      createdAt: rec.createdAt,
    }));
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  async get(@Param('userId') userId: string) {
    const recommendations = await this.getRecommendationUseCase.execute(userId);
    return recommendations.map((rec) => ({
      id: rec.id,
      userId: rec.userId,
      menuItemId: rec.menuItemId,
      score: rec.score,
      createdAt: rec.createdAt,
    }));
  }

  @Patch('preferences')
  @UseGuards(JwtAuthGuard)
  async updatePreferences(@Body() dto: UpdatePreferencesDto) {
    const preference = await this.updatePreferencesUseCase.execute(dto);
    return {
      id: preference.id,
      userId: preference.userId,
      dietaryRestrictions: preference.dietaryRestrictions,
      favoriteCategories: preference.favoriteCategories,
      updatedAt: preference.updatedAt,
    };
  }
}
