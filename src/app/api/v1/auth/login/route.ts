import type { NextRequest } from "next/server";

import { AuthController } from "@/server/controllers/auth.controller";

export async function POST(req: NextRequest): Promise<Response> {
  return AuthController.login(req);
}
