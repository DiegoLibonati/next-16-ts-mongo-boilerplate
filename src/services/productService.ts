import type { IProduct } from "@/types/models";
import type { ResponseWithData } from "@/types/responses";

const BASE = "/api/v1/products";

export const productService = {
  async getAll(): Promise<ResponseWithData<IProduct[]>> {
    const response = await fetch(BASE);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as ResponseWithData<IProduct[]>;
  },

  async getById(id: string): Promise<ResponseWithData<IProduct>> {
    const response = await fetch(`${BASE}/${id}`);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as ResponseWithData<IProduct>;
  },
};
