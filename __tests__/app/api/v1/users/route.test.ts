/**
 * @jest-environment node
 */

import { NextRequest, NextResponse } from "next/server";

import { UserController } from "@/server/controllers/user.controller";

import { GET } from "@/app/api/v1/users/route";

jest.mock("@/server/controllers/user.controller");

const buildRequest = (): NextRequest => new NextRequest("http://localhost:3000/api/v1/users");

describe("route", () => {
  describe("GET /api/v1/users", () => {
    it("should delegate to UserController.getAll and return the response", async () => {
      const mockResponse = new NextResponse(JSON.stringify([]), { status: 200 });
      jest.mocked(UserController.getAll).mockResolvedValue(mockResponse);

      const req = buildRequest();
      const response = await GET(req);

      expect(UserController.getAll).toHaveBeenCalledWith(req);
      expect(response).toBe(mockResponse);
    });

    it("should pass the request object to UserController.getAll", async () => {
      const mockResponse = new NextResponse(null, { status: 200 });
      jest.mocked(UserController.getAll).mockResolvedValue(mockResponse);

      const req = buildRequest();
      await GET(req);

      const [calledWith] = jest.mocked(UserController.getAll).mock.calls[0]!;
      expect(calledWith).toBe(req);
    });

    it("should return the controller response status", async () => {
      const mockResponse = new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
      jest.mocked(UserController.getAll).mockResolvedValue(mockResponse);

      const req = buildRequest();
      const response = await GET(req);

      expect(response.status).toBe(401);
    });
  });
});
