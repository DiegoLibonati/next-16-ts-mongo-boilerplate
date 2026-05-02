import type { ProductCreatePayload } from "@/types/payloads";
import type { IProduct } from "@/types/models";

import { ProductDAO } from "@/server/daos/product.dao";

export const ProductService = {
  async getAllProducts(): Promise<IProduct[]> {
    return ProductDAO.getAll();
  },

  async getProductById(id: string): Promise<IProduct | null> {
    return ProductDAO.getById(id);
  },

  async createProduct(data: ProductCreatePayload): Promise<IProduct> {
    return ProductDAO.create(data);
  },

  async deleteProduct(id: string): Promise<boolean> {
    return ProductDAO.deleteById(id);
  },
};
