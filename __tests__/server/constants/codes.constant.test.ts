/**
 * @jest-environment node
 */

import { CODES_ERROR, CODES_NOT, CODES_SUCCESS } from "@/server/constants/codes.constant";

describe("codes.constant", () => {
  describe("CODES_SUCCESS", () => {
    it("should have the correct success codes", () => {
      expect(CODES_SUCCESS).toMatchObject({
        getAllUsers: "SUCCESS_GET_ALL_USERS",
        getUser: "SUCCESS_GET_USER",
        getAllProducts: "SUCCESS_GET_ALL_PRODUCTS",
        getProduct: "SUCCESS_GET_PRODUCT",
        login: "SUCCESS_LOGIN",
        logout: "SUCCESS_LOGOUT",
      });
    });
  });

  describe("CODES_NOT", () => {
    it("should have the correct not-found codes", () => {
      expect(CODES_NOT).toMatchObject({
        foundRoute: "NOT_FOUND_ROUTE",
        foundUser: "NOT_FOUND_USER",
        foundProduct: "NOT_FOUND_PRODUCT",
        validId: "NOT_VALID_ID",
      });
    });
  });

  describe("CODES_ERROR", () => {
    it("should have the correct error codes", () => {
      expect(CODES_ERROR).toMatchObject({
        generic: "ERROR_GENERIC",
        unauthorized: "ERROR_UNAUTHORIZED",
        invalidCredentials: "ERROR_INVALID_CREDENTIALS",
      });
    });
  });
});
