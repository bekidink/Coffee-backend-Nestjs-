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
import { CreateVendorUseCase } from '../application/create-vendor.usecase';
import { GetVendorUseCase } from '../application/get-vendor.usecase';
import { UpdateVendorUseCase } from '../application/update-vendor.usecase';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('vendors')
export class VendorController {
  constructor(
    private readonly createVendorUseCase: CreateVendorUseCase,
    private readonly getVendorUseCase: GetVendorUseCase,
    private readonly updateVendorUseCase: UpdateVendorUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(@Body() dto: CreateVendorDto) {
    const vendor = await this.createVendorUseCase.execute(dto);
    return {
      id: vendor.id,
      userId: vendor.userId,
      businessName: vendor.businessName,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: string) {
    const vendor = await this.getVendorUseCase.execute(id);
    return {
      id: vendor.id,
      userId: vendor.userId,
      businessName: vendor.businessName,
      contactPhone: vendor.contactPhone,
      contactEmail: vendor.contactEmail,
      createdAt: vendor.createdAt,
      updatedAt: vendor.updatedAt,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateVendorDto) {
    const vendor = await this.updateVendorUseCase.execute(id, dto);
    return {
      id: vendor.id,
      userId: vendor.userId,
      businessName: vendor.businessName,
    };
  }
}
