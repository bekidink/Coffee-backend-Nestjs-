import { Preference } from '../domain/preference.entity';
import { RecommendationRepository } from '../domain/recommendation-repository.interface';

export interface UpdatePreferencesUseCase {
  execute(dto: {
    userId: string;
    dietaryRestrictions?: string[];
    favoriteCategories?: string[];
  }): Promise<Preference>;
}

export class UpdatePreferencesUseCaseImpl implements UpdatePreferencesUseCase {
  constructor(
    private readonly recommendationRepository: RecommendationRepository,
  ) {}

  async execute(dto: {
    userId: string;
    dietaryRestrictions?: string[];
    favoriteCategories?: string[];
  }): Promise<Preference> {
    let preference =
      await this.recommendationRepository.findPreferencesByUserId(dto.userId);
    if (!preference) {
      preference = new Preference(
        require('uuid').v4(),
        dto.userId,
        dto.dietaryRestrictions || [],
        dto.favoriteCategories || [],
        new Date(),
      );
    } else {
      preference.dietaryRestrictions =
        dto.dietaryRestrictions || preference.dietaryRestrictions;
      preference.favoriteCategories =
        dto.favoriteCategories || preference.favoriteCategories;
      preference.updatedAt = new Date();
    }

    await this.recommendationRepository.savePreferences(preference);
    return preference;
  }
}
