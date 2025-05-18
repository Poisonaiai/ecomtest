export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  phoneModel: string;
  description: string;
  features: string[];
  colors?: string[];
  bestSeller?: boolean;
  newArrival?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
}
