import type { Document } from "mongoose";
import type { Product, User } from "@/types/app";

export interface Session {
  sub: string;
  email: string;
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
