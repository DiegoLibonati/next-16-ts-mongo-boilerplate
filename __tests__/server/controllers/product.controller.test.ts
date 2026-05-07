/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";

import type { IProduct } from "@/types/models";

import { ProductController } from "@/server/controllers/product.controller";

import { ProductService } from "@/server/services/product.service";

import { mockProduct, mockProducts } from "@tests/__mocks__/product.mock";

jest.mock("@/server/services/product.service", () => ({
  ProductService: {
    getAllProducts: jest.fn(),
    getProductById: jest.fn(),
  },
}));

const buildGetRequest = (url: string): NextRequest => new NextRequest(`http://localhost${url}`);

describe("product.controller", () => {
  describe("getAll", () => {
    describe("when service returns products", () => {
      it("should return 200 with product data array", async () => {
        (ProductService.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);
        const req = buildGetRequest("/api/v1/products");

        const response = await ProductController.getAll(req);
        const body: { data: IProduct[] } = await response.json();

        expect(response.status).toBe(200);
        expect(body.data).toEqual(mockProducts);
      });

      it("should return 200 with empty array when no products exist", async () => {
        (ProductService.getAllProducts as jest.Mock).mockResolvedValue([]);
        const req = buildGetRequest("/api/v1/products");

        const response = await ProductController.getAll(req);
        const body: { data: IProduct[] } = await response.json();

        expect(response.status).toBe(200);
        expect(body.data).toEqual([]);
      });
    });

    describe("when service throws an error", () => {
      it("should return 500 with ERROR_GENERIC code", async () => {
        (ProductService.getAllProducts as jest.Mock).mockRejectedValue(new Error("DB failure"));
        const req = buildGetRequest("/api/v1/products");

        const response = await ProductController.getAll(req);
        const body: { code: string } = await response.json();

        expect(response.status).toBe(500);
        expect(body.code).toBe("ERROR_GENERIC");
      });
    });
  });

  describe("getById", () => {
    describe("when the product exists", () => {
      it("should return 200 with product data", async () => {
        (ProductService.getProductById as jest.Mock).mockResolvedValue(mockProduct);
        const req = buildGetRequest("/api/v1/products/product-id-1");

        const response = await ProductController.getById(req, "product-id-1");
        const body: { data: IProduct } = await response.json();

        expect(response.status).toBe(200);
        expect(body.data).toEqual(mockProduct);
      });

      it("should pass the id to ProductService.getProductById", async () => {
        (ProductService.getProductById as jest.Mock).mockResolvedValue(mockProduct);
        const req = buildGetRequest("/api/v1/products/product-id-1");

        await ProductController.getById(req, "product-id-1");

        expect(ProductService.getProductById).toHaveBeenCalledWith("product-id-1");
      });
    });

    describe("when the product is not found", () => {
      it("should return 404 when service returns null", async () => {
        (ProductService.getProductById as jest.Mock).mockResolvedValue(null);
        const req = buildGetRequest("/api/v1/products/nonexistent-id");

        const response = await ProductController.getById(req, "nonexistent-id");
        const body: { code: string; message: string } = await response.json();

        expect(response.status).toBe(404);
        expect(body.code).toBe("NOT_FOUND_PRODUCT");
        expect(body.message).toBe("Product not found.");
      });
    });

    describe("when service throws an error", () => {
      it("should return 500 with ERROR_GENERIC code on generic error", async () => {
        (ProductService.getProductById as jest.Mock).mockRejectedValue(new Error("unexpected"));
        const req = buildGetRequest("/api/v1/products/some-id");

        const response = await ProductController.getById(req, "some-id");
        const body: { code: string } = await response.json();

        expect(response.status).toBe(500);
        expect(body.code).toBe("ERROR_GENERIC");
      });
    });
  });
});
