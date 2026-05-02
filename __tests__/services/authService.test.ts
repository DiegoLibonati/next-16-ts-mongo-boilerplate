import type { DefaultResponse } from "@/types/responses";

import { authService } from "@/services/authService";

import { mockFetchSuccess } from "@tests/__mocks__/fetch.mock";

const mockLoginSuccess: DefaultResponse = {
  code: "SUCCESS_LOGIN",
  message: "Logged in successfully",
};

const mockLogoutSuccess: DefaultResponse = {
  code: "SUCCESS_LOGOUT",
  message: "Logged out successfully",
};

describe("authService", () => {
  describe("login", () => {
    it("should return response data on successful login", async () => {
      mockFetchSuccess(mockLoginSuccess);

      const result = await authService.login("alice@example.com", "demo1234");

      expect(result).toEqual(mockLoginSuccess);
    });

    it("should send POST to /api/v1/auth/login with credentials", async () => {
      mockFetchSuccess(mockLoginSuccess);

      await authService.login("alice@example.com", "demo1234");

      expect(global.fetch as jest.Mock).toHaveBeenCalledWith("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "alice@example.com", password: "demo1234" }),
      });
    });

    it("should throw error with message from response when login fails", async () => {
      const errorResponse: DefaultResponse = {
        code: "ERROR_INVALID_CREDENTIALS",
        message: "Invalid credentials",
      };
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve(errorResponse),
      }) as typeof fetch;

      await expect(authService.login("bad@example.com", "wrong")).rejects.toThrow(
        "Invalid credentials"
      );
    });

    it("should throw an Error instance when login fails", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ code: "ERROR_GENERIC", message: "Server error" }),
      }) as typeof fetch;

      await expect(authService.login("a@b.com", "pass")).rejects.toBeInstanceOf(Error);
    });
  });

  describe("logout", () => {
    it("should return response data on successful logout", async () => {
      mockFetchSuccess(mockLogoutSuccess);

      const result = await authService.logout();

      expect(result).toEqual(mockLogoutSuccess);
    });

    it("should send POST to /api/v1/auth/logout", async () => {
      mockFetchSuccess(mockLogoutSuccess);

      await authService.logout();

      expect(global.fetch as jest.Mock).toHaveBeenCalledWith("/api/v1/auth/logout", {
        method: "POST",
      });
    });

    it("should throw error with message from response when logout fails", async () => {
      const errorResponse: DefaultResponse = {
        code: "ERROR_GENERIC",
        message: "Logout failed",
      };
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve(errorResponse),
      }) as typeof fetch;

      await expect(authService.logout()).rejects.toThrow("Logout failed");
    });

    it("should throw an Error instance when logout fails", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ code: "ERROR_GENERIC", message: "Server error" }),
      }) as typeof fetch;

      await expect(authService.logout()).rejects.toBeInstanceOf(Error);
    });
  });
});
