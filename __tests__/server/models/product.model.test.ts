/**
 * @jest-environment node
 */

import mongoose from "mongoose";

import { connectDb } from "@/server/configs/mongo.config";

import { ProductModel } from "@/server/models/product.model";

import { seedIfEmpty } from "@/server/startup/seed.startup";

jest.mock("@/server/startup/seed.startup");

describe("product.model", () => {
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

  describe("required fields", () => {
    it("should save successfully when all required fields are provided", async () => {
      const product = new ProductModel({
        name: "Widget Pro",
        description: "A professional widget",
        price: 29.99,
      });

      await expect(product.save()).resolves.not.toThrow();
    });

    it("should throw ValidationError when name is missing", async () => {
      const product = new ProductModel({ description: "A widget", price: 9.99 });

      await expect(product.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it("should throw ValidationError when description is missing", async () => {
      const product = new ProductModel({ name: "Widget Pro", price: 9.99 });

      await expect(product.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it("should throw ValidationError when price is missing", async () => {
      const product = new ProductModel({ name: "Widget Pro", description: "A widget" });

      await expect(product.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });
  });

  describe("price field", () => {
    it("should accept price of 0", async () => {
      const product = new ProductModel({
        name: "Free Widget",
        description: "A free widget",
        price: 0,
      });

      await expect(product.save()).resolves.not.toThrow();
    });

    it("should throw ValidationError when price is below 0", async () => {
      const product = new ProductModel({
        name: "Widget",
        description: "A widget",
        price: -1,
      });

      await expect(product.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });
  });

  describe("name field", () => {
    it("should store name trimmed", async () => {
      const product = new ProductModel({
        name: "  Widget Pro  ",
        description: "A widget",
        price: 9.99,
      });

      await product.save();

      expect(product.name).toBe("Widget Pro");
    });
  });

  describe("description field", () => {
    it("should store description trimmed", async () => {
      const product = new ProductModel({
        name: "Widget",
        description: "  A professional widget  ",
        price: 9.99,
      });

      await product.save();

      expect(product.description).toBe("A professional widget");
    });
  });

  describe("timestamps", () => {
    it("should automatically set createdAt and updatedAt", async () => {
      const product = new ProductModel({
        name: "Widget Pro",
        description: "A widget",
        price: 29.99,
      });

      await product.save();

      expect(product.createdAt).toBeInstanceOf(Date);
      expect(product.updatedAt).toBeInstanceOf(Date);
    });
  });
});
