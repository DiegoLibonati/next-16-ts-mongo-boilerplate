/**
 * @jest-environment node
 */

import mongoose from "mongoose";

import { connectDb } from "@/server/configs/mongo.config";

import { UserModel } from "@/server/models/user.model";

import { seedIfEmpty } from "@/server/startup/seed.startup";

jest.mock("@/server/startup/seed.startup");

describe("user.model", () => {
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
    await UserModel.deleteMany({});
  });

  describe("required fields", () => {
    it("should save successfully when all required fields are provided", async () => {
      const user = new UserModel({
        name: "Alice",
        email: "alice@example.com",
        password: "secret123",
      });

      await expect(user.save()).resolves.not.toThrow();
    });

    it("should throw ValidationError when name is missing", async () => {
      const user = new UserModel({ email: "alice@example.com", password: "secret123" });

      await expect(user.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it("should throw ValidationError when email is missing", async () => {
      const user = new UserModel({ name: "Alice", password: "secret123" });

      await expect(user.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it("should throw ValidationError when password is missing", async () => {
      const user = new UserModel({ name: "Alice", email: "alice@example.com" });

      await expect(user.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });
  });

  describe("email field", () => {
    it("should store email in lowercase", async () => {
      const user = new UserModel({
        name: "Alice",
        email: "ALICE@EXAMPLE.COM",
        password: "secret123",
      });

      await user.save();

      expect(user.email).toBe("alice@example.com");
    });

    it("should store email trimmed", async () => {
      const user = new UserModel({
        name: "Alice",
        email: "  alice@example.com  ",
        password: "secret123",
      });

      await user.save();

      expect(user.email).toBe("alice@example.com");
    });

    it("should throw on duplicate email", async () => {
      await UserModel.create({ name: "Alice", email: "alice@example.com", password: "hash1" });

      await expect(
        UserModel.create({ name: "Alice2", email: "alice@example.com", password: "hash2" })
      ).rejects.toThrow();
    });
  });

  describe("name field", () => {
    it("should store name trimmed", async () => {
      const user = new UserModel({
        name: "  Alice  ",
        email: "alice@example.com",
        password: "secret123",
      });

      await user.save();

      expect(user.name).toBe("Alice");
    });
  });

  describe("password field", () => {
    it("should not be returned in normal queries (select: false)", async () => {
      await UserModel.create({ name: "Alice", email: "alice@example.com", password: "secret123" });

      const found = await UserModel.findOne({ email: "alice@example.com" });

      expect(found?.password).toBeUndefined();
    });

    it("should be returned when explicitly selected", async () => {
      await UserModel.create({ name: "Alice", email: "alice@example.com", password: "secret123" });

      const found = await UserModel.findOne({ email: "alice@example.com" }).select("+password");

      expect(found?.password).toBe("secret123");
    });
  });

  describe("timestamps", () => {
    it("should automatically set createdAt and updatedAt", async () => {
      const user = new UserModel({
        name: "Alice",
        email: "alice@example.com",
        password: "secret123",
      });

      await user.save();

      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });
  });
});
