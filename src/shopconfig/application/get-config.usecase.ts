import { Config } from '../domain/config.entity';
import { ConfigRepository } from '../domain/config-repository.interface';

export interface GetConfigUseCase {
  execute(id: string): Promise<Config>;
}

export class GetConfigUseCaseImpl implements GetConfigUseCase {
  constructor(private readonly configRepository: ConfigRepository) {}

  async execute(id: string): Promise<Config> {
    const config = await this.configRepository.findById(id);
    if (!config) {
      throw new Error('Configuration not found');
    }
    return config;
  }
}
