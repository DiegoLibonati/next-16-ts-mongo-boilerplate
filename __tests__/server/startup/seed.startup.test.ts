/**
 * @jest-environment node
 */

import mongoose from "mongoose";

import { connectDb } from "@/server/configs/mongo.config";

import { ProductModel } from "@/server/models/product.model";
import { UserModel } from "@/server/models/user.model";

import { seedIfEmpty } from "@/server/startup/seed.startup";

describe("seed.startup", () => {
  beforeAll(async (): Promise<void> => {
    global._mongooseCache = undefined;
    await connectDb();
  });

  afterAll(async (): Promise<void> => {
    await mongoose.disconnect();
    global._mongooseCache = undefined;
  });

  beforeEach(async (): Promise<void> => {
    await UserModel.deleteMany({});
    await ProductModel.deleteMany({});
  });

  describe("seedIfEmpty", () => {
    describe("when both collections are empty", () => {
      it("should insert 3 demo users", async () => {
        await seedIfEmpty();

        const userCount: number = await UserModel.countDocuments();
        expect(userCount).toBe(3);
      });

      it("should insert 3 demo products", async () => {
        await seedIfEmpty();

        const productCount: number = await ProductModel.countDocuments();
        expect(productCount).toBe(3);
      });

      it("should insert users with email and name", async () => {
        await seedIfEmpty();

        const users = await UserModel.find({}).select("+password");
        expect(users.every((u) => u.email && u.name)).toBe(true);
      });

      it("should insert products with name, description, and price", async () => {
        await seedIfEmpty();

        const products = await ProductModel.find({});
        expect(products.every((p) => p.name && p.description && p.price > 0)).toBe(true);
      });
    });

    describe("when users already exist", () => {
      it("should not insert new users", async () => {
        await UserModel.create({
          name: "Existing User",
          email: "existing@example.com",
          password: "hash",
        });

        await seedIfEmpty();

        const userCount: number = await UserModel.countDocuments();
        expect(userCount).toBe(1);
      });

      it("should still seed products if products collection is empty", async () => {
        await UserModel.create({
          name: "Existing User",
          email: "existing@example.com",
          password: "hash",
        });

        await seedIfEmpty();

        const productCount: number = await ProductModel.countDocuments();
        expect(productCount).toBe(3);
      });
    });

    describe("when products already exist", () => {
      it("should not insert new products", async () => {
        await ProductModel.create({
          name: "Existing Product",
          description: "Already here",
          price: 1.0,
        });

        await seedIfEmpty();

        const productCount: number = await ProductModel.countDocuments();
        expect(productCount).toBe(1);
      });

      it("should still seed users if users collection is empty", async () => {
        await ProductModel.create({
          name: "Existing Product",
          description: "Already here",
          price: 1.0,
        });

        await seedIfEmpty();

        const userCount: number = await UserModel.countDocuments();
        expect(userCount).toBe(3);
      });
    });

    describe("idempotency", () => {
      it("should not duplicate data when called multiple times", async () => {
        await seedIfEmpty();
        await seedIfEmpty();
        await seedIfEmpty();

        const userCount: number = await UserModel.countDocuments();
        const productCount: number = await ProductModel.countDocuments();

        expect(userCount).toBe(3);
        expect(productCount).toBe(3);
      });
    });

    describe("when both collections already have data", () => {
      it("should not insert anything", async () => {
        await UserModel.create({ name: "U1", email: "u1@example.com", password: "hash" });
        await ProductModel.create({ name: "P1", description: "Desc", price: 1 });

        await seedIfEmpty();

        expect(await UserModel.countDocuments()).toBe(1);
        expect(await ProductModel.countDocuments()).toBe(1);
      });
    });
  });
});
