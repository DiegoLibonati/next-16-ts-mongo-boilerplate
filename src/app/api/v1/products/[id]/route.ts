import type { NextRequest } from "next/server";

import { ProductController } from "@/server/controllers/product.controller";

export async function GET(
  req: NextRequest,
  ctx: {
    params: Promise<{ id: string }>;
  }
): Promise<Response> {
  const { id } = await ctx.params;
  return ProductController.getById(req, id);
}
