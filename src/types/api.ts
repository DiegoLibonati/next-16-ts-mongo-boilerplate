import type { Document } from "mongoose";
import type { Product, User } from "@/types/app";
import type { Env } from "@/types/cross";

export interface Session {
  sub: string;
  email: string;
}

export interface ExceptionInfo {
  status: number;
  code: string;
  message: string;
}

export type IProductDoc = Document &
  Product & {
    createdAt: Date;
    updatedAt: Date;
  };

export interface IUserDoc extends Document, User {
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Envs {
  PORT: number;
  ENV: Env;
  JWT_SECRET: string;
  DATABASE_URL: string;
}

export interface CodesSuccess {
  getAllUsers: "SUCCESS_GET_ALL_USERS";
  getUser: "SUCCESS_GET_USER";
  getAllProducts: "SUCCESS_GET_ALL_PRODUCTS";
  getProduct: "SUCCESS_GET_PRODUCT";
  login: "SUCCESS_LOGIN";
  logout: "SUCCESS_LOGOUT";
}

export interface CodesNot {
  foundRoute: "NOT_FOUND_ROUTE";
  foundUser: "NOT_FOUND_USER";
  foundProduct: "NOT_FOUND_PRODUCT";
  validId: "NOT_VALID_ID";
}

export interface CodesError {
  generic: "ERROR_GENERIC";
  unauthorized: "ERROR_UNAUTHORIZED";
  invalidCredentials: "ERROR_INVALID_CREDENTIALS";
  requiredFields: "ERROR_REQUIRED_FIELDS";
}

export interface MessagesSuccess {
  getAllUsers: string;
  getUser: string;
  getAllProducts: string;
  getProduct: string;
  login: string;
  logout: string;
}

export interface MessagesNot {
  foundRoute: string;
  foundUser: string;
  foundProduct: string;
  validId: string;
}

export interface MessagesError {
  generic: string;
  unauthorized: string;
  invalidCredentials: string;
  requiredFields: string;
}
