/**
 * @jest-environment node
 */

import { NextResponse } from "next/server";

import { AuthController } from "@/server/controllers/auth.controller";

import { POST } from "@/app/api/v1/auth/logout/route";

jest.mock("@/server/controllers/auth.controller");

describe("route", () => {
  describe("POST /api/v1/auth/logout", () => {
    it("should delegate to AuthController.logout and return the response", () => {
      const mockResponse = new NextResponse(null, { status: 200 });
      jest.mocked(AuthController.logout).mockReturnValue(mockResponse);

      const response = POST();

      expect(AuthController.logout).toHaveBeenCalledTimes(1);
      expect(response).toBe(mockResponse);
    });

    it("should return the controller response directly without modification", () => {
      const mockResponse = new NextResponse(JSON.stringify({ message: "Logged out" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
      jest.mocked(AuthController.logout).mockReturnValue(mockResponse);

      const response = POST();

      expect(response.status).toBe(200);
    });
  });
});
