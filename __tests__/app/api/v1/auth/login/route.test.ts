/**
 * @jest-environment node
 */

import { NextRequest, NextResponse } from "next/server";

import { AuthController } from "@/server/controllers/auth.controller";

import { POST } from "@/app/api/v1/auth/login/route";

jest.mock("@/server/controllers/auth.controller");

const buildRequest = (body: unknown): NextRequest =>
  new NextRequest("http://localhost:3000/api/v1/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

describe("route", () => {
  describe("POST /api/v1/auth/login", () => {
    it("should delegate to AuthController.login and return the response", async () => {
      const mockResponse = new NextResponse(JSON.stringify({ token: "abc" }), { status: 200 });
      jest.mocked(AuthController.login).mockResolvedValue(mockResponse);

      const req = buildRequest({ email: "alice@example.com", password: "demo1234" });
      const response = await POST(req);

      expect(AuthController.login).toHaveBeenCalledWith(req);
      expect(response).toBe(mockResponse);
    });

    it("should pass the request object to AuthController.login", async () => {
      const mockResponse = new NextResponse(null, { status: 401 });
      jest.mocked(AuthController.login).mockResolvedValue(mockResponse);

      const req = buildRequest({ email: "wrong@example.com", password: "bad" });
      await POST(req);

      expect(AuthController.login).toHaveBeenCalledTimes(1);
      const [calledWith] = jest.mocked(AuthController.login).mock.calls[0]!;
      expect(calledWith).toBe(req);
    });

    it("should return the controller response status", async () => {
      const mockResponse = new NextResponse(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
      jest.mocked(AuthController.login).mockResolvedValue(mockResponse);

      const req = buildRequest({ email: "alice@example.com", password: "wrong" });
      const response = await POST(req);

      expect(response.status).toBe(401);
    });
  });
});
