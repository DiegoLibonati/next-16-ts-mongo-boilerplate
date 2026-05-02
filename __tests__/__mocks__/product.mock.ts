import type { IProductDoc } from "@/types/api";
import type { IProduct } from "@/types/models";

const mockDate = new Date("2024-06-15T12:00:00.000Z");

export const mockProduct: IProduct = {
  _id: "product-id-1",
  name: "Test Product",
  description: "A test product description",
  price: 99.99,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};

export const mockProducts: IProduct[] = [
  mockProduct,
  {
    _id: "product-id-2",
    name: "Test Product 2",
    description: "Another test product description",
    price: 49.99,
    createdAt: "2024-01-02T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z",
  },
];

export const mockProductDoc: IProductDoc = {
  _id: "prod-id-abc123",
  name: "  Widget Pro  ",
  description: "A professional widget",
  price: 29.99,
  createdAt: mockDate,
  updatedAt: mockDate,
} as unknown as IProductDoc;
