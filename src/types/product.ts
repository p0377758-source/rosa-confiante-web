export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  discountPercentage: number;
  images: string[];
  rating: number;
  reviews: number;
  soldCount: number;
  category: string;
  variants?: ProductVariant[];
  specifications?: Record<string, string>;
  includedItems?: string[];
  deliveryInfo: {
    estimatedDays: string;
    shippingCost: number;
  };
}

export interface ProductVariant {
  id: string;
  name: string;
  color?: string;
  image?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}
