/**
 * @jest-environment node
 */

import type { Envs } from "@/types/api";

describe("env.config", () => {
  const originalEnv: NodeJS.ProcessEnv = process.env;

  beforeEach((): void => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll((): void => {
    process.env = originalEnv;
  });

  describe("getEnvs", () => {
    describe("when all required variables are set", () => {
      it("should return a valid Envs object", async () => {
        const { getEnvs } = await import("@/server/configs/env.config");
        const envs: Envs = getEnvs();

        expect(envs.JWT_SECRET).toBe("test-secret-key-for-jest");
        expect(envs.DATABASE_URL).toContain("mongodb://");
        expect(typeof envs.PORT).toBe("number");
      });

      it("should build DATABASE_URL with credentials", async () => {
        process.env.MONGO_USER = "myuser";
        process.env.MONGO_PASS = "mypass";
        process.env.MONGO_HOST = "db-host";
        process.env.MONGO_PORT = "27017";
        process.env.MONGO_DB_NAME = "mydb";
        process.env.MONGO_AUTH_SOURCE = "admin";
        process.env.JWT_SECRET = "secret";

        const { getEnvs } = await import("@/server/configs/env.config");
        const envs: Envs = getEnvs();

        expect(envs.DATABASE_URL).toBe(
          "mongodb://myuser:mypass@db-host:27017/mydb?authSource=admin"
        );
      });

      it("should use PORT from env when set", async () => {
        process.env.PORT = "8080";

        const { getEnvs } = await import("@/server/configs/env.config");
        const envs: Envs = getEnvs();

        expect(envs.PORT).toBe(8080);
      });

      it("should default PORT to 5050 when not set", async () => {
        delete process.env.PORT;

        const { getEnvs } = await import("@/server/configs/env.config");
        const envs: Envs = getEnvs();

        expect(envs.PORT).toBe(5050);
      });

      it("should set ENV from NODE_ENV", async () => {
        (process.env as Record<string, string | undefined>).NODE_ENV = "production";

        const { getEnvs } = await import("@/server/configs/env.config");
        const envs: Envs = getEnvs();

        expect(envs.ENV).toBe("production");
      });
    });

    describe("memoization", () => {
      it("should return the same instance on repeated calls", async () => {
        const { getEnvs } = await import("@/server/configs/env.config");
        const first: Envs = getEnvs();
        const second: Envs = getEnvs();

        expect(first).toBe(second);
      });
    });

    describe("when a required variable is missing", () => {
      it("should throw when MONGO_HOST is missing", async () => {
        delete process.env.MONGO_HOST;

        const { getEnvs } = await import("@/server/configs/env.config");

        expect(() => getEnvs()).toThrow("Missing required environment variable: MONGO_HOST");
      });

      it("should throw when MONGO_PORT is missing", async () => {
        delete process.env.MONGO_PORT;

        const { getEnvs } = await import("@/server/configs/env.config");

        expect(() => getEnvs()).toThrow("Missing required environment variable: MONGO_PORT");
      });

      it("should throw when MONGO_USER is missing", async () => {
        delete process.env.MONGO_USER;

        const { getEnvs } = await import("@/server/configs/env.config");

        expect(() => getEnvs()).toThrow("Missing required environment variable: MONGO_USER");
      });

      it("should throw when JWT_SECRET is missing", async () => {
        delete process.env.JWT_SECRET;

        const { getEnvs } = await import("@/server/configs/env.config");

        expect(() => getEnvs()).toThrow("Missing required environment variable: JWT_SECRET");
      });
    });
  });
});
