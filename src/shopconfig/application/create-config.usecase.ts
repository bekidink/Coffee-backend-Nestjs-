import { Config } from '../domain/config.entity';
import { ConfigRepository } from '../domain/config-repository.interface';

export interface CreateConfigUseCase {
  execute(dto: {
    shopId: string;
    operatingHours: { day: string; open: string; close: string }[];
    deliveryEnabled: boolean;
    pickupEnabled: boolean;
  }): Promise<Config>;
}

export class CreateConfigUseCaseImpl implements CreateConfigUseCase {
  constructor(private readonly configRepository: ConfigRepository) {}

  async execute(dto: {
    shopId: string;
    operatingHours: { day: string; open: string; close: string }[];
    deliveryEnabled: boolean;
    pickupEnabled: boolean;
  }): Promise<Config> {
    const existingConfig = await this.configRepository.findByShopId(dto.shopId);
    if (existingConfig) {
      throw new Error('Configuration already exists for this shop');
    }

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

    const config = new Config(
      require('uuid').v4(),
      dto.shopId,
      dto.operatingHours,
      dto.deliveryEnabled,
      dto.pickupEnabled,
      new Date(),
      new Date(),
    );

    await this.configRepository.save(config);
    return config;
  }
}
