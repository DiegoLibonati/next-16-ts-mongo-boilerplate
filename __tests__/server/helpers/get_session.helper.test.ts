/**
 * @jest-environment node
 */

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import type { Session } from "@/types/helpers";

import { getEnvs } from "@/server/configs/env.config";

import { getSession } from "@/server/helpers/get_session.helper";

const mockGet = jest.fn();

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("jose", () => ({
  jwtVerify: jest.fn(),
}));

jest.mock("@/server/configs/env.config", () => ({
  getEnvs: jest.fn(),
}));

describe("get_session.helper", () => {
  describe("getSession", () => {
    beforeEach((): void => {
      (getEnvs as jest.Mock).mockReturnValue({ JWT_SECRET: "test-secret" });
      (cookies as jest.Mock).mockResolvedValue({ get: mockGet });
    });

    describe("when a valid auth-token cookie exists", () => {
      it("should return the session with sub and email", async () => {
        mockGet.mockReturnValue({ value: "valid.jwt.token" });
        (jwtVerify as jest.Mock).mockResolvedValue({
          payload: { sub: "user-123", email: "alice@example.com" },
        });

        const result: Session | null = await getSession();

        expect(result).toEqual({ sub: "user-123", email: "alice@example.com" });
      });

      it("should verify the token using JWT_SECRET from getEnvs", async () => {
        mockGet.mockReturnValue({ value: "valid.jwt.token" });
        (jwtVerify as jest.Mock).mockResolvedValue({
          payload: { sub: "user-123", email: "alice@example.com" },
        });

        await getSession();

        expect(jwtVerify).toHaveBeenCalledWith("valid.jwt.token", expect.any(Uint8Array));
      });

      it("should look up the cookie by auth-token name", async () => {
        mockGet.mockReturnValue({ value: "valid.jwt.token" });
        (jwtVerify as jest.Mock).mockResolvedValue({
          payload: { sub: "user-123", email: "alice@example.com" },
        });

        await getSession();

        expect(mockGet).toHaveBeenCalledWith("auth-token");
      });
    });

    describe("when the auth-token cookie is missing", () => {
      it("should return null when cookie value is undefined", async () => {
        mockGet.mockReturnValue(undefined);

        const result: Session | null = await getSession();

        expect(result).toBeNull();
      });

      it("should not call jwtVerify when cookie is missing", async () => {
        mockGet.mockReturnValue(undefined);

        await getSession();

        expect(jwtVerify).not.toHaveBeenCalled();
      });
    });

    describe("when the token is invalid", () => {
      it("should return null when jwtVerify throws", async () => {
        mockGet.mockReturnValue({ value: "invalid.token" });
        (jwtVerify as jest.Mock).mockRejectedValue(new Error("invalid signature"));

        const result: Session | null = await getSession();

        expect(result).toBeNull();
      });

      it("should return null when jwtVerify throws JWTExpired", async () => {
        mockGet.mockReturnValue({ value: "expired.token" });
        (jwtVerify as jest.Mock).mockRejectedValue(new Error("JWTExpired"));

        const result: Session | null = await getSession();

        expect(result).toBeNull();
      });
    });
  });
});
