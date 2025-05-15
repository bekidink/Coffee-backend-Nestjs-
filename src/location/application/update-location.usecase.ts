import { Location } from '../domain/location.entity';
import { LocationRepository } from '../domain/location-repository.interface';

export interface UpdateLocationUseCase {
  execute(
    id: string,
    dto: { address?: string; latitude?: number; longitude?: number },
  ): Promise<Location>;
}

export class UpdateLocationUseCaseImpl implements UpdateLocationUseCase {
  constructor(private readonly locationRepository: LocationRepository) {}

  async execute(
    id: string,
    dto: { address?: string; latitude?: number; longitude?: number },
  ): Promise<Location> {
    const location = await this.locationRepository.findById(id);
    if (!location) {
      throw new Error('Location not found');
    }

    if (
      dto.latitude !== undefined &&
      (dto.latitude < -90 || dto.latitude > 90)
    ) {
      throw new Error('Invalid latitude');
    }
    if (
      dto.longitude !== undefined &&
      (dto.longitude < -180 || dto.longitude > 180)
    ) {
      throw new Error('Invalid longitude');
    }

    location.address = dto.address || location.address;
    location.latitude =
      dto.latitude !== undefined ? dto.latitude : location.latitude;
    location.longitude =
      dto.longitude !== undefined ? dto.longitude : location.longitude;
    location.updatedAt = new Date();

    await this.locationRepository.update(location);
    return location;
  }
}
