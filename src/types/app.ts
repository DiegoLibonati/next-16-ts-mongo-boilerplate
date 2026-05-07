import type { IProduct, IUser } from "@/types/models";

export type User = Omit<IUser, "_id" | "createdAt" | "updatedAt">;
export type Product = Omit<IProduct, "_id" | "createdAt" | "updatedAt">;
