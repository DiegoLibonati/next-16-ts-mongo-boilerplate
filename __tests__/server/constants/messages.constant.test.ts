/**
 * @jest-environment node
 */

import {
  MESSAGES_ERROR,
  MESSAGES_NOT,
  MESSAGES_SUCCESS,
} from "@/server/constants/messages.constant";

describe("messages.constant", () => {
  describe("MESSAGES_SUCCESS", () => {
    it("should have non-empty success messages for all operations", () => {
      expect(MESSAGES_SUCCESS.getAllUsers).toBeTruthy();
      expect(MESSAGES_SUCCESS.getUser).toBeTruthy();
      expect(MESSAGES_SUCCESS.getAllProducts).toBeTruthy();
      expect(MESSAGES_SUCCESS.getProduct).toBeTruthy();
      expect(MESSAGES_SUCCESS.login).toBeTruthy();
      expect(MESSAGES_SUCCESS.logout).toBeTruthy();
    });

    it("should have the correct success messages", () => {
      expect(MESSAGES_SUCCESS).toMatchObject({
        getAllUsers: "Users successfully retrieved.",
        getUser: "User successfully retrieved.",
        getAllProducts: "Products successfully retrieved.",
        getProduct: "Product successfully retrieved.",
        login: "Login successful.",
        logout: "Logout successful.",
      });
    });
  });

  describe("MESSAGES_NOT", () => {
    it("should have non-empty not-found messages for all cases", () => {
      expect(MESSAGES_NOT.foundRoute).toBeTruthy();
      expect(MESSAGES_NOT.foundUser).toBeTruthy();
      expect(MESSAGES_NOT.foundProduct).toBeTruthy();
      expect(MESSAGES_NOT.validId).toBeTruthy();
    });

    it("should have the correct not-found messages", () => {
      expect(MESSAGES_NOT).toMatchObject({
        foundRoute: "Route not found.",
        foundUser: "User not found.",
        foundProduct: "Product not found.",
        validId: "A valid ID is required.",
      });
    });
  });

  describe("MESSAGES_ERROR", () => {
    it("should have non-empty error messages for all cases", () => {
      expect(MESSAGES_ERROR.generic).toBeTruthy();
      expect(MESSAGES_ERROR.unauthorized).toBeTruthy();
      expect(MESSAGES_ERROR.invalidCredentials).toBeTruthy();
    });

    it("should have the correct error messages", () => {
      expect(MESSAGES_ERROR).toMatchObject({
        generic: "Something went wrong.",
        unauthorized: "Unauthorized.",
        invalidCredentials: "Invalid credentials.",
      });
    });
  });
});
