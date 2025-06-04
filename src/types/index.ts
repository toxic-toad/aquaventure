
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  brand: string;
  specifications?: Record<string, string>;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerDetails: CustomerDetails;
  createdAt: string; // ISO date string
}

export interface AIProductSuggestion {
  productName: string;
  description: string;
}
