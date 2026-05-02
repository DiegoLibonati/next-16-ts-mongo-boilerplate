import type { IProduct, IUser } from "@/types/models";

export type ProductCreatePayload = Pick<IProduct, "name" | "description" | "price">;

export type UserCreatePayload = Pick<IUser, "name" | "email">;
