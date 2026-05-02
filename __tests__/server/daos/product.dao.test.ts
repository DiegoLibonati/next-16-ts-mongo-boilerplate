/**
 * @jest-environment node
 */

import mongoose from "mongoose";

import type { IProduct } from "@/types/models";

import { connectDb } from "@/server/configs/mongo.config";

import { ProductDAO } from "@/server/daos/product.dao";

import { ProductModel } from "@/server/models/product.model";

import { seedIfEmpty } from "@/server/startup/seed.startup";

const validProductData = {
  name: "Widget Pro",
  description: "A professional widget",
  price: 29.99,
};

jest.mock("@/server/startup/seed.startup");

describe("product.dao", () => {
  beforeAll(async (): Promise<void> => {
    (seedIfEmpty as jest.Mock).mockResolvedValue(undefined);
    global._mongooseCache = undefined;
    await connectDb();
  });

  afterAll(async (): Promise<void> => {
    await mongoose.disconnect();
    global._mongooseCache = undefined;
  });

  beforeEach(async (): Promise<void> => {
    await ProductModel.deleteMany({});
  });

  describe("getAll", () => {
    it("should return an empty array when no products exist", async () => {
      const result: IProduct[] = await ProductDAO.getAll();

      expect(result).toEqual([]);
    });

    it("should return all products as serialized IProduct objects", async () => {
      await ProductModel.create([
        { name: "Widget A", description: "Desc A", price: 9.99 },
        { name: "Widget B", description: "Desc B", price: 19.99 },
      ]);

      const result: IProduct[] = await ProductDAO.getAll();

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty("_id");
    });

    it("should return serialized products with string ISO dates", async () => {
      await ProductModel.create(validProductData);

      const result: IProduct[] = await ProductDAO.getAll();

      expect(typeof result[0]!.createdAt).toBe("string");
      expect(typeof result[0]!.updatedAt).toBe("string");
    });
  });

  describe("getById", () => {
    it("should return the product when found", async () => {
      const created = await ProductModel.create(validProductData);

      const result: IProduct | null = await ProductDAO.getById(created._id.toString());

      expect(result).not.toBeNull();
      expect(result?._id).toBe(created._id.toString());
      expect(result?.name).toBe("Widget Pro");
    });

    it("should return null when the product does not exist", async () => {
      const fakeId: string = new mongoose.Types.ObjectId().toString();

      const result: IProduct | null = await ProductDAO.getById(fakeId);

      expect(result).toBeNull();
    });

    it("should return null when the id is not a valid ObjectId", async () => {
      const result: IProduct | null = await ProductDAO.getById("not-a-valid-id");

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("should insert a product and return it with a generated _id", async () => {
      const result: IProduct = await ProductDAO.create(validProductData);

      expect(result._id).toBeDefined();
      expect(result.name).toBe("Widget Pro");
      expect(result.description).toBe("A professional widget");
      expect(result.price).toBe(29.99);
    });

    it("should persist the product to the database", async () => {
      const result: IProduct = await ProductDAO.create(validProductData);

      const fromDb = await ProductModel.findById(result._id);
      expect(fromDb).not.toBeNull();
      expect(fromDb?.name).toBe("Widget Pro");
    });

    it("should return ISO string dates", async () => {
      const result: IProduct = await ProductDAO.create(validProductData);

      expect(typeof result.createdAt).toBe("string");
      expect(typeof result.updatedAt).toBe("string");
    });
  });

  describe("deleteById", () => {
    it("should return true and remove the product when found", async () => {
      const created = await ProductModel.create(validProductData);

      const result: boolean = await ProductDAO.deleteById(created._id.toString());

      expect(result).toBe(true);
      const fromDb = await ProductModel.findById(created._id);
      expect(fromDb).toBeNull();
    });

    it("should return false when the product does not exist", async () => {
      const fakeId: string = new mongoose.Types.ObjectId().toString();

      const result: boolean = await ProductDAO.deleteById(fakeId);

      expect(result).toBe(false);
    });
  });
});
