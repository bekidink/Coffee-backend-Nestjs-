import { Config } from './config.entity';

export interface ConfigRepository {
  findById(id: string): Promise<Config | null>;
  findByShopId(shopId: string): Promise<Config | null>;
  save(config: Config): Promise<void>;
  update(config: Config): Promise<void>;
}
