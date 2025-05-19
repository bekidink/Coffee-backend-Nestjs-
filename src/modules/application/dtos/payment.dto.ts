// src/application/dtos/payment.dto.ts
export class InitiatePaymentDto {
  orderId: string;
  customerId: string;
  paymentMethodId: string; // Stripe payment method ID (e.g., card)
}

export class ConfirmPaymentDto {
  paymentId: string;
  transactionId: string; // Stripe payment intent ID
}

export class RefundPaymentDto {
  paymentId: string;
}
