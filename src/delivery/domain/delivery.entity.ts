export class Delivery {
  constructor(
    public id: string,
    public orderId: string,
    public shopId: string,
    public customerId: string,
    public deliveryAgentId: string | null,
    public status:
      | 'PENDING'
      | 'ASSIGNED'
      | 'PICKED_UP'
      | 'IN_TRANSIT'
      | 'DELIVERED'
      | 'CANCELLED',
    public deliveryAddress: string,
    public estimatedDeliveryTime: Date | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
