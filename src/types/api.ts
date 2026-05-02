import type { Document } from "mongoose";
import type { IProduct, IUser } from "@/types/models";

export interface Session {
  sub: string;
  email: string;
}

export type IProductDoc = Document &
  Omit<IProduct, "_id" | "createdAt" | "updatedAt"> & {
    createdAt: Date;
    updatedAt: Date;
  };

export interface IUserDoc extends Document, Omit<IUser, "_id" | "createdAt" | "updatedAt"> {
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
