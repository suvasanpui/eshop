export interface ProductType {
  _id?: string;
  id?: string | number;
  title: string;
  description: string;
  category: string;
  price: number;
  quantity?: number;
  discountPercentage?: number;
  rating?: number;
  stock: number;
  tags?: string[];
  brand: string;
  sku: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: {
    rating: number;
    comment: string;
    date: Date;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: {
    createdAt: Date;
    updatedAt: Date;
    barcode?: string;
    qrCode?: string;
  };
  images?: string[];
  thumbnail?: string;
}

// Update CartItem interface
export interface CartItem extends ProductType {
  quantity: number;
}

export interface UserInfo {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phoneNumber?: string;
}

// Update StateType to use CartItem
export interface StateType {
  counter: {
    cart: CartItem[];
    favorite: ProductType[];
    userInfo: UserInfo;
  }
}