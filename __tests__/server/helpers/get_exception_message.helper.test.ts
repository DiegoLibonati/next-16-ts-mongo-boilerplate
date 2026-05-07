/**
 * @jest-environment node
 */

import mongoose from "mongoose";

import type { ExceptionInfo } from "@/types/api";

import { getExceptionMessage } from "@/server/helpers/get_exception_message.helper";

describe("get_exception_message.helper", () => {
  describe("getExceptionMessage", () => {
    describe("when error is a CastError", () => {
      it("should return status 400 with NOT_VALID_ID code", () => {
        const castError = new mongoose.Error.CastError("ObjectId", "invalid-id", "_id");

        const result: ExceptionInfo = getExceptionMessage(castError);

        expect(result.status).toBe(400);
        expect(result.code).toBe("NOT_VALID_ID");
        expect(result.message).toBe("A valid ID is required.");
      });
    });

    describe("when error is a ValidationError", () => {
      it("should return status 400 with ERROR_GENERIC code", () => {
        const validationError = new mongoose.Error.ValidationError();
        validationError.errors.name = new mongoose.Error.ValidatorError({
          message: "Path `name` is required.",
          path: "name",
          value: undefined,
          type: "required",
        });

        const result: ExceptionInfo = getExceptionMessage(validationError);

        expect(result.status).toBe(400);
        expect(result.code).toBe("ERROR_GENERIC");
      });

      it("should use the first validation error message", () => {
        const validationError = new mongoose.Error.ValidationError();
        validationError.errors.email = new mongoose.Error.ValidatorError({
          message: "Invalid email format.",
          path: "email",
          value: "bad",
          type: "user defined",
        });

        const result: ExceptionInfo = getExceptionMessage(validationError);

        expect(result.message).toBe("Invalid email format.");
      });

      it("should fall back to generic message when errors object is empty", () => {
        const validationError = new mongoose.Error.ValidationError();

        const result: ExceptionInfo = getExceptionMessage(validationError);

        expect(result.message).toBe("Something went wrong.");
      });
    });

    describe("when error is an unknown type", () => {
      it("should return status 500 with ERROR_GENERIC code for a generic Error", () => {
        const result: ExceptionInfo = getExceptionMessage(new Error("Something broke"));

        expect(result.status).toBe(500);
        expect(result.code).toBe("ERROR_GENERIC");
        expect(result.message).toBe("Something went wrong.");
      });

      it("should return status 500 for a plain string", () => {
        const result: ExceptionInfo = getExceptionMessage("unexpected string error");

        expect(result.status).toBe(500);
        expect(result.code).toBe("ERROR_GENERIC");
      });

      it("should return status 500 for null", () => {
        const result: ExceptionInfo = getExceptionMessage(null);

        expect(result.status).toBe(500);
      });
    });
  });
});
