import type { MessagesError, MessagesNot, MessagesSuccess } from "@/types/constants";

export const MESSAGES_SUCCESS: MessagesSuccess = {
  getAllUsers: "Users successfully retrieved.",
  getUser: "User successfully retrieved.",
  getAllProducts: "Products successfully retrieved.",
  getProduct: "Product successfully retrieved.",
  login: "Login successful.",
  logout: "Logout successful.",
};

export const MESSAGES_NOT: MessagesNot = {
  foundRoute: "Route not found.",
  foundUser: "User not found.",
  foundProduct: "Product not found.",
  validId: "A valid ID is required.",
};

export const MESSAGES_ERROR: MessagesError = {
  generic: "Something went wrong.",
  unauthorized: "Unauthorized.",
  invalidCredentials: "Invalid credentials.",
};
