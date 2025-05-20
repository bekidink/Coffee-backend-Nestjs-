// src/presentation/modules/search.module.ts
import { Module } from '@nestjs/common';
import { SearchController } from '../controllers/search.controller';
import { SearchProductsUseCase } from '../../application/use-cases/search/search-products.use-case';
import { SearchShopsUseCase } from '../../application/use-cases/search/search-shops.use-case';
import { SearchPromotionsUseCase } from '../../application/use-cases/search/search-promotions.use-case';
import { PrismaSearchRepository } from '../../infrastructure/repositories/prisma-search.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { OptionalJwtAuthGuard } from '../../infrastructure/auth/optional-jwt-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [SearchController],
  providers: [
    SearchProductsUseCase,
    SearchShopsUseCase,
    SearchPromotionsUseCase,
    OptionalJwtAuthGuard,
    PrismaService,
    {
      provide: 'ISearchRepository',
      useClass: PrismaSearchRepository,
    },
  ],
})
export class SearchModule {}
