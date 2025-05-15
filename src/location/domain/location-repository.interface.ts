import { Location } from './location.entity';

export interface LocationRepository {
  findById(id: string): Promise<Location | null>;
  findByShopId(shopId: string): Promise<Location | null>;
  findNearby(
    latitude: number,
    longitude: number,
    radiusKm: number,
  ): Promise<Location[]>;
  save(location: Location): Promise<void>;
  update(location: Location): Promise<void>;
}
