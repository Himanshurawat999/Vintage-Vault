// Input payload sent to the API
export interface AddCartInput {
    productId: string;
    quantity: number;
    productVariant: {
      size: string;
      color: string;
      material: string;
      additionalProp1: Record<string, unknown>;
    };
  }
  
  // The API response structure
  export interface CartResponse {
    message: string;
    // Optional—adjust based on your API response
    cart?: {
      items: Array<{
        productId: string;
        quantity: number;
        variant: {
          size: string;
          color: string;
        };
      }>;
      totalQuantity: number;
    };
  }
  