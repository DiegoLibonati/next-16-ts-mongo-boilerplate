import type { IUser } from "@/types/models";
import type { ResponseWithData } from "@/types/responses";

import userService from "@/services/userService";

import { mockFetchError, mockFetchSuccess } from "@tests/__mocks__/fetch.mock";
import { mockUser, mockUsers } from "@tests/__mocks__/user.mock";

describe("userService", () => {
  describe("getAll", () => {
    it("should return all users on success", async () => {
      const mockResponse: ResponseWithData<IUser[]> = {
        code: "SUCCESS_GET_ALL_USERS",
        message: "Users retrieved",
        data: mockUsers,
      };
      mockFetchSuccess(mockResponse);

      const result = await userService.getAll();

      expect(result).toEqual(mockResponse);
    });

    it("should send GET to /api/v1/users", async () => {
      mockFetchSuccess({ code: "SUCCESS", message: "ok", data: [] });

      await userService.getAll();

      expect(global.fetch as jest.Mock).toHaveBeenCalledWith("/api/v1/users");
    });

    it("should throw error with HTTP status when response is not ok", async () => {
      mockFetchError(500);

      await expect(userService.getAll()).rejects.toThrow("HTTP error! status: 500");
    });

    it("should throw an Error instance when response is not ok", async () => {
      mockFetchError(503);

      await expect(userService.getAll()).rejects.toBeInstanceOf(Error);
    });
  });

  describe("getById", () => {
    it("should return user by id on success", async () => {
      const mockResponse: ResponseWithData<IUser> = {
        code: "SUCCESS_GET_USER",
        message: "User retrieved",
        data: mockUser,
      };
      mockFetchSuccess(mockResponse);

      const result = await userService.getById("user-id-1");

      expect(result).toEqual(mockResponse);
    });

    it("should send GET to /api/v1/users/:id", async () => {
      mockFetchSuccess({ code: "SUCCESS", message: "ok", data: mockUser });

      await userService.getById("user-id-1");

      expect(global.fetch as jest.Mock).toHaveBeenCalledWith("/api/v1/users/user-id-1");
    });

    it("should throw error with HTTP status when user is not found", async () => {
      mockFetchError(404);

      await expect(userService.getById("non-existent")).rejects.toThrow("HTTP error! status: 404");
    });

    it("should throw an Error instance when response is not ok", async () => {
      mockFetchError(400);

      await expect(userService.getById("bad-id")).rejects.toBeInstanceOf(Error);
    });
  });
});
