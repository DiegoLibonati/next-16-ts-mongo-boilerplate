import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { UserService } from "@/server/services/user.service";

import { getExceptionMessage } from "@/server/helpers/get_exception_message.helper";

import { CODES_NOT, CODES_SUCCESS } from "@/server/constants/codes.constant";
import { MESSAGES_NOT, MESSAGES_SUCCESS } from "@/server/constants/messages.constant";

export const UserController = {
  async getAll(_req: NextRequest): Promise<NextResponse> {
    try {
      const users = await UserService.getAllUsers();
      return NextResponse.json(
        { code: CODES_SUCCESS.getAllUsers, message: MESSAGES_SUCCESS.getAllUsers, data: users },
        { status: 200 }
      );
    } catch (error) {
      console.error("userController.getAll", error);
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status: status });
    }
  },

  async getById(_req: NextRequest, id: string): Promise<NextResponse> {
    try {
      const user = await UserService.getUserById(id);
      if (!user) {
        return NextResponse.json(
          { code: CODES_NOT.foundUser, message: MESSAGES_NOT.foundUser },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { code: CODES_SUCCESS.getUser, message: MESSAGES_SUCCESS.getUser, data: user },
        { status: 200 }
      );
    } catch (error) {
      console.error("userController.getById", error);
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status: status });
    }
  },
};
