export interface TodoItem {
  completed?: boolean;
  id: string;
  text: string;
}

export interface Product {
  id: string;
  image?: string;
  name: string;
  price: number;
  rating?: number;
}
