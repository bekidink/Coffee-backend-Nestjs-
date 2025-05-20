// src/infrastructure/shippo/shippo.service.ts
import { Injectable } from '@nestjs/common';
import Shippo from 'shippo';

@Injectable()
export class ShippoService {
  // private shippo: Shippo;

  constructor() {
    this.shippo = new Shippo(process.env.SHIPPO_API_KEY || '');
  }

  async createShipment(data: {
    orderId: string;
    customerAddress: string;
    shopAddress: string;
  }): Promise<string> {
    try {
      const shipment = await this.shippo.shipment.create({
        address_from: {
          street1: data.shopAddress,
          city: 'Unknown',
          state: 'CA',
          zip: '94103',
          country: 'US',
        },
        address_to: {
          street1: data.customerAddress,
          city: 'Unknown',
          state: 'CA',
          zip: '94103',
          country: 'US',
        },
        parcels: [
          {
            length: '10',
            width: '10',
            height: '5',
            distance_unit: 'in',
            weight: '1',
            mass_unit: 'lb',
          },
        ],
        async: false,
      });

      const rate = shipment.rates[0]; // Select first available rate
      const transaction = await this.shippo.transaction.create({
        shipment: shipment.object_id,
        rate: rate.object_id,
        label_file_type: 'PDF',
        async: false,
      });

      return transaction.tracking_number;
    } catch (error) {
      throw new Error(`Failed to create shipment: ${error.message}`);
    }
  }

  async trackShipment(trackingNumber: string): Promise<any> {
    try {
      const tracking = await this.shippo.track.get_status(
        'SHIPPO',
        trackingNumber,
      );
      return tracking.tracking_status;
    } catch (error) {
      throw new Error(`Failed to track shipment: ${error.message}`);
    }
  }
}
