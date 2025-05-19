// src/infrastructure/stripe/stripe.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(
    amount: number,
    currency: string,
    paymentMethodId: string,
    paymentId: string,
  ): Promise<string> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethodId,
        confirmation_method: 'manual',
        confirm: true,
        metadata: { paymentId },
        return_url: 'http://localhost:3000/payment/callback', // Adjust for production
      });
      return paymentIntent.client_secret;
    } catch (error) {
      throw new Error(`Failed to create payment intent: ${error.message}`);
    }
  }

  async confirmPaymentIntent(
    paymentIntentId: string,
  ): Promise<Stripe.PaymentIntent> {
    try {
      return await this.stripe.paymentIntents.retrieve(paymentIntentId);
    } catch (error) {
      throw new Error(`Failed to confirm payment intent: ${error.message}`);
    }
  }

  async refundPayment(transactionId: string): Promise<void> {
    try {
      await this.stripe.refunds.create({
        payment_intent: transactionId,
      });
    } catch (error) {
      throw new Error(`Failed to refund payment: ${error.message}`);
    }
  }
}
