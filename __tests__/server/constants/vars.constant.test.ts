/**
 * @jest-environment node
 */

import { COOKIE_MAX_AGE, COOKIE_NAME, JWT_EXPIRATION } from "@/server/constants/vars.constant";

describe("vars.constant", () => {
  describe("COOKIE_NAME", () => {
    it("should be auth-token", () => {
      expect(COOKIE_NAME).toBe("auth-token");
    });
  });

  describe("COOKIE_MAX_AGE", () => {
    it("should equal 7 days in seconds", () => {
      expect(COOKIE_MAX_AGE).toBe(60 * 60 * 24 * 7);
    });

    it("should be a positive number", () => {
      expect(COOKIE_MAX_AGE).toBeGreaterThan(0);
    });
  });

  describe("JWT_EXPIRATION", () => {
    it("should be 7d", () => {
      expect(JWT_EXPIRATION).toBe("7d");
    });
  });
});
