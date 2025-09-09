export interface CreateOrder {
  shippingAddressId: string;
  orderItems: OrderItem[];
  shippingMethod: string;
  customerNotes: string;
  paymentConfirmed: boolean;
  metadata: Metadata;
}

interface OrderItem {
  productId: string;
  quantity: number;
  productVariant?: ProductVariant;
}

interface ProductVariant {
  size: string;
  color: string;
  material: string;
  additionalProp1?: Record<string, unknown>; // can hold any key-value pairs
}

interface Metadata {
  additionalProp1: Record<string, unknown>;
}
