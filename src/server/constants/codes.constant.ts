import type { CodesError, CodesNot, CodesSuccess } from "@/types/constants";

export const CODES_SUCCESS: CodesSuccess = {
  getAllUsers: "SUCCESS_GET_ALL_USERS",
  getUser: "SUCCESS_GET_USER",
  getAllProducts: "SUCCESS_GET_ALL_PRODUCTS",
  getProduct: "SUCCESS_GET_PRODUCT",
  login: "SUCCESS_LOGIN",
  logout: "SUCCESS_LOGOUT",
};

export const CODES_NOT: CodesNot = {
  foundRoute: "NOT_FOUND_ROUTE",
  foundUser: "NOT_FOUND_USER",
  foundProduct: "NOT_FOUND_PRODUCT",
  validId: "NOT_VALID_ID",
};

export const CODES_ERROR: CodesError = {
  generic: "ERROR_GENERIC",
  unauthorized: "ERROR_UNAUTHORIZED",
  invalidCredentials: "ERROR_INVALID_CREDENTIALS",
  requiredFields: "ERROR_REQUIRED_FIELDS",
};
