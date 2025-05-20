// src/infrastructure/repositorie/prisma-search.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ISearchRepository } from '../../domain/repositories/search.repository';
import { Product } from '../../domain/entities/product.entity';
import { Shop } from '../../domain/entities/shop.entity';
import { Promotion } from '../../domain/entities/promotion.entity';

@Injectable()
export class PrismaSearchRepository implements ISearchRepository {
  constructor(private prisma: PrismaService) {}

  async searchProducts(query: {
    keyword?: string;
    category?: string;
    shopId?: string;
    priceMin?: number;
    priceMax?: number;
    ratingMin?: number;
    inStock?: boolean;
    page: number;
    pageSize: number;
    sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'rating_desc';
  }): Promise<{ items: Product[]; total: number }> {
    const where: any = {};
    if (query.keyword) {
      where.OR = [
        { name: { contains: query.keyword, mode: 'insensitive' } },
        { description: { contains: query.keyword, mode: 'insensitive' } },
      ];
    }
    if (query.category) where.category = query.category;
    if (query.shopId) where.shopId = query.shopId;
    if (query.priceMin) where.price = { gte: query.priceMin };
    if (query.priceMax) where.price = { ...where.price, lte: query.priceMax };
    if (query.ratingMin) where.averageRating = { gte: query.ratingMin };
    if (query.inStock) where.stockQuantity = { gt: 0 };

    const orderBy: any = {};
    if (query.sortBy === 'price_asc') orderBy.price = 'asc';
    else if (query.sortBy === 'price_desc') orderBy.price = 'desc';
    else if (query.sortBy === 'rating_desc') orderBy.averageRating = 'desc';
    else
      orderBy._relevance = {
        fields: ['name', 'description'],
        search: query.keyword || '',
        sort: 'desc',
      };

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy,
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
        include: { shop: true, promotions: { where: { isActive: true } } },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      items: items.map((item) =>
        Product.create({
          name: item.name,
          thumbnailUrl: item.thumbnailUrl!,
          shopId: item.shopId,
          imageUrls: item.imageUrls as string[],
          price: item.price,
          categoryId: item.categoryId!,
          vendorId: item.vendorId,
        }),
      ),
      total,
    };
  }

  async searchShops(query: {
    keyword?: string;
    latitude?: number;
    longitude?: number;
    radiusKm?: number;
    ratingMin?: number;
    page: number;
    pageSize: number;
    sortBy?: 'relevance' | 'distance' | 'rating_desc';
  }): Promise<{ items: Shop[]; total: number }> {
    let where: any = {};
    if (query.keyword) {
      where.name = { contains: query.keyword, mode: 'insensitive' };
    }
    if (query.ratingMin) {
      where.averageRating = { gte: query.ratingMin };
    }

    let shopAddresses: any[] = [];
    if (query.latitude && query.longitude && query.radiusKm) {
      // Fetch all shop addresses and filter by distance (Haversine)
      const addresses = await this.prisma.address.findMany({
        where: { entityType: 'SHOP' },
        include: { shop: true },
      });
      shopAddresses = addresses.filter((addr) => {
        const distance = this.calculateHaversineDistance(
          query.latitude!,
          query.longitude!,
          addr.latitude,
          addr.longitude,
        );
        return distance <= query?.radiusKm!;
      });
      where.id = { in: shopAddresses.map((addr) => addr.shopId) };
    }

    const orderBy: any = {};
    if (query.sortBy === 'rating_desc') {
      orderBy.averageRating = 'desc';
    } else if (query.sortBy === 'relevance') {
      orderBy._relevance = {
        fields: ['name'],
        search: query.keyword || '',
        sort: 'desc',
      };
    }
    // Distance sorting handled post-query due to Prisma limitations

    const [items, total] = await Promise.all([
      this.prisma.shop.findMany({
        where,
        orderBy,
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
        include: { addresses: true, promotions: { where: { isActive: true } } },
      }),
      this.prisma.shop.count({ where }),
    ]);

    let sortedItems = items.map((item) =>
      Shop.create({
        name: item.name,
        vendorId: item.vendorId,
        description: item.description!,
        imageUrl: item.imageUrl!,
      }),
    );
    if (query.sortBy === 'distance' && query.latitude && query.longitude) {
      sortedItems = sortedItems.sort((a, b) => {
        const addrA = a.addresses.find((addr) => addr.entityType === 'SHOP');
        const addrB = b.addresses.find((addr) => addr.entityType === 'SHOP');
        if (!addrA || !addrB) return 0;
        const distA = this.calculateHaversineDistance(
          query.latitude!,
          query.longitude!,
          addrA.latitude,
          addrA.longitude,
        );
        const distB = this.calculateHaversineDistance(
          query.latitude!,
          query.longitude!,
          addrB.latitude,
          addrB.longitude,
        );
        return distA - distB;
      });
    }

    return { items: sortedItems, total };
  }

  async searchPromotions(query: {
    keyword?: string;
    shopId?: string;
    activeOnly?: boolean;
    page: number;
    pageSize: number;
  }): Promise<{ items: Promotion[]; total: number }> {
    const where: any = {};
    if (query.keyword) {
      where.OR = [
        { code: { contains: query.keyword, mode: 'insensitive' } },
        { description: { contains: query.keyword, mode: 'insensitive' } },
      ];
    }
    if (query.shopId) where.shopId = query.shopId;
    if (query.activeOnly) where.isActive = true;

    const [items, total] = await Promise.all([
      this.prisma.promotion.findMany({
        where,
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
        include: { shop: true },
      }),
      this.prisma.promotion.count({ where }),
    ]);

    return {
      items: items.map((item) =>
        Promotion.create({
          code: item.code,
          type: item.type,
          value: item.value,
          description: item.description,
          startDate: item.startDate,
          endDate: item.endDate,
        }),
      ),
      total,
    };
  }

  private calculateHaversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }
}
