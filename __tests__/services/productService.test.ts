import type { IProduct } from "@/types/models";
import type { ResponseWithData } from "@/types/responses";

import productService from "@/services/productService";

import { mockFetchError, mockFetchSuccess } from "@tests/__mocks__/fetch.mock";
import { mockProduct, mockProducts } from "@tests/__mocks__/product.mock";

describe("productService", () => {
  describe("getAll", () => {
    it("should return all products on success", async () => {
      const mockResponse: ResponseWithData<IProduct[]> = {
        code: "SUCCESS_GET_ALL_PRODUCTS",
        message: "Products retrieved",
        data: mockProducts,
      };
      mockFetchSuccess(mockResponse);

      const result = await productService.getAll();

      expect(result).toEqual(mockResponse);
    });

    it("should send GET to /api/v1/products", async () => {
      mockFetchSuccess({ code: "SUCCESS", message: "ok", data: [] });

      await productService.getAll();

      expect(global.fetch as jest.Mock).toHaveBeenCalledWith("/api/v1/products");
    });

    it("should throw error with HTTP status when response is not ok", async () => {
      mockFetchError(500);

      await expect(productService.getAll()).rejects.toThrow("HTTP error! status: 500");
    });

    it("should throw an Error instance when response is not ok", async () => {
      mockFetchError(503);

      await expect(productService.getAll()).rejects.toBeInstanceOf(Error);
    });
  });

  describe("getById", () => {
    it("should return product by id on success", async () => {
      const mockResponse: ResponseWithData<IProduct> = {
        code: "SUCCESS_GET_PRODUCT",
        message: "Product retrieved",
        data: mockProduct,
      };
      mockFetchSuccess(mockResponse);

      const result = await productService.getById("product-id-1");

      expect(result).toEqual(mockResponse);
    });

    it("should send GET to /api/v1/products/:id", async () => {
      mockFetchSuccess({ code: "SUCCESS", message: "ok", data: mockProduct });

      await productService.getById("product-id-1");

      expect(global.fetch as jest.Mock).toHaveBeenCalledWith("/api/v1/products/product-id-1");
    });

    it("should throw error with HTTP status when product is not found", async () => {
      mockFetchError(404);

      await expect(productService.getById("non-existent")).rejects.toThrow(
        "HTTP error! status: 404"
      );
    });

    it("should throw an Error instance when response is not ok", async () => {
      mockFetchError(400);

      await expect(productService.getById("bad-id")).rejects.toBeInstanceOf(Error);
    });
  });
});
