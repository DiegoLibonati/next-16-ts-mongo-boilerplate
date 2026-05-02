/**
 * @jest-environment node
 */

import { requireEnv } from "@/server/helpers/require_env.helper";

describe("require_env.helper", () => {
  describe("requireEnv", () => {
    describe("when the variable exists and has a value", () => {
      it("should return the value", () => {
        process.env.TEST_REQUIRE_ENV_KEY = "my-value";

        const result: string = requireEnv("TEST_REQUIRE_ENV_KEY");

        expect(result).toBe("my-value");

        delete process.env.TEST_REQUIRE_ENV_KEY;
      });

      it("should return a numeric string value as-is", () => {
        process.env.TEST_REQUIRE_ENV_KEY = "3000";

        const result: string = requireEnv("TEST_REQUIRE_ENV_KEY");

        expect(result).toBe("3000");

        delete process.env.TEST_REQUIRE_ENV_KEY;
      });
    });

    describe("when the variable is missing", () => {
      it("should throw with the variable name in the message", () => {
        delete process.env.TEST_MISSING_KEY;

        expect(() => requireEnv("TEST_MISSING_KEY")).toThrow(
          "Missing required environment variable: TEST_MISSING_KEY"
        );
      });
    });

    describe("when the variable is an empty string", () => {
      it("should throw because an empty string is falsy", () => {
        process.env.TEST_EMPTY_KEY = "";

        expect(() => requireEnv("TEST_EMPTY_KEY")).toThrow(
          "Missing required environment variable: TEST_EMPTY_KEY"
        );

        delete process.env.TEST_EMPTY_KEY;
      });
    });
  });
});
