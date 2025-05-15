import { Recommendation } from './recommendation.entity';
import { Preference } from './preference.entity';

export interface RecommendationRepository {
  findRecommendationsByUserId(userId: string): Promise<Recommendation[]>;
  saveRecommendation(recommendation: Recommendation): Promise<void>;
  findPreferencesByUserId(userId: string): Promise<Preference | null>;
  savePreferences(preferences: Preference): Promise<void>;
  getUserOrders(userId: string): Promise<{ menuItemId: string }[]>;
  getAllOrders(): Promise<{ userId: string; menuItemId: string }[]>;
}
