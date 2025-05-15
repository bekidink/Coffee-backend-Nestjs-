import { Config } from '../domain/config.entity';
import { ConfigRepository } from '../domain/config-repository.interface';

export interface UpdateConfigUseCase {
  execute(
    id: string,
    dto: {
      operatingHours?: { day: string; open: string; close: string }[];
      deliveryEnabled?: boolean;
      pickupEnabled?: boolean;
    },
  ): Promise<Config>;
}

export class UpdateConfigUseCaseImpl implements UpdateConfigUseCase {
  constructor(private readonly configRepository: ConfigRepository) {}

  async execute(
    id: string,
    dto: {
      operatingHours?: { day: string; open: string; close: string }[];
      deliveryEnabled?: boolean;
      pickupEnabled?: boolean;
    },
  ): Promise<Config> {
    const config = await this.configRepository.findById(id);
    if (!config) {
      throw new Error('Configuration not found');
    }

    if (dto.operatingHours) {
      const validDays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ];
      for (const hour of dto.operatingHours) {
        if (!validDays.includes(hour.day)) {
          throw new Error(`Invalid day: ${hour.day}`);
        }
        if (
          !/^\d{2}:\d{2}$/.test(hour.open) ||
          !/^\d{2}:\d{2}$/.test(hour.close)
        ) {
          throw new Error('Invalid time format for operating hours');
        }
      }
      config.operatingHours = dto.operatingHours;
    }

    config.deliveryEnabled =
      dto.deliveryEnabled !== undefined
        ? dto.deliveryEnabled
        : config.deliveryEnabled;
    config.pickupEnabled =
      dto.pickupEnabled !== undefined
        ? dto.pickupEnabled
        : config.pickupEnabled;
    config.updatedAt = new Date();

    await this.configRepository.update(config);
    return config;
  }
}
