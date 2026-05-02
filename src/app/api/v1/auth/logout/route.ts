import { AuthController } from "@/server/controllers/auth.controller";

export function POST(): Response {
  return AuthController.logout();
}
