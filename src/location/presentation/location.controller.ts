import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { CreateLocationUseCase } from '../application/create-location.usecase';
import { GetLocationUseCase } from '../application/get-location.usecase';
import { FindNearbyLocationsUseCase } from '../application/find-nearby-locations.usecase';
import { UpdateLocationUseCase } from '../application/update-location.usecase';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('locations')
export class LocationController {
  constructor(
    private readonly createLocationUseCase: CreateLocationUseCase,
    private readonly getLocationUseCase: GetLocationUseCase,
    private readonly findNearbyLocationsUseCase: FindNearbyLocationsUseCase,
    private readonly updateLocationUseCase: UpdateLocationUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(@Body() dto: CreateLocationDto) {
    const location = await this.createLocationUseCase.execute(dto);
    return {
      id: location.id,
      shopId: location.shopId,
      address: location.address,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: string) {
    const location = await this.getLocationUseCase.execute(id);
    return {
      id: location.id,
      shopId: location.shopId,
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
      createdAt: location.createdAt,
      updatedAt: location.updatedAt,
    };
  }

  @Get('nearby')
  @UseGuards(JwtAuthGuard)
  async findNearby(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
    @Query('radiusKm') radiusKm: string,
  ) {
    const locations = await this.findNearbyLocationsUseCase.execute(
      parseFloat(latitude),
      parseFloat(longitude),
      parseFloat(radiusKm),
    );
    return locations.map((location) => ({
      id: location.id,
      shopId: location.shopId,
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
    }));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateLocationDto) {
    const location = await this.updateLocationUseCase.execute(id, dto);
    return {
      id: location.id,
      shopId: location.shopId,
      address: location.address,
    };
  }
}
