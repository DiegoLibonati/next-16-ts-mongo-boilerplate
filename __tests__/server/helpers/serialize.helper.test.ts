/**
 * @jest-environment node
 */

import type { IProduct, IUser } from "@/types/models";

import { serializeProduct, serializeUser } from "@/server/helpers/serialize.helper";

import { mockProductDoc } from "@tests/__mocks__/product.mock";
import { mockUserDoc } from "@tests/__mocks__/user.mock";

describe("serialize.helper", () => {
  describe("serializeProduct", () => {
    describe("when given a valid product document", () => {
      it("should return an IProduct with stringified _id", () => {
        const result: IProduct = serializeProduct(mockProductDoc);

        expect(result._id).toBe("prod-id-abc123");
      });

      it("should include all product fields", () => {
        const result: IProduct = serializeProduct(mockProductDoc);

        expect(result.name).toBe("  Widget Pro  ");
        expect(result.description).toBe("A professional widget");
        expect(result.price).toBe(29.99);
      });

      it("should convert createdAt and updatedAt to ISO strings", () => {
        const result: IProduct = serializeProduct(mockProductDoc);

        expect(result.createdAt).toBe("2024-06-15T12:00:00.000Z");
        expect(result.updatedAt).toBe("2024-06-15T12:00:00.000Z");
      });

      it("should not include any extra fields", () => {
        const result: IProduct = serializeProduct(mockProductDoc);
        const keys: string[] = Object.keys(result);

        expect(keys).toEqual(
          expect.arrayContaining(["_id", "name", "description", "price", "createdAt", "updatedAt"])
        );
        expect(keys).toHaveLength(6);
      });
    });
  });

  describe("serializeUser", () => {
    describe("when given a valid user document", () => {
      it("should return an IUser with stringified _id", () => {
        const result: IUser = serializeUser(mockUserDoc);

        expect(result._id).toBe("user-id-abc123");
      });

      it("should include name and email fields", () => {
        const result: IUser = serializeUser(mockUserDoc);

        expect(result.name).toBe("Alice Example");
        expect(result.email).toBe("alice@example.com");
      });

      it("should convert createdAt and updatedAt to ISO strings", () => {
        const result: IUser = serializeUser(mockUserDoc);

        expect(result.createdAt).toBe("2024-06-15T12:00:00.000Z");
        expect(result.updatedAt).toBe("2024-06-15T12:00:00.000Z");
      });

      it("should not include the password field", () => {
        const result: IUser = serializeUser(mockUserDoc);

        expect((result as unknown as Record<string, unknown>).password).toBeUndefined();
      });

      it("should not include any extra fields beyond the IUser shape", () => {
        const result: IUser = serializeUser(mockUserDoc);
        const keys: string[] = Object.keys(result);

        expect(keys).toEqual(
          expect.arrayContaining(["_id", "name", "email", "createdAt", "updatedAt"])
        );
        expect(keys).toHaveLength(5);
      });
    });
  });
});
