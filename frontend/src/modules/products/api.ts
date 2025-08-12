import { httpService } from '@common/services/httpService.ts';
import type { Product, ProductFormData } from './types.ts';

export const productsApi = {
  getProducts: async (): Promise<{ data: Product[] }> => {
    return httpService.get('/product');
  },
  createProduct: async (data: ProductFormData): Promise<{ data: Product }> => {
    return httpService.post('/product', data);
  },
  updateProduct: async (id: string, data: Partial<ProductFormData>): Promise<{ data: Product }> => {
    return httpService.patch(`/product/${id}`, data);
  },
  deleteProduct: async (id: string): Promise<{ data: { message: string } }> => {
    return httpService.delete(`/product/${id}`);
  },
};
