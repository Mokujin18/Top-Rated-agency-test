export interface Product {
  id: string;
  name: string;
  image: string;
  sku: string;
  price: number;
  quantity: number;
  createdAt: string;
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt'>;
