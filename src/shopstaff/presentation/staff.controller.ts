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
import { CreateStaffUseCase } from '../application/create-staff.usecase';
import { GetStaffUseCase } from '../application/get-staff.usecase';
import { UpdateStaffUseCase } from '../application/update-staff.usecase';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shopstaff')
export class StaffController {
  constructor(
    private readonly createStaffUseCase: CreateStaffUseCase,
    private readonly getStaffUseCase: GetStaffUseCase,
    private readonly updateStaffUseCase: UpdateStaffUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(@Body() dto: CreateStaffDto) {
    const staff = await this.createStaffUseCase.execute(dto);
    return {
      id: staff.id,
      userId: staff.userId,
      shopId: staff.shopId,
      role: staff.role,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: string) {
    const staff = await this.getStaffUseCase.execute(id);
    return {
      id: staff.id,
      userId: staff.userId,
      shopId: staff.shopId,
      role: staff.role,
      createdAt: staff.createdAt,
      updatedAt: staff.updatedAt,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateStaffDto) {
    const staff = await this.updateStaffUseCase.execute(id, dto);
    return {
      id: staff.id,
      userId: staff.userId,
      shopId: staff.shopId,
      role: staff.role,
    };
  }
}
