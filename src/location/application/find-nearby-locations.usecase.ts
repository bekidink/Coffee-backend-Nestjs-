import { Location } from '../domain/location.entity';
import { LocationRepository } from '../domain/location-repository.interface';

export interface FindNearbyLocationsUseCase {
  execute(
    latitude: number,
    longitude: number,
    radiusKm: number,
  ): Promise<Location[]>;
}

export class FindNearbyLocationsUseCaseImpl
  implements FindNearbyLocationsUseCase
{
  constructor(private readonly locationRepository: LocationRepository) {}

  async execute(
    latitude: number,
    longitude: number,
    radiusKm: number,
  ): Promise<Location[]> {
    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      throw new Error('Invalid coordinates');
    }
    if (radiusKm <= 0) {
      throw new Error('Radius must be positive');
    }
    return this.locationRepository.findNearby(latitude, longitude, radiusKm);
  }
}
