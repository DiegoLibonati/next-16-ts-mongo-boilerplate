import type { IUserDoc } from "@/types/api";
import type { IUser } from "@/types/models";

const mockDate = new Date("2024-06-15T12:00:00.000Z");

export const mockUser: IUser = {
  _id: "user-id-1",
  name: "Alice Example",
  email: "alice@example.com",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};

export const mockUsers: IUser[] = [
  mockUser,
  {
    _id: "user-id-2",
    name: "Bob Example",
    email: "bob@example.com",
    createdAt: "2024-01-02T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z",
  },
];

export const mockUserDoc: IUserDoc = {
  _id: "user-id-abc123",
  name: "Alice Example",
  email: "alice@example.com",
  password: "hashed-password",
  createdAt: mockDate,
  updatedAt: mockDate,
} as unknown as IUserDoc;
