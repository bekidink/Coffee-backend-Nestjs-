// src/infrastructure/geocoding/geocoding.service.ts
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GeocodingService {
  private geocoder: any;

  constructor() {
    const googleMaps = google.maps({
      version: '3',
      auth: process.env.GOOGLE_MAPS_API_KEY || '',
    });
    this.geocoder = googleMaps.geocoding;
  }

  async geocode(
    address: string,
  ): Promise<{ latitude: number; longitude: number }> {
    try {
      const response = await this.geocoder.geocode({ address });
      if (!response.results || response.results.length === 0) {
        throw new Error('No results found for address');
      }
      const { lat, lng } = response.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    } catch (error) {
      throw new Error(`Geocoding failed: ${error.message}`);
    }
  }
}
