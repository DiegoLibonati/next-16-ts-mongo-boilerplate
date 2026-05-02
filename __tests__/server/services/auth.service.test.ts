/**
 * @jest-environment node
 */

import bcryptjs from "bcryptjs";
import { SignJWT } from "jose";

import { connectDb } from "@/server/configs/mongo.config";
import { getEnvs } from "@/server/configs/env.config";

import { UserModel } from "@/server/models/user.model";

import { AuthService } from "@/server/services/auth.service";

import { mockUserDoc } from "@tests/__mocks__/user.mock";

jest.mock("@/server/configs/mongo.config", () => ({
  connectDb: jest.fn(),
}));

jest.mock("@/server/configs/env.config", () => ({
  getEnvs: jest.fn(),
}));

jest.mock("@/server/models/user.model", () => ({
  UserModel: { findOne: jest.fn() },
}));

jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock("jose", () => ({
  SignJWT: jest.fn(),
}));

describe("auth.service", () => {
  describe("AuthService.login", () => {
    beforeEach((): void => {
      (connectDb as jest.Mock).mockResolvedValue(undefined);
      (getEnvs as jest.Mock).mockReturnValue({ JWT_SECRET: "test-secret" });
      (bcryptjs.compare as jest.Mock).mockResolvedValue(true);
      (UserModel.findOne as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockUserDoc),
        }),
      });
      (SignJWT as jest.Mock).mockImplementation(() => ({
        setProtectedHeader: jest.fn().mockReturnThis(),
        setIssuedAt: jest.fn().mockReturnThis(),
        setExpirationTime: jest.fn().mockReturnThis(),
        sign: jest.fn().mockResolvedValue("mock.jwt.token"),
      }));
    });

    describe("when credentials are valid", () => {
      it("should return a JWT token string", async () => {
        const result: string | null = await AuthService.login("alice@example.com", "pass123");

        expect(result).toBe("mock.jwt.token");
      });

      it("should call bcryptjs.compare with the plain password and hashed password", async () => {
        await AuthService.login("alice@example.com", "pass123");

        expect(bcryptjs.compare).toHaveBeenCalledWith("pass123", "hashed-password");
      });

      it("should search by lowercased email", async () => {
        await AuthService.login("ALICE@EXAMPLE.COM", "pass123");

        expect(UserModel.findOne).toHaveBeenCalledWith({ email: "alice@example.com" });
      });

      it("should select the password field", async () => {
        const mockExec = jest.fn().mockResolvedValue(mockUserDoc);
        const mockSelect = jest.fn().mockReturnValue({ exec: mockExec });
        (UserModel.findOne as jest.Mock).mockReturnValue({ select: mockSelect });

        await AuthService.login("alice@example.com", "pass123");

        expect(mockSelect).toHaveBeenCalledWith("+password");
      });
    });

    describe("when the user does not exist", () => {
      it("should return null when user is not found", async () => {
        (UserModel.findOne as jest.Mock).mockReturnValue({
          select: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(null),
          }),
        });

        const result: string | null = await AuthService.login("unknown@example.com", "pass123");

        expect(result).toBeNull();
      });

      it("should not call bcryptjs.compare when user is not found", async () => {
        (UserModel.findOne as jest.Mock).mockReturnValue({
          select: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(null),
          }),
        });

        await AuthService.login("unknown@example.com", "pass123");

        expect(bcryptjs.compare).not.toHaveBeenCalled();
      });
    });

    describe("when the password is wrong", () => {
      it("should return null when bcryptjs.compare returns false", async () => {
        (bcryptjs.compare as jest.Mock).mockResolvedValue(false);

        const result: string | null = await AuthService.login("alice@example.com", "wrong");

        expect(result).toBeNull();
      });

      it("should not sign a JWT when password is invalid", async () => {
        (bcryptjs.compare as jest.Mock).mockResolvedValue(false);

        await AuthService.login("alice@example.com", "wrong");

        expect(SignJWT).not.toHaveBeenCalled();
      });
    });
  });
});
