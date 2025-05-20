// src/infrastructure/notification/notification.service.ts
import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}'),
      ),
    });
  }

  async send(data: {
    userId: string;
    userType: 'CUSTOMER' | 'VENDOR' | 'ADMIN';
    message: string;
    type:
      | 'ORDER_UPDATE'
      | 'REVIEW_SUBMITTED'
      | 'PAYMENT_CONFIRMED'
      | 'BROADCAST';
  }): Promise<void> {
    // Fetch user email (simplified, assumes user has email in Customer/Vendor entity)
    const email = await this.getUserEmail(data.userId, data.userType);
    if (email) {
      await this.sendEmail(email, data.message, data.type);
    }

    // Send push notification (assumes user has a device token stored)
    const deviceToken = await this.getDeviceToken(data.userId, data.userType);
    if (deviceToken) {
      await this.sendPushNotification(deviceToken, data.message, data.type);
    }
  }

  private async getUserEmail(
    userId: string,
    userType: 'CUSTOMER' | 'VENDOR' | 'ADMIN',
  ): Promise<string | null> {
    // In a real app, query Customer or Vendor repository for email
    // This is a placeholder; replace with actual repository calls
    return userType === 'CUSTOMER' ? `${userId}@example.com` : null;
  }

  private async getDeviceToken(
    userId: string,
    userType: 'CUSTOMER' | 'VENDOR' | 'ADMIN',
  ): Promise<string | null> {
    // In a real app, query a device token table or user profile
    // This is a placeholder; replace with actual logic
    return null; // Replace with actual device token retrieval
  }

  private async sendEmail(
    to: string,
    message: string,
    type: string,
  ): Promise<void> {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL || 'no-reply@coffee-shop.com',
      subject: `Notification: ${type.replace('_', ' ')}`,
      text: message,
      html: `<p>${message}</p>`,
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(`Failed to send email: ${error.message}`);
      throw new Error('Email notification failed');
    }
  }

  private async sendPushNotification(
    deviceToken: string,
    message: string,
    type: string,
  ): Promise<void> {
    const payload = {
      notification: {
        title: `Coffee Shop: ${type.replace('_', ' ')}`,
        body: message,
      },
    };
    try {
      await admin.messaging().sendToDevice(deviceToken, payload);
    } catch (error) {
      console.error(`Failed to send push notification: ${error.message}`);
      throw new Error('Push notification failed');
    }
  }
}
