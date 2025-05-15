import { Location } from '../domain/location.entity';
import { LocationRepository } from '../domain/location-repository.interface';

export interface GetLocationUseCase {
  execute(id: string): Promise<Location>;
}

export class GetLocationUseCaseImpl implements GetLocationUseCase {
  constructor(private readonly locationRepository: LocationRepository) {}

  async execute(id: string): Promise<Location> {
    const location = await this.locationRepository.findById(id);
    if (!location) {
      throw new Error('Location not found');
    }
    return location;
  }
}
