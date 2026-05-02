import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { getEnvs } from "@/server/configs/env.config";

import { CODES_ERROR, CODES_SUCCESS } from "@/server/constants/codes.constant";
import { MESSAGES_ERROR, MESSAGES_SUCCESS } from "@/server/constants/messages.constant";
import { COOKIE_MAX_AGE, COOKIE_NAME } from "@/server/constants/vars.constant";

import { AuthService } from "@/server/services/auth.service";

export const AuthController = {
  async login(req: NextRequest): Promise<NextResponse> {
    try {
      const body = (await req.json()) as { email?: string; password?: string };
      const { email, password } = body;

      if (!email || !password) {
        return NextResponse.json(
          { code: CODES_ERROR.generic, message: "Email and password are required." },
          { status: 400 }
        );
      }

      const token = await AuthService.login(email, password);

      if (!token) {
        return NextResponse.json(
          { code: CODES_ERROR.invalidCredentials, message: MESSAGES_ERROR.invalidCredentials },
          { status: 401 }
        );
      }

      const response = NextResponse.json(
        { code: CODES_SUCCESS.login, message: MESSAGES_SUCCESS.login },
        { status: 200 }
      );
      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: getEnvs().ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      });
      return response;
    } catch (error) {
      console.error("AuthController.login", error);
      return NextResponse.json(
        { code: CODES_ERROR.generic, message: MESSAGES_ERROR.generic },
        { status: 500 }
      );
    }
  },

  logout(): NextResponse {
    const response = NextResponse.json(
      { code: CODES_SUCCESS.logout, message: MESSAGES_SUCCESS.logout },
      { status: 200 }
    );
    response.cookies.delete(COOKIE_NAME);
    return response;
  },
};
