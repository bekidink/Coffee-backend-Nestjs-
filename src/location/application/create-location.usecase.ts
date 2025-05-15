import { Location } from '../domain/location.entity';
import { LocationRepository } from '../domain/location-repository.interface';

export interface CreateLocationUseCase {
  execute(dto: {
    shopId: string;
    address: string;
    latitude: number;
    longitude: number;
  }): Promise<Location>;
}

export class CreateLocationUseCaseImpl implements CreateLocationUseCase {
  constructor(private readonly locationRepository: LocationRepository) {}

  async execute(dto: {
    shopId: string;
    address: string;
    latitude: number;
    longitude: number;
  }): Promise<Location> {
    const existingLocation = await this.locationRepository.findByShopId(
      dto.shopId,
    );
    if (existingLocation) {
      throw new Error('Location already exists for this shop');
    }

    if (
      dto.latitude < -90 ||
      dto.latitude > 90 ||
      dto.longitude < -180 ||
      dto.longitude > 180
    ) {
      throw new Error('Invalid coordinates');
    }

    const location = new Location(
      require('uuid').v4(),
      dto.shopId,
      dto.address,
      dto.latitude,
      dto.longitude,
      new Date(),
      new Date(),
    );

    await this.locationRepository.save(location);
    return location;
  }
}
