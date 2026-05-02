/**
 * @jest-environment node
 */

import mongoose from "mongoose";

import { connectDb } from "@/server/configs/mongo.config";

import { seedIfEmpty } from "@/server/startup/seed.startup";

jest.mock("@/server/startup/seed.startup");

describe("mongo.config", () => {
  beforeEach((): void => {
    (seedIfEmpty as jest.Mock).mockResolvedValue(undefined);
    global._mongooseCache = undefined;
  });

  afterAll(async (): Promise<void> => {
    await mongoose.disconnect();
    global._mongooseCache = undefined;
  });

  describe("connectDb", () => {
    it("should establish a connection and return mongoose", async () => {
      const result: typeof mongoose = await connectDb();

      expect(result).toBeDefined();
      expect(mongoose.connection.readyState).toBe(1);
    });

    it("should return the same cached instance on subsequent calls", async () => {
      const first: typeof mongoose = await connectDb();
      const second: typeof mongoose = await connectDb();

      expect(first).toBe(second);
    });

    it("should keep readyState as 1 after multiple calls", async () => {
      await connectDb();
      await connectDb();

      expect(mongoose.connection.readyState).toBe(1);
    });

    it("should call seedIfEmpty exactly once on first connection", async () => {
      await connectDb();

      expect(seedIfEmpty).toHaveBeenCalledTimes(1);
    });

    it("should not call seedIfEmpty on subsequent cached calls", async () => {
      await connectDb();
      await connectDb();

      expect(seedIfEmpty).toHaveBeenCalledTimes(1);
    });
  });
});
