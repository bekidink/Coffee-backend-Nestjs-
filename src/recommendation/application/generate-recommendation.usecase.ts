import { Recommendation } from '../domain/recommendation.entity';
import { RecommendationRepository } from '../domain/recommendation-repository.interface';

export interface GenerateRecommendationUseCase {
  execute(dto: { userId: string; limit: number }): Promise<Recommendation[]>;
}

export class GenerateRecommendationUseCaseImpl
  implements GenerateRecommendationUseCase
{
  constructor(
    private readonly recommendationRepository: RecommendationRepository,
  ) {}

  async execute(dto: {
    userId: string;
    limit: number;
  }): Promise<Recommendation[]> {
    if (dto.limit <= 0) {
      throw new Error('Limit must be positive');
    }

    // Get user's order history
    const userOrders = await this.recommendationRepository.getUserOrders(
      dto.userId,
    );
    const userMenuItemIds = new Set(
      userOrders.map((order) => order.menuItemId),
    );

    // Find similar users (those who ordered similar items)
    const allOrders = await this.recommendationRepository.getAllOrders();
    const userOrderMap: { [userId: string]: Set<string> } = {};
    allOrders.forEach((order) => {
      if (!userOrderMap[order.userId]) {
        userOrderMap[order.userId] = new Set();
      }
      userOrderMap[order.userId].add(order.menuItemId);
    });

    // Calculate similarity (Jaccard similarity based on ordered items)
    const similarities: { userId: string; similarity: number }[] = [];
    for (const [otherUserId, items] of Object.entries(userOrderMap)) {
      if (otherUserId === dto.userId) continue;
      const intersection = [...items].filter((item) =>
        userMenuItemIds.has(item),
      ).length;
      const union = new Set([...items, ...userMenuItemIds]).size;
      const similarity = intersection / union;
      if (intersection > 0) {
        similarities.push({ userId: otherUserId, similarity });
      }
    }

    // Sort by similarity and get top similar users
    const topSimilarUsers = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5)
      .map((s) => s.userId);

    // Aggregate menu items from similar users, excluding user's own orders
    const itemScores: { [menuItemId: string]: number } = {};
    for (const similarUserId of topSimilarUsers) {
      const similarUserOrders =
        await this.recommendationRepository.getUserOrders(similarUserId);
      for (const order of similarUserOrders) {
        if (!userMenuItemIds.has(order.menuItemId)) {
          itemScores[order.menuItemId] =
            (itemScores[order.menuItemId] || 0) + 1;
        }
      }
    }

    // Generate recommendations
    const recommendations: Recommendation[] = [];
    for (const [menuItemId, score] of Object.entries(itemScores)) {
      const recommendation = new Recommendation(
        require('uuid').v4(),
        dto.userId,
        menuItemId,
        score,
        new Date(),
      );
      recommendations.push(recommendation);
      await this.recommendationRepository.saveRecommendation(recommendation);
    }

    // Sort by score and limit
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, dto.limit);
  }
}
